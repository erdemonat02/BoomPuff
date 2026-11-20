# BOOMPUFF v9 — ikon / açılış / tanıtım görsellerini üretir (Microsoft Edge veya Chrome headless ile).
# Önce proje kökünü bir yerel sunucuda yayınlayın (ör. http://localhost:8767/), sonra:
#   powershell -ExecutionPolicy Bypass -File tools\make-brand-assets.ps1 -Base http://localhost:8767
param([string]$Base = 'http://localhost:8767')
$root = Split-Path -Parent $PSScriptRoot
$browser = @("${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe", "$env:ProgramFiles\Google\Chrome\Application\chrome.exe") | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $browser) { throw 'Edge veya Chrome bulunamadı.' }
$jobs = @(
  @{ mode='icon';     w=512;  h=512;  out='www\icons\icon-512.png' },
  @{ mode='icon';     w=192;  h=192;  out='www\icons\icon-192.png' },
  @{ mode='maskable'; w=512;  h=512;  out='www\icons\icon-maskable-512.png' },
  @{ mode='icon';     w=1024; h=1024; out='assets\icon-only.png' },
  @{ mode='fg';       w=1024; h=1024; out='assets\icon-foreground.png'; transparent=$true },
  @{ mode='bg';       w=1024; h=1024; out='assets\icon-background.png' },
  @{ mode='splash';   w=2732; h=2732; out='assets\splash.png' },
  @{ mode='splash';   w=2732; h=2732; out='assets\splash-dark.png' },
  @{ mode='icon';     w=512;  h=512;  out='store\graphics\play-icon-512.png' },
  @{ mode='feature';  w=1024; h=500;  out='store\graphics\feature-graphic-1024x500.png' }
)
foreach ($j in $jobs) {
  $dst = Join-Path $root $j.out; New-Item -ItemType Directory -Force (Split-Path $dst) | Out-Null
  $url = "$Base/tools/brand.html?mode=$($j.mode)&size=$($j.w)"; if ($j.mode -eq 'feature') { $url = "$Base/tools/brand.html?mode=feature" }
  $bgArg = if ($j.transparent) { '--default-background-color=00000000' } else { '--default-background-color=0b1630ff' }
  $tmp = Join-Path $env:TEMP ("bp-brand-" + [guid]::NewGuid())
  & $browser --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 $bgArg "--user-data-dir=$tmp" "--window-size=$($j.w),$($j.h)" --virtual-time-budget=20000 "--screenshot=$dst" $url | Out-Null
  Start-Sleep -Milliseconds 300
  Write-Host ("{0,-46} {1}" -f $j.out, $(if (Test-Path $dst) { (Get-Item $dst).Length } else { 'YOK' }))
}
