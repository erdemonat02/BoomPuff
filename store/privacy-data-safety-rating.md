# Gizlilik, Veri Güvenliği ve İçerik Derecelendirmesi — hazırlık notları

## 1. Kod üzerinden doğrulanan veri davranışı (v9)
Kaynak kodda (`www/index.html`, `www/sw.js`) yapılan tarama sonucu:
- `fetch`, `XMLHttpRequest`, `WebSocket`, `sendBeacon`, analitik/reklam SDK'sı **yok**. Oyun hiçbir sunucuya veri göndermez.
- Kalıcı veri yalnızca cihazdaki `localStorage`'da: `bp_profile` (profil: oyuncu adı, seviye, XP, altın, istatistikler, başarımlar, kostümler), `bp_profile_bak` (yedek), `bp_music` ve menü tercihleri. Bu veriler cihazdan çıkmaz.
- Oyuncu adı serbest metindir (en fazla 14 karakter), yalnızca cihazda tutulur.
- Tek dış bağlantı: `www/fonts/fonts.css` yoksa **Google Fonts** (fonts.googleapis.com / fonts.gstatic.com) — yazı tipi indirirken Google cihazın IP adresini görebilir. `tools/fetch-fonts.ps1` çalıştırılıp yazı tipleri pakete gömülürse uygulama **hiçbir dış bağlantı kurmaz**. Mağaza sürümü için bunun yapılması önerilir.
- Android izinleri: Capacitor varsayılan şablonu `INTERNET` iznini ekler. Oyun internete ihtiyaç duymaz; yazı tipleri gömüldükten sonra bu izin kaldırılabilir (ya da bırakılabilir, veri toplanmaz). Kamera, mikrofon, konum, rehber vb. izin **istenmez**. Ses çalmak için izin gerekmez.

## 2. Google Play — Veri güvenliği (Data safety) formu için önerilen yanıtlar
(Yazı tipleri gömülü sürüm için)
- Uygulamanız gerekli kullanıcı veri türlerinden herhangi birini topluyor veya paylaşıyor mu? → **Hayır**
- Veriler aktarım sırasında şifreleniyor mu? → Veri aktarımı yok (form "veri toplanmıyor" seçildiğinde bu soru sorulmaz)
- Kullanıcılar verilerinin silinmesini isteyebilir mi? → Veriler yalnızca cihazdadır; uygulamayı kaldırmak / uygulama verilerini temizlemek siler.
Eğer Google Fonts bağlantısı bırakılırsa: geliştirici veri toplamaz; ancak üçüncü taraf yazı tipi isteği hakkında gizlilik politikasında bilgi verin.

## 3. Gizlilik politikası
Google Play, uygulama mağaza kaydında bir gizlilik politikası bağlantısı ister. **Bu teslimatta gerçek bir URL yoktur ve sahte URL üretilmemiştir.**
Yapılacak: Aşağıdaki taslağı kendi alan adınızda veya ücretsiz bir statik barındırmada (ör. GitHub Pages) yayınlayıp Play Console'a girin.

### Taslak metin
> **BOOMPUFF Gizlilik Politikası** (son güncelleme: [TARİH])
> BOOMPUFF kişisel veri toplamaz, saklamaz veya üçüncü taraflarla paylaşmaz. Oyun ilerlemeniz (oyuncu adı, seviye, altın, başarımlar, kostümler) yalnızca cihazınızda yerel olarak saklanır ve hiçbir sunucuya gönderilmez. Uygulamada reklam, analitik, hesap sistemi veya uygulama içi satın alma yoktur. Uygulamayı kaldırdığınızda bu veriler cihazınızdan silinir. Sorularınız için: [İLETİŞİM E-POSTASI].

KVKK: Uygulama kişisel veri işlemediği için aydınlatma metni yükümlülüğü doğmaz; yine de geliştirici kimliği ve iletişim bilgisi mağaza kaydında yer almalıdır. (Hukuki değerlendirme değildir; gerekirse bir hukukçuya danışın.)

## 4. İçerik derecelendirmesi (IARC anketi) için bilgiler
- Şiddet: **Çizgi film / fantastik şiddet** — sevimli hayvan karakterler bombalarla birbirini "eler"; kan, yaralanma görüntüsü, gerçekçi silah yok. Elenen karakter hale ile yükselir ya da suya batar.
- Korku, cinsellik, küfür, uyuşturucu/alkol/tütün: **Yok**
- Kumar / benzetilmiş kumar: **Yok** (altın yalnızca oyun içi kazanılır, satın alınamaz; şans kutusu yok)
- Kullanıcı etkileşimi / sohbet / içerik paylaşımı: **Yok**
- Konum paylaşımı, kişisel bilgi paylaşımı: **Yok**
- Dijital satın alma: **Yok**
Beklenen derecelendirme: PEGI 7 / ESRB Everyone 10+ civarı (kesin sonuç IARC anketiyle belirlenir).

## 5. Hedef kitle
Görsel stil çocuklara hitap edebilir. 13 yaş altını hedef kitleye eklerseniz Google Play **Aileler politikası** gereklilikleri devreye girer (reklam/SDK kısıtları, gizlilik politikası vb.). Oyunda reklam/SDK olmadığı için uyum kolaydır; ancak bu kararı Play Console'da siz vermelisiniz.
