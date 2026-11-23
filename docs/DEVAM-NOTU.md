# BOOMPUFF — Devam notu (yeni sohbet için)

**Durum (23.11.2026):** sürüm **11.8.0**. Ayrıntılar CHANGELOG-v11'de (11.3–11.8).
- Yayın akışı: `boompuff-v10` → `C:\Users\erdem.onat\Desktop\BoomPuff` deposuna kopyala → commit → kullanıcı GitHub Desktop'tan push eder → Render kurar. Her sürümde `server/package.json` sürümü artırılıyor, böylece Render kurulumu kesin tetikleniyor.
- Gemini ham görselleri `www/assets/*/_kaynak/` içinde, yalnızca yerelde.
- 11.4.0: resimli ana menü (Gemini arka planları, karakter taş kaidede, sağda geniş butonlar, taş yuvarlak butonlar).
- 11.3.0: Görevler/Başarımlar ve Profil Tropik tasarım, ÖDÜLÜ AL akışı, sis görüş dairesi, silah kartı düzeltmesi.
- Ayrıntılar CHANGELOG-v11'de.
- 11.3.0 yerel depoda commit edildi (75c6090); gönderim (push) kullanıcıda. v10.1–10.6 "Kapsamlı Oyun Geliştirme" + v11 "Yeni Ana Menü / Karakter / Mağaza / Sohbet / 200 HP / Skorbord" tamamlandı.

| Grup | Sürüm | İçerik | Ayrıntı |
|---|---|---|---|
| 1–6 | 10.1–10.6 | Sunucu adresi, joystick, portallar, Ölüm Maçı, Takım Savaşı, i18n … | docs/CHANGELOG-v10.1 … v10.6 |
| v11 | 11.0 | Tropik Macera ana menü, 4 yeni karakter (Baykuş/Yılan/Boğa/Ejderha), 30 seviye açılma, elmas + mağaza, Google Play doğrulama altyapısı, bekleme odası + maç içi sohbet ve küfür filtresi, joystick sağ/sol, 200 HP + Ayı 240, yeni skorbord ve gerçek maç istatistikleri | docs/CHANGELOG-v11.md |

**Yapılmayanlar / bekleyenler**
- GitHub'a gönderim kullanıcıda. Yeni dosyalar: `www/chat-filter.js`, `server/catalog.js`, `server/iap.js`, `docs/CHANGELOG-v11.md` (+ v10.6'dan `www/i18n.js`).
- Gerçek ödeme: Google Play kimlik bilgileri, ürünler, `cordova-plugin-purchase`, kalıcı ödeme kaydı (bkz. CHANGELOG-v11 "Bekleyen dış yapılandırma").
- Hesap/veritabanı yok: altın/elmas/envanter cihazda (istemci değiştirebilir). Sunucu doğrulamalı ekonomi için hesap + veritabanı gerekiyor (kullanıcı "şimdilik cihazda" dedi).
- Android APK/AAB yeniden üretilmedi. Gerçek telefon kontrolleri (joystick sağ hissi, sohbet klavyesi, 4+ kişilik takım skorbordu).

**Mimari özet:** tek dosya oyun `www/index.html` (+ `i18n.js`, `chat-filter.js`), oda sunucusu `server/server.js` (Node + ws, Render) + `/api/catalog`, `/api/iap/verify`. Online maçta fiziği oda sahibi hesaplar; yeni güçler (zehir, itme, rüzgâr, yarıçap) ve istatistikler de oda sahibinde; istatistikler `ev:{k:'over',st}` ile istemcilere gider. Sohbet sunucuda filtrelenip odaya yayılır.

**Yerel test:** Node `C:\Users\erdem.onat\bp-toolchain\node\node-v22.23.5-win-x64\node.exe` (PATH'te yok). `.claude/launch.json` → "boompuff" (http://localhost:8787).

**Çalışma kuralları:** çalışan online sistemi bozma; yalnızca hedefli test; ağır kütüphane yok; mobil öncelikli; yeni tasarım fikirleri için önce onay; her iş sonunda Türkçe rapor.
