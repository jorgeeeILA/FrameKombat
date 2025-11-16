<#
Validate character images: for each character in src/data/characters.ts attempt to
 - detect a local file in public/characters/<id>.png and report size
 - if missing, consult scripts/characters-to-download.json for a URL and do a HEAD (fallback to GET) to report status

Output lines: id | name | STATUS | details...
#>

Set-StrictMode -Version Latest

Try {
    $projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
    Push-Location $projectRoot

    $charsFile = Join-Path $projectRoot 'src\data\characters.ts'
    if(-not (Test-Path $charsFile)){
        Write-Error "Could not find $charsFile"
        exit 2
    }

    $charsRaw = Get-Content $charsFile -Raw

    # Simpler extraction: collect all ids and names separately and pair by index.
    $idPattern = "id:\s*'([^']+)'"
    $namePattern = "name:\s*'([^']+)'|name:\s*\"([^\"]+)\""
    $idMatches = [regex]::Matches($charsRaw, $idPattern)
    $nameMatches = [regex]::Matches($charsRaw, $namePattern)

    $matches = @()
    for($i=0; $i -lt $idMatches.Count; $i++){
        $id = $idMatches[$i].Groups[1].Value
        $name = "(unknown)"
        if($i -lt $nameMatches.Count){
            # name pattern may capture in group1 or group2 depending on which alternation matched
            $nm = $nameMatches[$i]
            $name = if($nm.Groups[1].Value) { $nm.Groups[1].Value } elseif($nm.Groups[2].Value) { $nm.Groups[2].Value } else { $name }
        }
        # create a simple PSCustomObject to hold id/name for processing below
        $matches += [PSCustomObject]@{ Id = $id; Name = $name }
    }

    $mapFile = Join-Path $projectRoot 'scripts\characters-to-download.json'
    $map = @{}
    if(Test-Path $mapFile){
        try{ $map = Get-Content $mapFile -Raw | ConvertFrom-Json } catch { $map = @{} }
    }

    $out = @()
    foreach($m in $matches){
        $id = $m.Id
        $name = $m.Name
        if([string]::IsNullOrWhiteSpace($id)){ continue }

        $localPath = Join-Path $projectRoot "public\characters\$($id).png"
        if(Test-Path $localPath){
            $len = (Get-Item $localPath).Length
            $out += "$id | $name | LOCAL | $len bytes | $localPath"
            continue
        }

        if($map.PSObject.Properties.Name -contains $id){
            $url = $map.$id
            try{
                $resp = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -TimeoutSec 20 -ErrorAction Stop
                $status = $resp.StatusCode
                $ct = $resp.Headers['Content-Type'] -join ','
                $cl = $resp.Headers['Content-Length'] -join ','
                $out += "$id | $name | REMOTE-HEAD | $status | $ct | $cl | $url"
            } catch {
                # try GET as some servers don't support HEAD
                try{
                    $resp = Invoke-WebRequest -Uri $url -Method Get -UseBasicParsing -TimeoutSec 20 -ErrorAction Stop
                    $status = $resp.StatusCode
                    $ct = $resp.Headers['Content-Type'] -join ','
                    $cl = $resp.Headers['Content-Length'] -join ','
                    $out += "$id | $name | REMOTE-GET | $status | $ct | $cl | $url"
                } catch {
                    $msg = $_.Exception.Message
                    $out += "$id | $name | REMOTE-ERROR | $msg | $url"
                }
            }
        } else {
            <#
            Validate character images: for each character in src/data/characters.ts attempt to
             - detect a local file in public/characters/<id>.png and report size
             - if missing, consult scripts/characters-to-download.json for a URL and do a HEAD (fallback to GET) to report status

            Output lines: id | name | STATUS | details...
            #>

            Set-StrictMode -Version Latest

            Try {
                $projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
                Push-Location $projectRoot

                $charsFile = Join-Path $projectRoot 'src\data\characters.ts'
                if(-not (Test-Path $charsFile)){
                    Write-Error "Could not find $charsFile"
                    exit 2
                }

                $charsRaw = Get-Content $charsFile -Raw

                # Pattern: capture blocks that include id: 'xxx' and name: 'YYY' (single or double quotes)
                $pattern = "\{[^}]*?id:\s*'(?<id>[^']+)'[^}]*?name:\s*['\"](?<name>[^'\"]+)['\"][^}]*?\}"
                $matches = [regex]::Matches($charsRaw, $pattern, [Text.RegularExpressions.RegexOptions]::Singleline)

                if($matches.Count -eq 0){
                    # Fallback: capture all ids and try to find names nearby
                    $idMatches = [regex]::Matches($charsRaw, "id:\s*'(?<id>[^']+)'")
                    foreach($m in $idMatches){
                        $matches += $m
                    }
                }

                $mapFile = Join-Path $projectRoot 'scripts\characters-to-download.json'
                $map = @{}
                if(Test-Path $mapFile){
                    try{ $map = Get-Content $mapFile -Raw | ConvertFrom-Json } catch { $map = @{} }
                }

                $out = @()
                foreach($m in $matches){
                    # $m may be either a Match with Groups id/name or a plain Match with Value (fallback)
                    $id = ''
                    $name = ''
                    if($m -is [System.Text.RegularExpressions.Match]){
                        if($m.Groups['id']){ $id = $m.Groups['id'].Value }
                        if($m.Groups['name']){ $name = $m.Groups['name'].Value }
                    } else {
                        # fallback: try to extract id from the value
                        $single = [regex]::Match($m.Value, "id:\s*'(?<id>[^']+)'")
                        if($single.Success){ $id = $single.Groups['id'].Value }
                    }

                    if([string]::IsNullOrWhiteSpace($id)){ continue }
                    if(-not $name){ $name = "(unknown)" }

                    $localPath = Join-Path $projectRoot "public\characters\$($id).png"
                    if(Test-Path $localPath){
                        $len = (Get-Item $localPath).Length
                        $out += "$id | $name | LOCAL | $len bytes | $localPath"
                        continue
                    }

                    if($map.PSObject.Properties.Name -contains $id){
                        $url = $map.$id
                        try{
                            $resp = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -TimeoutSec 20 -ErrorAction Stop
                            $status = $resp.StatusCode
                            $ct = $resp.Headers['Content-Type'] -join ','
                            $cl = $resp.Headers['Content-Length'] -join ','
                            $out += "$id | $name | REMOTE-HEAD | $status | $ct | $cl | $url"
                        } catch {
                            # try GET as some servers don't support HEAD
                            try{
                                $resp = Invoke-WebRequest -Uri $url -Method Get -UseBasicParsing -TimeoutSec 20 -ErrorAction Stop
                                $status = $resp.StatusCode
                                $ct = $resp.Headers['Content-Type'] -join ','
                                $cl = $resp.Headers['Content-Length'] -join ','
                                $out += "$id | $name | REMOTE-GET | $status | $ct | $cl | $url"
                            } catch {
                                $msg = $_.Exception.Message
                                $out += "$id | $name | REMOTE-ERROR | $msg | $url"
                            }
                        }
                    } else {
                        $out += "$id | $name | NO-MAPPING"
                    }
                }

                # Print report
                Write-Output "Validation report for character images:"
                foreach($line in $out){ Write-Output $line }

            } finally { Pop-Location }
