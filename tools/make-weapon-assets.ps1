# BOOMPUFF v10 — silah/güç görsellerini üretir: tools/weapon-art.js → PNG (şeffaf)
#  asset-pack/   : yüksek çözünürlüklü kaynaklar (ikon 512×512, mermi/fırlatıcı 512×256) + SVG kaynakları
#  www/assets/   : oyun içi optimize sürümler (ikon 128×128, mermi/fırlatıcı 128×64)
# Sunucu çalışırken (ör. server/ → npm run dev, http://localhost:8787):  powershell -ExecutionPolicy Bypass -File tools\make-weapon-assets.ps1
param([string]$Base = 'http://localhost:8787')
Add-Type -AssemblyName System.Drawing
$root = Split-Path -Parent $PSScriptRoot
$browser = @("${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe", "$env:ProgramFiles\Google\Chrome\Application\chrome.exe") | Where-Object { Test-Path $_ } | Select-Object -First 1
$sheet = Join-Path $env:TEMP 'bp-art-sheet.png'; $tmp = Join-Path $env:TEMP ("bp-art-" + [guid]::NewGuid())
& $browser --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --default-background-color=00000000 "--user-data-dir=$tmp" --window-size=1536,1280 --virtual-time-budget=8000 "--screenshot=$sheet" "$Base/tools/art-sheet.html" 2>$null | Out-Null
# art-sheet.html içindeki sıra
$names = @{ rocket='rocket'; grenade='grenade'; heavy='heavy_missile'; cluster='cluster_rocket'; air='air_strike'; push='push_bomb'; sticky='sticky_bomb'; ice='ice_bomb'; mine='land_mine'; bouncy='bouncy_bomb'; bomb='air_strike_bomb'; bomblet='cluster_bomblet' }
$order = @()
'rocket','grenade','heavy','cluster','air','push','sticky','ice','mine','bouncy' | % { $order += ,@('I', $_) }
'rocket','grenade','heavy','cluster','bomb','push','sticky','ice','mine','bouncy','bomblet' | % { $order += ,@('P', $_) }
'rocket','heavy','cluster' | % { $order += ,@('H', $_) }
'health_50','shield' | % { $order += ,@('POW', $_) }
# Not: tarayıcı tuvali 3072×2560 piksel; ekran görüntüsü 1536×1280 CSS px → hücre 256 px. Kaynak için ikinci, 2× çekim yapılır.
$sheet2 = Join-Path $env:TEMP 'bp-art-sheet2.png'; $tmp2 = Join-Path $env:TEMP ("bp-art-" + [guid]::NewGuid())
& $browser --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=2 --default-background-color=00000000 "--user-data-dir=$tmp2" --window-size=1536,1280 --virtual-time-budget=8000 "--screenshot=$sheet2" "$Base/tools/art-sheet.html" 2>$null | Out-Null
$img = [Drawing.Image]::FromFile($sheet2)
function Save-Crop($src, $x, $y, $w, $h, $outW, $outH, $path) {
  New-Item -ItemType Directory -Force (Split-Path $path) | Out-Null
  $bmp = New-Object Drawing.Bitmap $outW, $outH, ([Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [Drawing.Graphics]::FromImage($bmp); $g.InterpolationMode = 'HighQualityBicubic'; $g.PixelOffsetMode = 'HighQuality'; $g.CompositingMode = 'SourceCopy'
  $g.DrawImage($src, (New-Object Drawing.Rectangle 0, 0, $outW, $outH), (New-Object Drawing.Rectangle $x, $y, $w, $h), [Drawing.GraphicsUnit]::Pixel)
  $g.Dispose(); $bmp.Save($path, [Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose() }
for ($i = 0; $i -lt $order.Count; $i++) {
  $grp = $order[$i][0]; $k = $order[$i][1]; $cx = ($i % 6) * 512; $cy = [Math]::Floor($i / 6) * 512
  switch ($grp) {
    'I'   { $n = $names[$k]; Save-Crop $img $cx $cy 512 512 512 512 "$root\asset-pack\weapons\icons\${n}_icon.png"; Save-Crop $img $cx $cy 512 512 128 128 "$root\www\assets\weapons\icons\${n}_icon.png" }
    'P'   { $n = $names[$k]; Save-Crop $img $cx $cy 512 256 512 256 "$root\asset-pack\weapons\projectiles\${n}_projectile.png"; Save-Crop $img $cx $cy 512 256 128 64 "$root\www\assets\weapons\projectiles\${n}_projectile.png" }
    'H'   { $n = $names[$k]; Save-Crop $img $cx $cy 512 256 512 256 "$root\asset-pack\weapons\held\${n}_launcher.png"; Save-Crop $img $cx $cy 512 256 128 64 "$root\www\assets\weapons\held\${n}_launcher.png" }
    'POW' { $n = if ($k -eq 'shield') { 'shield' } else { 'health_50' }; Save-Crop $img $cx $cy 512 512 512 512 "$root\asset-pack\powers\${n}_icon.png"; Save-Crop $img $cx $cy 512 512 128 128 "$root\www\assets\powers\${n}_icon.png" }
  }
}
$img.Dispose()
Copy-Item $sheet2 "$root\asset-pack\contact-sheet.png" -Force
Get-ChildItem -Recurse "$root\www\assets" -Filter *.png | Measure-Object -Property Length -Sum | % { "oyun içi: $($_.Count) dosya, $([Math]::Round($_.Sum/1KB)) KB" }
Get-ChildItem -Recurse "$root\asset-pack" -Filter *.png | Measure-Object | % { "kaynak paket: $($_.Count) dosya" }
