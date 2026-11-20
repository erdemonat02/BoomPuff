# BOOMPUFF v9 — yazı tiplerini (Baloo 2, Lilita One — SIL Open Font License) www/fonts/ klasörüne indirir.
# Böylece mağaza sürümü açılışta hiçbir dış sunucuya (Google Fonts) bağlanmaz. index.html önce fonts/fonts.css'i dener.
# Çalıştırma:  powershell -ExecutionPolicy Bypass -File tools\fetch-fonts.ps1
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$dst = Join-Path $root 'www\fonts'; New-Item -ItemType Directory -Force $dst | Out-Null
$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
$css = (Invoke-WebRequest -UseBasicParsing -UserAgent $ua 'https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Lilita+One&display=swap').Content
$i = 0
$out = [regex]::Replace($css, 'url\((https://fonts\.gstatic\.com/[^)]+\.woff2)\)', {
  param($m); $script:i++; $name = "f$script:i.woff2"
  Invoke-WebRequest -UseBasicParsing -UserAgent $ua $m.Groups[1].Value -OutFile (Join-Path $dst $name)
  "url($name)" })
[IO.File]::WriteAllText((Join-Path $dst 'fonts.css'), $out, (New-Object Text.UTF8Encoding $false))
Write-Host "Tamam: $i yazı tipi dosyası + fonts.css → $dst"
