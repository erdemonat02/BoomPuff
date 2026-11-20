# BOOMPUFF online sunucusu (v10)

Tek bir Node.js süreci: **WebSocket oda sunucusu** + oyunun **statik dosyaları** (`../www`). Gizli anahtar, API anahtarı, veritabanı veya üçüncü taraf hesap **gerekmez**.

## Yerelde çalıştırma
```
cd server
npm install
npm start                 # http://localhost:8787 → oyun; ws://localhost:8787 → oda sunucusu
```
Aynı Wi-Fi'deki telefonlar bilgisayarın IP'siyle (`http://192.168.x.x:8787`) bağlanıp test edebilir (Windows güvenlik duvarı izni gerekebilir). İnternet üzerinden arkadaşlarla oynamak için sunucunun **herkese açık bir adreste ve HTTPS/WSS** ile yayınlanması gerekir (aşağıda).

Ortam değişkenleri: `PORT` (vars. 8787), `STATIC_DIR` (vars. `../www`), `ALLOWED_ORIGINS` (virgülle ayrılmış izinli Origin listesi; boşsa hepsi). Sağlık kontrolü: `GET /health`.

## Yayınlama seçenekleri ve maliyet (fiyatlar değişebilir — kayıt öncesi sağlayıcının sayfasından doğrulayın)
| Seçenek | Maliyet | Not |
|---|---|---|
| **Render – Free Web Service** | 0 $ | En kolay. 15 dk hareketsizlikte uyur; ilk bağlantı ~30–60 sn sürer. Aylık ücretsiz kullanım saati sınırlı. Arkadaş grubu için yeterli. |
| Render – Starter | ~7 $/ay | Uyumaz. |
| Fly.io | kullandıkça öde (~2–5 $/ay küçük makine) | Kredi kartı gerekir. |
| Railway | ~5 $/ay (Hobby) | Kredi kartı gerekir. |
| Kendi VPS'iniz (Hetzner, DigitalOcean…) | ~4–6 $/ay | Nginx + Let's Encrypt ile WSS kurulumu sizde. |

### Render ile (önerilen, ücretsiz)
1. Projeyi bir GitHub deposuna yükleyin.
2. render.com → New → **Web Service** → depoyu seçin.
3. Root Directory: `server` · Build Command: `npm install` · Start Command: `npm start` · Instance: Free.
4. Ortam değişkeni: `STATIC_DIR=../www` (oyunu da aynı adresten sunar).
5. Yayın adresi ör. `https://boompuff-xxxx.onrender.com` olur. Web'de oynamak için bu adresi açmanız yeterli (oyun aynı sunucuya bağlanır).
6. **Android/iOS uygulaması** için `www/net-config.js` içine `window.BOOMPUFF_SERVER='wss://boompuff-xxxx.onrender.com'` yazıp uygulamayı yeniden derleyin (`npx cap sync android`). Uygulama `https://localhost` kökeninden çalıştığı için **wss://** (şifreli) adres zorunludur.

## Mimari ve güvenlik notları
- Maç fiziği **oda sahibinin cihazında** çalışır (oda sahibi otoritesi). Sunucu: oda/koltuk yönetimi, girdileri yalnızca sahibinin koltuğu adına iletme, sonuç bildirimini yalnızca oda sahibinden kabul etme ve kazananın odada olduğunu doğrulama.
- **Tam otoriter sunucu değildir**: hile yapmak isteyen bir oda sahibi kendi cihazında oyunu değiştirebilir. Arkadaşlar arası oyun için yeterli; herkese açık sıralama/ödül sistemi için fiziğin sunucuya taşınması gerekir (aşağıda).
- Kişisel veri saklanmaz; oyuncu adı/karakter/kostüm yalnızca bellekte tutulur ve oda kapanınca silinir. Kalıcı kayıt yoktur.
- Yeniden bağlanma: oturum jetonu (tarayıcı sekmesinde `sessionStorage`) ile 60 sn içinde aynı koltuğa dönülür; oda sahibi koparsa 45 sn beklenir, dönmezse oda kapanır.

## İleride
- Tam sunucu otoritesi: oyun motoru (`Game`, `Terrain`, `stepProjectile`) tarayıcıdan bağımsız bir modüle ayrılıp Node'da çalıştırılabilir.
- Hesap, arkadaş listesi, kalıcı istatistik ve eşleştirme için veritabanı ve kimlik doğrulama gerekir (kapsam dışı).
