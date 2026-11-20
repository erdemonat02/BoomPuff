# BOOMPUFF v9 — gerçek oyun ekranlarından mağaza görüntüleri (headless Edge/Chrome, telefon çözünürlüğü emülasyonu, 3x piksel yoğunluğu)
# Proje kökü http://localhost:8767/ adresinde yayınlanırken:  powershell -ExecutionPolicy Bypass -File tools\make-screenshots.ps1
param([string]$Base = 'http://localhost:8767')
Add-Type -AssemblyName System.Drawing
$root = Split-Path -Parent $PSScriptRoot
$browser = @("${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe", "$env:ProgramFiles\Google\Chrome\Application\chrome.exe") | Where-Object { Test-Path $_ } | Select-Object -First 1
$dir = Join-Path $root 'store\screenshots'; New-Item -ItemType Directory -Force $dir | Out-Null
$shots = @(
  @{ n='01-orman-nisan-portre';   q='demo=jungle,2,aim&sp=rabbit';   w=360; h=640 },
  @{ n='02-volkan-tunel-portre';  q='demo=volcano,4,tunnel&sp=fox';  w=360; h=640 },
  @{ n='03-sehir-metro-portre';   q='demo=city,2,tunnel&sp=monkey';  w=360; h=640 },
  @{ n='04-buzul-yatay';          q='demo=ice,6,aim&sp=bear';        w=640; h=360 },
  @{ n='05-col-piramit-yatay';    q='demo=desert,4,tunnel&sp=tiger'; w=640; h=360 },
  @{ n='06-liman-yatay';          q='demo=harbor,2,aim&sp=bee';      w=640; h=360 },
  @{ n='07-menu-portre';          q='nosw';                          w=360; h=640 }
)
foreach ($s in $shots) {
  $dst = Join-Path $dir ($s.n + '.png'); $raw = "$dst.raw.png"; $tmp = Join-Path $env:TEMP ("bp-shot-" + [guid]::NewGuid())
  $ww = [Math]::Max($s.w, 560); $url = "$Base/tools/phone.html?w=$($s.w)&h=$($s.h)&q=" + [Uri]::EscapeDataString($s.q)
  & $browser --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=3 "--user-data-dir=$tmp" "--window-size=$ww,$($s.h)" --virtual-time-budget=60000 "--screenshot=$raw" $url 2>$null | Out-Null
  if (Test-Path $raw) {
    $img = [Drawing.Image]::FromFile($raw); $bmp = New-Object Drawing.Bitmap ($s.w*3), ($s.h*3)
    $gr = [Drawing.Graphics]::FromImage($bmp); $gr.DrawImage($img, (New-Object Drawing.Rectangle 0,0,($s.w*3),($s.h*3)), (New-Object Drawing.Rectangle 0,0,($s.w*3),($s.h*3)), [Drawing.GraphicsUnit]::Pixel)
    $gr.Dispose(); $img.Dispose(); $bmp.Save($dst, [Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose(); Remove-Item $raw
  }
  Write-Host ("{0,-28} {1}" -f $s.n, $(if (Test-Path $dst) { (Get-Item $dst).Length } else { 'YOK' }))
}
