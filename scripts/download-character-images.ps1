Param()

# Downloads images listed in scripts/characters-to-download.json into public/characters/
Write-Host "Reading mapping from scripts/characters-to-download.json"
$mapPath = Join-Path $PSScriptRoot 'characters-to-download.json'
if (-Not (Test-Path $mapPath)) { Write-Error "Mapping file not found: $mapPath"; exit 1 }
$json = Get-Content $mapPath -Raw | ConvertFrom-Json

# Compute output directory (relative to repo root) and create if missing
$repoRoot = Resolve-Path (Join-Path $PSScriptRoot '..')
$outDir = Join-Path $repoRoot 'public\characters'
if (-Not (Test-Path $outDir)) {
  Write-Host "Creating directory: $outDir"
  New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

foreach ($prop in $json.PSObject.Properties) {
  $key = $prop.Name
  $url = $prop.Value
  $dest = Join-Path $outDir ("$key.png")
  Write-Host "Downloading $key -> $dest"
  try {
    Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing -ErrorAction Stop
  } catch {
    Write-Warning "Failed to download $url : $_"
  }
}

Write-Host "Done. Attempted downloads saved to: $outDir"
