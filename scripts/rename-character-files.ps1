Set-StrictMode -Version Latest
# Determine project root (parent of the scripts directory)
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$project = Split-Path -Parent $scriptDir
Push-Location $project

$map = @{
  'cassiecage.png' = 'cassie.png'
  'devorah.png' = 'dvorah.png'
  'jonnycage.png' = 'johnny.png'
  'jacquibrigs.png' = 'jacqui.png'
  'ferrator.png' = 'ferra_torr.png'
  'kotalkan.png' = 'kotal.png'
  'quanchi.png' = 'quan.png'
  'tryborg.png' = 'triborg.png'
  'boraicho.png' = 'bo_rai_cho.png'
  'liukang.png' = 'liu.png'
  'kunglao.png' = 'kung_lao.png'
  'kungjin.png' = 'kung_jin.png'
  'erronblack.png' = 'erron.png'
}

$public = Join-Path $project 'public\characters'
if(-not (Test-Path $public)){
  Write-Output "Directory not found: $public"
  Pop-Location
  exit 1
}

foreach($k in $map.Keys){
  $src = Join-Path $public $k
  $dst = Join-Path $public $map[$k]
  if(Test-Path $src){
    if(Test-Path $dst){
      Write-Output "SKIP: '$k' -> target exists '$($map[$k])'"
    } else {
      try{
        Rename-Item -Path $src -NewName $map[$k]
        Write-Output "RENAMED: '$k' -> '$($map[$k])'"
      } catch {
        Write-Output "ERROR renaming $k : $($_.Exception.Message)"
      }
    }
  } else {
    Write-Output "NOT FOUND: $k"
  }
}

Pop-Location
