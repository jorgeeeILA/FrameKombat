const fs = require('fs')
const path = require('path')

function normalize(s){
  return s.toLowerCase()
    .normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g,' ').trim()
}

function levenshtein(a,b){
  const dp = Array.from({length: b.length+1}, (_,j)=>j)
  for(let i=1;i<=a.length;i++){
    let prev = dp[0]
    dp[0] = i
    for(let j=1;j<=b.length;j++){
      const tmp = dp[j]
      const cost = a[i-1]===b[j-1]?0:1
      dp[j] = Math.min(dp[j]+1, dp[j-1]+1, prev+cost)
      prev = tmp
    }
  }
  return dp[b.length]
}

function readRoster(){
  const file = path.join(__dirname,'..','src','data','characters.ts')
  const raw = fs.readFileSync(file,'utf8')
  const ids = []
  const names = []
  const idRe = /id:\s*'([^']+)'/g
  const nameRe = /name:\s*'([^']+)'|name:\s*"([^"]+)"/g
  let m
  while((m = idRe.exec(raw)) !== null) ids.push(m[1])
  while((m = nameRe.exec(raw)) !== null) names.push(m[1] || m[2])
  const list = ids.map((id,i)=>({id, name: names[i]||id}))
  return list
}

function bestMatch(filename, roster){
  const nfile = normalize(filename)
  let best = null
  for(const r of roster){
    const nname = normalize(r.name)
    const d = levenshtein(nfile, nname)
    const maxLen = Math.max(nfile.length, nname.length)
    const ratio = maxLen===0?0:1 - d/maxLen
    if(!best || ratio>best.ratio){ best = {r, d, ratio, nname} }
  }
  return best
}

function run(){
  const roster = readRoster()
  const publicDir = path.join(__dirname,'..','public','characters')
  const files = fs.existsSync(publicDir)? fs.readdirSync(publicDir) : []
  const pngs = files.filter(f=>/\.png$/i.test(f))
  const report = []
  for(const f of pngs){
    const name = path.basename(f, path.extname(f))
    const match = bestMatch(name, roster)
    report.push({ file: f, name, matchName: match.r.name, distance: match.d, ratio: Math.round(match.ratio*1000)/10 })
  }

  // also find roster entries without good matches
  const matchedIds = new Set(report.map(r=>r.matchName))
  const unmatchedRoster = roster.filter(r=>!report.some(rr=>rr.matchName===r.name))

  console.log('Fuzzy filename -> roster report:')
  for(const r of report) console.log(`${r.file} -> ${r.matchName} (dist=${r.distance} ratio=${r.ratio}%)`)
  console.log('\nRoster entries without matched file:')
  for(const u of unmatchedRoster) console.log(`${u.id} | ${u.name}`)
}

run()
