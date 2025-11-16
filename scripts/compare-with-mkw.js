const fs = require('fs')
const path = require('path')
const https = require('https')

function readLocalChars(){
  const file = path.join(__dirname, '..','src','data','characters.ts')
  const raw = fs.readFileSync(file,'utf8')
  const idRe = /id:\s*'([^']+)'/g
  const nameRe = /name:\s*'([^']+)'|name:\s*"([^"]+)"/g
  const ids = []
  const names = []
  let m
  while((m = idRe.exec(raw)) !== null) ids.push(m[1])
  while((m = nameRe.exec(raw)) !== null) names.push(m[1] || m[2])
  const chars = ids.map((id,i)=>({ id, name: names[i] || id }))
  return chars
}

function fetchUrl(url){
  return new Promise((resolve,reject)=>{
    https.get(url, {headers:{'User-Agent':'Mozilla/5.0'}}, (res)=>{
      let data = ''
      res.on('data', c=> data += c)
      res.on('end', ()=> resolve({status: res.statusCode, body: data}))
    }).on('error', reject)
  })
}

function normalizeName(n){
  return n.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()
}

async function run(){
  const localChars = readLocalChars()
  console.log('Local characters:', localChars.map(c=>c.name).join(', '))

  console.log('Fetching MortalKombatWarehouse roster...')
  const url = 'https://www.mortalkombatwarehouse.com/mkx/'
  const res = await fetchUrl(url)
  if(res.status !== 200){ console.error('Failed to fetch MKW', res.status); process.exit(2) }
  const html = res.body

  // extract fighter links like /mkx/kunglao/ and anchor text
  const re = /href=\"https?:\/\/www\.mortalkombatwarehouse\.com\/mkx\/([^\/\"]+)\/(?:\")?[^>]*>([^<]+)</gi
  const mkNames = []
  let m
  while((m = re.exec(html)) !== null){
    const display = m[2].trim()
    // filter out navigation items that are not fighters (some duplicates may exist)
    if(display && display.length < 50) mkNames.push(display)
  }

  // Unique and normalized
  const mkSet = Array.from(new Set(mkNames.map(n=>normalizeName(n))))

  const localByName = {}
  for(const c of localChars){ localByName[normalizeName(c.name)] = c }

  const presentOnMKW = mkSet.filter(n=> localByName[n])
  const missingLocally = mkSet.filter(n=> !localByName[n])
  const extrasLocal = Object.keys(localByName).filter(n=> !mkSet.includes(n))

  // check files in public/characters
  const root = path.resolve(__dirname,'..')
  const publicDir = path.join(root,'public','characters')
  const files = fs.existsSync(publicDir) ? fs.readdirSync(publicDir) : []
  const fileSet = new Set(files.map(f=>f.toLowerCase()))

  const imageReport = localChars.map(c=>{
    const fname = `${c.id}.png`;
    const has = fileSet.has(fname.toLowerCase())
    const size = has ? fs.statSync(path.join(publicDir,fname)).size : 0
    return { id: c.id, name: c.name, localFile: has? fname : null, size }
  })

  console.log('\n=== Comparison Report ===')
  console.log('Characters on MKW but not in local roster:', missingLocally.join(', ') || '(none)')
  console.log('Characters in local roster but not on MKW (extras):', extrasLocal.join(', ') || '(none)')
  console.log('\nImage presence:')
  for(const r of imageReport){
    console.log(`${r.id} | ${r.name} | ${r.localFile ? 'LOCAL':'MISSING'} | ${r.size} bytes`)
  }

}

run().catch(e=>{ console.error(e); process.exit(1) })
