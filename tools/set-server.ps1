# BOOMPUFF — online sunucu adresini mobil uygulamaya yazar ve Android projesine aktarır.
# Kullanım:  powershell -ExecutionPolicy Bypass -File tools\set-server.ps1 -Url https://boompuff-xxxx.onrender.com
param([Parameter(Mandatory=$true)][string]$Url)
$root = Split-Path -Parent $PSScriptRoot
$u = $Url.Trim().TrimEnd('/') -replace '^https://', 'wss://' -replace '^http://', 'ws://'
if ($u -notmatch '^wss?://') { $u = 'wss://' + $u }
if ($u -like 'ws://*') { Write-Warning 'Mobil uygulama şifresiz ws:// adresine bağlanamaz; wss:// (HTTPS) kullanın.' }
$f = Join-Path $root 'www\net-config.js'
$txt = (Get-Content $f -Raw -Encoding UTF8) -replace "(?m)^window\.BOOMPUFF_SERVER\s*=\s*'[^']*';", "window.BOOMPUFF_SERVER = '$u';"
[IO.File]::WriteAllText($f, $txt, (New-Object Text.UTF8Encoding $false))
Write-Host "net-config.js → $u"
if (Test-Path (Join-Path $root 'node_modules\@capacitor\cli')) { Push-Location $root; npx cap sync android; Pop-Location; Write-Host 'Android projesine aktarıldı. Şimdi APK/AAB yeniden derleyin (README).' }
else { Write-Host 'Not: npm install yapılmamış; Android için sonra "npx cap sync android" çalıştırın.' }
