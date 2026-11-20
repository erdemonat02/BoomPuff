# Online sunucuyu Render'da yayınlama (ücretsiz) — adım adım

Sonunda elinizde `https://boompuff-xxxx.onrender.com` gibi bir adres olacak. Bu adresi açan herkes oyunu tarayıcıda oynayabilir ve **ARKADAŞLARINLA OYNA** ile aynı odaya girebilir. Süre: ~15 dakika. Maliyet: 0 $ (Render Free). Kredi kartı gerekmez.

## Hazır olanlar (bu projede)
- `render.yaml` — Render "Blueprint" tanımı: Node 22, `server/` klasörü, `npm start`, sağlık kontrolü `/health`, oyun dosyaları `www/` aynı adresten sunulur.
- `server/` — oda sunucusu (`ws` paketi dışında bağımlılık yok, gizli anahtar yok).
- `tools/set-server.ps1` — mobil uygulamaya sunucu adresini yazar.

## 1. GitHub'a yükleyin
1. github.com'da hesap açın (yoksa) → sağ üstte **+ → New repository** → ad: `boompuff` → **Private** seçebilirsiniz → Create.
2. Bilgisayarınızda proje klasöründe (PowerShell, `boompuff-v10` içinde):
   ```
   git init
   git add .
   git commit -m "BOOMPUFF v10"
   git branch -M main
   git remote add origin https://github.com/KULLANICI_ADINIZ/boompuff.git
   git push -u origin main
   ```
   (Git yüklü değilse: GitHub Desktop uygulamasıyla "Add existing repository" → Publish. `.gitignore` sayesinde `node_modules`, derleme klasörleri, `dist/` ve imza anahtarları yüklenmez.)

## 2. Render'da Blueprint ile oluşturun
1. render.com → **Get Started** → GitHub ile giriş yapın.
2. Panelde **New → Blueprint** → `boompuff` deposunu bağlayın (Render'a depo erişimi izni vermeniz istenir).
3. Render `render.yaml` dosyasını okur ve `boompuff` adlı **Free Web Service** gösterir → **Apply / Deploy Blueprint**.
4. İlk kurulum 2–4 dakika sürer. Bitince servis sayfasında adres görünür: `https://boompuff-xxxx.onrender.com`.
5. Kontrol: `https://boompuff-xxxx.onrender.com/health` → `{"ok":true,...}` görmelisiniz. Ana adres oyunu açar.

## 3. Arkadaşlarla oynayın (web)
- Telefonunuzda (iPhone dahil) Safari/Chrome ile adresi açın → **ARKADAŞLARINLA OYNA → Oda oluştur** → **Arkadaş davet et** ile kodu/bağlantıyı paylaşın. Bağlantıyı açan arkadaş doğrudan odaya katılır (`?join=KOD`).
- iPhone'da **Paylaş → Ana Ekrana Ekle** ile uygulama gibi kullanabilirsiniz.

## 4. Android uygulamasına bağlayın (isteğe bağlı)
```
powershell -ExecutionPolicy Bypass -File tools\set-server.ps1 -Url https://boompuff-xxxx.onrender.com
```
Ardından README'deki derleme adımlarıyla APK/AAB'yi yeniden üretin.

## Bilmeniz gerekenler (ücretsiz plan)
- Servis ~15 dk kimse bağlanmazsa **uyur**; ilk açılış 30–60 sn sürebilir (yükleme ekranı/bağlanıyor yazısı). Odayı kurmadan önce adresi bir kez açmanız yeterli.
- Aylık ücretsiz kullanım saati sınırlıdır; arkadaş grubu için genelde yeter. Uyumasın isterseniz Starter plan (~7 $/ay; güncel fiyatı Render'dan kontrol edin).
- Sunucu yeniden başlarsa (yeni yükleme, uyku) açık odalar kapanır — maç sırasında yeni sürüm yüklemeyin.
- Her `git push` sonrası Render otomatik yeniden yükler (`autoDeploy: true`).
- Yalnızca kendi arkadaşlarınızın girmesini isterseniz Render'da ortam değişkeni `ALLOWED_ORIGINS=https://boompuff-xxxx.onrender.com,https://localhost` ekleyin (Android uygulaması `https://localhost` kökeninden bağlanır).

## Sorun giderme
| Belirti | Çözüm |
|---|---|
| "Sunucuya ulaşılamadı" | Servis uyanıyor olabilir; 1 dk bekleyip tekrar deneyin. `/health` adresini kontrol edin. |
| Uygulamada bağlanmıyor | `net-config.js` adresi `wss://` ile mi? `set-server.ps1` sonrası yeniden derlediniz mi? |
| Render "Build failed" | Logda `npm install` hatası varsa `server/package-lock.json` depoda mı kontrol edin. |
