# Taşınabilir derleme araçlarını bu PowerShell oturumuna ekler (yönetici izni gerekmez).
# Kullanım:  . .\tools\env.ps1
$t = "$env:USERPROFILE\bp-toolchain"
$node = (Get-ChildItem "$t\node" -Directory)[0].FullName
$jdk  = (Get-ChildItem "$t\jdk" -Directory)[0].FullName
$env:JAVA_HOME = $jdk
$env:ANDROID_HOME = "$t\android-sdk"; $env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
$env:Path = "$node;$jdk\bin;$env:ANDROID_HOME\cmdline-tools\latest\bin;$env:ANDROID_HOME\platform-tools;$env:Path"
