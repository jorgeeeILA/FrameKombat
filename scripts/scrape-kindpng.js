const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')

function get(url){
  return new Promise((resolve,reject)=>{
    const lib = url.startsWith('https') ? https : http
    lib.get(url, {headers: {'User-Agent': 'Mozilla/5.0'} }, (res)=>{
      let data = ''
      res.on('data', chunk=> data += chunk)
      res.on('end', ()=> resolve({status: res.statusCode, body: data}))
    }).on('error', reject)
  })
}

function extractFirstImgPageLink(html){
  // find links to /imgv/... pages
  const re = /href="(\/imgv\/[^"]+)"/g
  const m = re.exec(html)
  if(m) return 'https://www.kindpng.com' + m[1]
  return null
}

function extractPngSrc(html){
  // look for an img tag with .png src
  const re = /<img[^>]+src=['\"]([^'\"]+\.png)['\"][^>]*>/i
  const m = re.exec(html)
  if(m) return m[1]
  return null
}

function readChars(){
  const file = path.join(__dirname, '..','src','data','characters.ts')
  const raw = fs.readFileSync(file,'utf8')
  const idRe = /id:\s*'([^']+)'/g
  const nameRe = /name:\s*'([^']+)'|name:\s*"([^"]+)"/g
  const ids = []
  const names = []
  let m
  while((m = idRe.exec(raw)) !== null) ids.push(m[1])
  while((m = nameRe.exec(raw)) !== null) names.push(m[1] || m[2])
  const chars = ids.map((id,i)=>({id, name: names[i]||id}))
  return chars
}

async function run(){
  const chars = readChars()
  const outMapPath = path.join(__dirname, 'characters-to-download.json')
  let existing = {}
  if(fs.existsSync(outMapPath)){
    try{ existing = JSON.parse(fs.readFileSync(outMapPath,'utf8')) }catch(e){ existing = {} }
  }

  const newMap = Object.assign({}, existing)

  for(const c of chars){
    try{
      console.log('Searching kindpng for', c.name)
      const q = encodeURIComponent(c.name + ' mortal kombat x')
      const searchUrl = `https://www.kindpng.com/search.html?k=${q}`
      const s = await get(searchUrl)
      if(s.status !== 200){ console.error('Search failed', s.status); continue }
      const pageLink = extractFirstImgPageLink(s.body)
      if(!pageLink){ console.log(' No image page found for', c.id); continue }
      console.log('  found page', pageLink)
      const p = await get(pageLink)
      if(p.status !== 200){ console.error('  page fetch failed', p.status); continue }
      const img = extractPngSrc(p.body)
      if(!img){ console.log('  no png src on page for', c.id); continue }
      // absolute or protocol-relative
      const final = img.startsWith('http') ? img : ('https:' + img)
      console.log('  png ->', final)
      newMap[c.id] = final
    }catch(e){ console.error('Error for', c.id, e.message) }
  }

  fs.writeFileSync(outMapPath, JSON.stringify(newMap, null, 2), 'utf8')
  console.log('Wrote mapping to', outMapPath)
}

run()
