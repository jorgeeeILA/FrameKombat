const fs = require('fs')
const path = require('path')
const http = require('http')
const https = require('https')
const { URL } = require('url')

function readChars(filePath){
  const raw = fs.readFileSync(filePath, 'utf8')
  const idRe = /id:\s*'([^']+)'/g
  const nameRe = /name:\s*'([^']+)'|name:\s*"([^"]+)"/g
  const ids = []
  const names = []
  let m
  while((m = idRe.exec(raw)) !== null){ ids.push(m[1]) }
  while((m = nameRe.exec(raw)) !== null){ names.push(m[1] || m[2]) }
  const chars = ids.map((id,i)=>({ id, name: names[i] || '(unknown)' }))
  return chars
}

function headUrl(urlString, timeout=20000){
  return new Promise((resolve)=>{
    try{
      const u = new URL(urlString)
      const lib = u.protocol === 'https:' ? https : http
      const opts = { method: 'HEAD', timeout }
      const req = lib.request(u, opts, (res) => {
        resolve({ statusCode: res.statusCode, headers: res.headers })
        res.resume()
      })
      req.on('error', (err)=>{ resolve({ error: err.message }) })
      req.on('timeout', ()=>{ req.destroy(); resolve({ error: 'timeout' }) })
      req.end()
    }catch(e){ resolve({ error: e.message }) }
  })
}

async function run(){
  const root = path.resolve(__dirname, '..')
  const charsFile = path.join(root, 'src', 'data', 'characters.ts')
  if(!fs.existsSync(charsFile)){ console.error('Missing', charsFile); process.exit(2) }
  const chars = readChars(charsFile)
  const mapFile = path.join(root, 'scripts', 'characters-to-download.json')
  let mapping = {}
  if(fs.existsSync(mapFile)){
    try{ mapping = JSON.parse(fs.readFileSync(mapFile,'utf8')) }catch(e){ mapping = {} }
  }

  const out = []
  for(const c of chars){
    const localPath = path.join(root, 'public', 'characters', `${c.id}.png`)
    if(fs.existsSync(localPath)){
      const stat = fs.statSync(localPath)
      out.push(`${c.id} | ${c.name} | LOCAL | ${stat.size} bytes | ${localPath}`)
      continue
    }
    if(mapping[c.id]){
      const url = mapping[c.id]
      const res = await headUrl(url)
      if(res.error){
        out.push(`${c.id} | ${c.name} | REMOTE-ERROR | ${res.error} | ${url}`)
      } else {
        const ct = res.headers['content-type'] || ''
        const cl = res.headers['content-length'] || ''
        out.push(`${c.id} | ${c.name} | REMOTE-HEAD | ${res.statusCode} | ${ct} | ${cl} | ${url}`)
      }
    } else {
      out.push(`${c.id} | ${c.name} | NO-MAPPING`)
    }
  }

  console.log('Validation report for character images:')
  for(const line of out) console.log(line)
}

run()
const fs = require('fs')
const path = require('path')
const http = require('http')
const https = require('https')
const { URL } = require('url')

function readChars(filePath){
  const raw = fs.readFileSync(filePath, 'utf8')
  const idRe = /id:\s*'([^']+)'/g
  const nameRe = /name:\s*'([^']+)'|name:\s*"([^"]+)"/g
  const ids = []
  const names = []
  let m
  while((m = idRe.exec(raw)) !== null){ ids.push(m[1]) }
  while((m = nameRe.exec(raw)) !== null){ names.push(m[1] || m[2]) }
  const chars = ids.map((id,i)=>({ id, name: names[i] || '(unknown)' }))
  return chars
}

function headUrl(urlString, timeout=20000){
  return new Promise((resolve)=>{
    try{
      const u = new URL(urlString)
      const lib = u.protocol === 'https:' ? https : http
      const opts = { method: 'HEAD', timeout }
      const req = lib.request(u, opts, (res) => {
        resolve({ statusCode: res.statusCode, headers: res.headers })
        res.resume()
      })
      req.on('error', (err)=>{ resolve({ error: err.message }) })
      req.on('timeout', ()=>{ req.destroy(); resolve({ error: 'timeout' }) })
      req.end()
    }catch(e){ resolve({ error: e.message }) }
  })
}

async function run(){
  const root = path.resolve(__dirname, '..')
  const charsFile = path.join(root, 'src', 'data', 'characters.ts')
  if(!fs.existsSync(charsFile)){ console.error('Missing', charsFile); process.exit(2) }
  const chars = readChars(charsFile)
  const mapFile = path.join(root, 'scripts', 'characters-to-download.json')
  let mapping = {}
  if(fs.existsSync(mapFile)){
    try{ mapping = JSON.parse(fs.readFileSync(mapFile,'utf8')) }catch(e){ mapping = {} }
  }

  const out = []
  for(const c of chars){
    const localPath = path.join(root, 'public', 'characters', `${c.id}.png`)
    if(fs.existsSync(localPath)){
      const stat = fs.statSync(localPath)
      out.push(`${c.id} | ${c.name} | LOCAL | ${stat.size} bytes | ${localPath}`)
      continue
    }
    if(mapping[c.id]){
      const url = mapping[c.id]
      const res = await headUrl(url)
      if(res.error){
        out.push(`${c.id} | ${c.name} | REMOTE-ERROR | ${res.error} | ${url}`)
      } else {
        const ct = res.headers['content-type'] || ''
        const cl = res.headers['content-length'] || ''
        out.push(`${c.id} | ${c.name} | REMOTE-HEAD | ${res.statusCode} | ${ct} | ${cl} | ${url}`)
      }
    } else {
      out.push(`${c.id} | ${c.name} | NO-MAPPING`)
    }
  }

  console.log('Validation report for character images:')
  for(const line of out) console.log(line)
}

run()
