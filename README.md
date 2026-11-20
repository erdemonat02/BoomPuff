# BOOMPUFF — v10

Yıkılabilir adalarda kasklı hayvanların sıra tabanlı topçu düellosu. HTML5 Canvas + saf JavaScript; Android (Capacitor) ve PWA paketlemesine hazır. **v10 ile arkadaşlarla internet üzerinden oynanabilir** (kendi barındıracağınız ücretsiz/ucuz bir sunucuyla).

> **Yayın durumu: YAYIN ADAYI DEĞİL.** v10 değişiklikleri hedefli testlerden geçti ([docs/TEST-RAPORU-v10.md](docs/TEST-RAPORU-v10.md)). Eksik: online sunucunun internete yayınlanması ve **farklı cihazlar arasında gerçek test**, gerçek telefonda test, AAB'nin yükleme anahtarıyla imzalanması.

## v10'da neler var (ayrıntı: [docs/CHANGELOG-v10.md](docs/CHANGELOG-v10.md))
1. **Gardırop:** dokununca yalnızca ön izleme; SATIN AL + onay penceresi; altın yalnızca onayda düşer; kuşanma ayrı ve ücretsiz.
2. **ARKADAŞLARINLA OYNA:** oda oluştur / kodla katıl / herkese açık liste / davet et, 2–8 oyuncu, hazır durumu, oda sahibi ayarları, yeniden bağlanma. Sunucu: [server/README.md](server/README.md).
3. **Yeni silah ve güç görselleri:** 10 silahın her biri için ikon + mermi, 3 fırlatıcı, 2 alt mermi, +50 HP ve Kalkan ikonları (`www/assets/`, kaynaklar `asset-pack/`, çizim kodu `tools/weapon-art.js`).
4. **Seviye/ödüller maç sonunda** toplu ve animasyonlu; maç içinde açılır pencere yok.
5. **Üst barda XP kutusu** (seviye, XP / gereken, çubuk).
6. **Konumlandırma 10 sn** (online'da senkron).
7. **Mega Atış:** karakter %25, mermi %40 büyür; enerji halesi; patlamadan sonra normale döner.

## Online multiplayer — sizin yapmanız gerekenler
0. **Adım adım rehber: [docs/YAYINLAMA-RENDER.md](docs/YAYINLAMA-RENDER.md)** (`render.yaml` hazır; GitHub'a yükle → Render'da New → Blueprint).
1. `server/` klasörünü bir sunucuda yayınlayın (önerilen: **Render ücretsiz Web Service**, 0 $; uykudan uyanması ~30–60 sn). Adımlar ve diğer seçeneklerin maliyeti: [server/README.md](server/README.md). API anahtarı veya hesap gerekmez (yalnızca barındırma hesabı).
2. Web'de: yayın adresini açıp **ARKADAŞLARINLA OYNA** → oda oluştur → kodu arkadaşlarınla paylaş.
3. Android uygulaması için `www/net-config.js` içine `wss://…` adresinizi yazıp `npx cap sync android` ile yeniden derleyin.
4. Yerel test: `cd server && npm install && npm start` → `http://localhost:8787` (aynı Wi-Fi'deki telefonlar bilgisayarın IP'siyle bağlanabilir).

---
*(Aşağısı v9 belgesidir; derleme ve yayın adımları aynen geçerlidir. v10 paketleri: `dist/boompuff-10.0.0-*`.)*

> v9 durumu: Android **debug APK ve imzasız release AAB derlendi** (`dist/`). Ayrıntı: [docs/TEST-RAPORU.md](docs/TEST-RAPORU.md).

## Derlenmiş paketler (`dist/`)
| Dosya | Açıklama |
|---|---|
| `boompuff-9.0.0-debug.apk` (14,9 MB) | Android debug anahtarıyla imzalı; telefona doğrudan kurulabilir (test için). `com.boompuff.game`, versionCode 9 / versionName 9.0.0, minSdk 24, targetSdk 36. Yazı tipleri gömülü, 23 web dosyası `assets/public` içinde. |
| `boompuff-9.0.0-release-unsigned.aab` (13,2 MB) | Google Play için release paketi, **imzasız**. Yüklemeden önce kendi yükleme anahtarınızla imzalayın (aşağıda). |

Telefona kurmak: telefonda Geliştirici seçenekleri → USB hata ayıklama açın, sonra `adb install dist\boompuff-9.0.0-debug.apk` (adb: `%USERPROFILE%\bp-toolchain\android-sdk\platform-tools`) — ya da APK dosyasını telefona kopyalayıp "bilinmeyen kaynaklar" iznini vererek açın.

## Klasör yapısı
```
boompuff-v9/
  www/                    Oyunun kendisi (Capacitor webDir) — index.html, manifest, sw.js, icons/, fonts/ (gömülü yazı tipleri)
  android/                Capacitor 8 Android projesi (Gradle) — ikon/splash kaynakları üretilmiş, sürüm 9.0.0 (9)
  dist/                   Derlenmiş paketler: debug APK + imzasız release AAB
  assets/                 @capacitor/assets kaynakları: icon-only/foreground/background, splash (oyunun çizimleriyle üretildi)
  store/                  Mağaza metinleri, gizlilik/veri güvenliği/derecelendirme notları, ikon, tanıtım görseli, ekran görüntüleri
  tests/                  tunnel-reach.js (tünel erişim testi), regression.js (regresyon testleri)
  tools/                  brand.html + make-brand-assets.ps1 (ikon/splash), phone.html + make-screenshots.ps1, fetch-fonts.ps1
  docs/                   CHANGELOG-v9.md, TEST-RAPORU.md, references/ (tasarım referans görselleri)
  .github/workflows/      android.yml — debug APK + imzalı AAB üreten CI iş akışı (henüz çalıştırılmadı)
  package.json, capacitor.config.json
```

## Çalıştırma
- **Tarayıcı:** `www/index.html` dosyasını açın (Chrome/Edge/Safari/Firefox). Ya da bir statik sunucu: `npx http-server www` veya `python -m http.server -d www`.
- **Telefonda (yerel ağ):** aynı sunucuyu telefondan açın. HTTPS altında yayınlanırsa PWA olarak ana ekrana eklenebilir ve çevrimdışı çalışır (`sw.js`; localhost'ta bilerek kapalı).
- **Testler:** proje kökünü yayınlayın (`npx http-server . -p 8767`), `http://localhost:8767/www/index.html?nosw` açın ve tarayıcı konsolunda:
  ```js
  (0,eval)(await (await fetch('/tests/tunnel-reach.js')).text()); await __tunTest('jungle', 6)
  (0,eval)(await (await fetch('/tests/regression.js')).text()); await __reg.all()
  ```

## Android uygulaması nasıl oluşturulur
Gereken: Node.js 22+, JDK 21, Android SDK 36 (Android Studio Otter 2025.2.1+ veya yalnızca komut satırı araçları).

**Bu bilgisayarda kurulu olan taşınabilir araçlar** (`%USERPROFILE%\bp-toolchain`, yönetici izni gerekmez): Node 22.23.5, Temurin JDK 21.0.13, Android cmdline-tools + platform-tools + platforms;android-36 + build-tools 36/35. Bir PowerShell penceresinde `. .\tools\env.ps1` ile yolları etkinleştirin.

**Önemli — Türkçe karakterli klasör yolu:** Android Gradle eklentisi `Çalışmalar` gibi ASCII dışı karakter içeren yollarda derlemeyi reddeder. Çözüm: projeyi geçici bir sürücü harfine bağlayın, sonra B: üzerinden derleyin:
```
subst B: "C:\Users\erdem.onat\Desktop\Claude Çalışmalar\BoomPuff\boompuff-v9"
. B:\tools\env.ps1; cd B:\android; .\gradlew.bat assembleDebug bundleRelease
subst B: /D
```
(Ya da projeyi ASCII bir yola taşıyın.) `android/` klasörü artık projede (Capacitor 8 şablonu, sürüm 9.0.0/9 ayarlı); sıfırdan kurmak isterseniz aşağıdaki adımlar geçerli.
```
npm install
powershell -ExecutionPolicy Bypass -File tools/fetch-fonts.ps1   # yazı tiplerini pakete göm (dış bağlantı kalmaz)
npx cap add android
npm run assets                                                   # ikon + splash (assets/ klasöründen)
npx cap sync android
cd android && gradlew assembleDebug                              # debug APK: android/app/build/outputs/apk/debug/
```
**Release AAB (Google Play):**
1. Bir yükleme anahtarı oluşturun (bir kez, güvenli yerde saklayın, **depoya koymayın**):
   `keytool -genkeypair -v -keystore upload.jks -keyalg RSA -keysize 2048 -validity 10000 -alias boompuff`
2. `android/keystore.properties` (gitignore'da) veya CI gizli değerleriyle imzalayın; `.github/workflows/android.yml` bunu `ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`, `ANDROID_KEY_PASSWORD` sırlarıyla yapar.
3. `cd android && gradlew bundleRelease` → `android/app/build/outputs/bundle/release/app-release.aab`
4. Play Console'da **Play App Signing** açık kalsın (Google uygulama imzalama anahtarını tutar, sizin anahtarınız yalnızca yükleme anahtarıdır).

**Sürümleme:** `package.json → version` = `versionName` (ör. 9.0.0). `versionCode` her yüklemede artmalı; CI iş akışı çalıştırma numarasını kullanır, elle derlemede `android/app/build.gradle` içinde artırın. Debug ve release ayrı Gradle görevleridir (`assembleDebug` / `bundleRelease`); release'te `webContentsDebuggingEnabled:false`.

**Hedef API:** Google Play, 31 Ağustos 2026'dan itibaren yeni uygulama ve güncellemelerin **Android 16 (API 36)** hedeflemesini istiyor (Play Console yardım sayfası). Capacitor 8 şablonu `targetSdkVersion = 36`, `minSdkVersion = 24` ile gelir — `package.json` Capacitor 8.x'e sabitlendi. Yüklemeden önce Play Console'daki güncel gerekliliği yeniden kontrol edin.

**Uygulama kimliği:** `com.boompuff.game` (öneri). Sahibi olduğunuz bir alan adına göre değiştirin (ör. `com.adiniz.boompuff`) — **ilk yüklemeden sonra değiştirilemez.**

**Önemli — kayıtların korunması:** Capacitor'da `server.androidScheme: "https"` ve varsayılan host `localhost` sabit kalmalı. Bunlar değişirse WebView'in kaynağı (origin) değişir ve oyuncuların `localStorage` kayıtları görünmez olur.

## Kullanılan teknolojiler
HTML5 Canvas 2D, saf JavaScript (çerçeve yok), Web Audio API (sesler ve müzik kodla üretilir), CSS (env(safe-area-inset-*) çentik uyumu), localStorage, Service Worker (PWA), Capacitor 8 (Android kabuğu; @capacitor/app geri tuşu, splash-screen, status-bar). Yazı tipleri: Baloo 2, Lilita One (SIL OFL).

## v9'daki yenilikler (özet — ayrıntı: [docs/CHANGELOG-v9.md](docs/CHANGELOG-v9.md))
1. **Gerçek tünel ve mağara sistemi** — v8'de tüm mağara/oda/girintiler kapalı boşluklardı. Artık her haritada yüzeye bağlı, çok girişli, çok seviyeli tüneller var (aşağıda).
2. **Sol başparmak joystick'i + merkezde JUMP** — ayrı dokunma alanları, kademeli hız, çoklu dokunma, nişan alırken yürüme/zıplama.
3. **BOOMPUFF Atış Kompası** — açı, güç %, 12 kademeli enerji halkası, rüzgâr etkisi (arkadan/karşıdan/etkilemez), silah, gerçek mermi hızı; karakterin yanında eş zamanlı açı yayı.
4. **Denetim düzeltmeleri** — donmayan yükleme, oyun döngüsü sarmalı, kayıt şeması v2 + yedek + doğrulama, arka plana alma, geri tuşu, 360 px ekranlar, Sekmeli Bomba kılavuzu.
5. **Yayın hazırlığı** — PWA, Capacitor yapılandırması, ikon/splash, mağaza metinleri ve gerçek ekran görüntüleri, gizlilik/veri güvenliği notları, CI iş akışı.

### Haritalardaki tünel ağları
| Harita | Tasarım |
|---|---|
| Orman Adası | En yüksek tepenin altından iki yamaca açılan **Kök Tüneli** + oda + alt seviye kök mağarası (iki rota), ek yan çıkış; genişliğe göre ek kaya altı geçitleri. Kök ve parlayan mantar dekorları |
| Volkan | Lav kanallarının **üstünden geçen kaya tüpleri** (yıkılmaz köprünün üstü örtülü), koninin altında **magma odası**, dış tepelerde girişler ve odalar. Lav çatlağı ışıkları |
| Neon Şehir | Meydanlardan merdivenle inilen **metro hatları** + istasyon (karo duvar, neon tüp, METRO tabelası); binaların zemin katı **iki kapılı lobi** (sokak boyunca geçiş), bazı lobilerden metroya merdiven |
| Buzul Adası | Buzulun içinden zemin seviyesinde geçen **buz koridoru** → aşağı inen **buz mağarası** → yer altından uzak bir ağza; büyük haritada ek mağara. Sarkıt ve buz ışıkları |
| Kayıp Çöl | Piramidin iki yanından **mezar odasına**; odadan kum altındaki **antik geçide**; geçit tapınağın **alt mahzenine** (iki yan kapı) ve ortada çökmüş kuyu çıkışı. Tapınak tuğlası astar, kandiller |
| Lanetli Liman | **Fener odası** (yan kapı), yalıyarın altında **kaya oyuğu** (yayla deliği + yalıyar ağzı), **gemi ambarı** (iki ambar ağzı), **rıhtım altı kaçakçı geçidi** (iki merdiven) ve depo lobileri |

Kurallar: rampalar ≤ ~42°, dikey açıklık ≥ 48 px (karakter 28 px), 26 px'ten ince tavan bırakılmaz, tünel çevresi dayanıklı astar (aynı patlama ~%55 daha az oyar) ama tamamen yıkılmaz değil; ağızların önüne dekor/siper konmaz.

## Bilinen eksikler / sınırlar
- Debug APK ve imzasız AAB derlendi; ancak **hiçbir emülatörde veya telefonda çalıştırılmadı** (yalnızca paket içeriği ve manifest doğrulandı). GitHub Actions iş akışı hâlâ çalıştırılmadı.
- APK, Capacitor varsayılanı olan `INTERNET` iznini içerir; yazı tipleri gömülü olduğu için oyun dış bağlantı kurmaz. İsterseniz izni `android/app/src/main/AndroidManifest.xml`'den kaldırabilirsiniz (test edilmedi).
- **Gerçek cihaz testi yapılmadı.** Tüm testler masaüstü Chromium'da (telefon çözünürlüğü emülasyonu dahil) yapıldı. Dokunmatik testler sentetik çoklu-pointer olaylarıyla yapıldı.
- Çevrim içi çok oyunculu, hesap, eşleştirme, arkadaş daveti, bulut kayıt **yok**. Yerel çok oyunculu = aynı cihazda sırayla.
- `localStorage` cihazlar arası senkronize olmaz; uygulama kaldırılınca ilerleme silinir.
- Rüzgâr kılavuzu karakterlere çarpmayı hesaba katmaz (v8 ile aynı): mermi yolda bir savaşçıya çarparsa gerçek nokta farklı olur.
- Yükleme ekranı: harita üretiminin ilk adımı (arazi şekli, ~100–300 ms masaüstünde) tek parça çalışır; boyama dilimlere bölündü. Düşük güçlü telefonda ölçülmedi.
- Kostümler yalnızca P1'e uygulanır; Kara Mayını ve Sekmeli Bomba'yı yapay zekâ kullanmaz (v8 ile aynı).
- Test kancaları (`window.__game`, `__meta`, `__start`, `__drawAnimal` vb.) ve `?demo=` ekran görüntüsü başlatıcısı kodda; oynanışı etkilemez.

## Yayın öncesi kullanıcının tamamlaması gerekenler
1. `dist/boompuff-9.0.0-debug.apk`'yı gerçek telefonlara kurup test etmek.
2. Yükleme anahtarını oluşturmak ve güvenle saklamak; uygulama kimliğini kesinleştirmek (değişirse `capacitor.config.json` + `android/app/build.gradle` + yeniden derleme). Sonra AAB'yi imzalamak:
   `jarsigner -keystore upload.jks dist\boompuff-9.0.0-release-unsigned.aab boompuff` (veya `bundleRelease`'i imza ayarlarıyla yeniden çalıştırmak).
3. En az 2–3 farklı gerçek Android telefonda [docs/TEST-RAPORU.md](docs/TEST-RAPORU.md) içindeki cihaz test planını uygulamak.
4. Gizlilik politikasını gerçek bir URL'de yayınlamak (taslak: `store/privacy-data-safety-rating.md`).
5. Play Console: geliştirici hesabı, mağaza kaydı (metinler `store/`), Veri güvenliği formu, IARC içerik derecelendirmesi, hedef kitle, kapalı test (yeni kişisel hesaplarda zorunlu kapalı test süresi kuralına dikkat).
