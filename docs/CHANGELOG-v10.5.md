# BOOMPUFF v10.5 — 5. Grup (Pus Bulutu + Takım Savaşı + Son Vuruş Tekrarı + Tünel Hazineleri)

Değişen dosyalar: `www/index.html`, `www/sw.js` (önbellek 10.5.0), `package.json`, **`server/server.js`** + `server/package.json` (10.5.0), bu dosya.

> **Sunucu:** yalnızca oda türlerine `team` eklendi (oluşturma/ayar/başlatma kuralları). Oda, bağlantı, koltuk, oda sahibi otoritesi ve mesaj aktarımı aynı. GitHub'a gönderince Render otomatik yükler. Online oynayan herkesin 10.5'te olması gerekir.

## 13. Pus Bulutu (sis gücü) — onaylı tasarım + sizin değişikliğiniz
| Konu | Nasıl |
|---|---|
| Nasıl kullanılır | Yeni **ULTİ** seçeneği "Pus Bulutu" (ULTİ çubuğu dolu olmalı; tur harcamaz, sonra atış yapılabilir). Tek rakip varsa doğrudan ona, birden fazla varsa rakip karaktere dokunarak seçilir. |
| Süre | Hedef takımın **yalnızca bir sonraki turu**. O tur bitince kalkar; aynı takım ardından **bir tam tur** boyunca tekrar sislenemez. |
| Kimin ekranında | **Herkesin** (isteğiniz): sisli tur boyunca tüm oyuncular sisi görür, rakibin zorlanmasını izler. Üstte "PUS BULUTU · takım adı" etiketi. |
| Görüş | Karakterin çevresi (~260 px) net; dışarısı kararma + açık gri pus + yavaş süzülen sis bulutları + kenarlardan pus. Yoğunluk en fazla %65 (zaten sisli Lanetli Liman'da %50). Yumuşak giriş/çıkış. Kimse kör olmaz: arayüz ve Atış Kompası görünür. |
| Zorlaştırma | Sisli oyuncunun kırmızı rüzgâr kılavuzu ve isabet halkası gizlenir, beyaz nişan noktaları %40 kısalır. Bilgisayar sisliyken ~2,6 kat daha az isabetli. |
| Online | Etki durumu oda sahibinde; anlık görüntüyle (`hz`) herkese gider. |

## Fikir 1 — Takım Savaşı (2v2 / 3v3, online)
- Oda oluştur → **Oyun türü: 👥 Takım Savaşı** → **2v2 / 3v3**. Lobide oda sahibi türü ve takım boyunu değiştirebilir.
- Takımlar katılma sırasına göre: 1., 3., 5. oyuncu **Kırmızı**, 2., 4., 6. oyuncu **Mavi** (lobide renkli rozetle görünür). Maç tam 4 ya da 6 kişiyle başlar.
- Her oyuncu kendi karakterini oynar; sıra takımlar arasında, takım içinde oyuncular arasında döner (K1 → M1 → K2 → M2 …). Takım arkadaşının sırasında kontrol yoktur. ULTİ çubuğu takım ortaktır. Rakip takımın tüm karakterleri elenince takım kazanır; kazanan takımdaki herkes ZAFER görür.
- Teknik: online kodda "oyuncu = takım" varsayımı "oyuncu = karakter sahibi" olarak ayrıldı (`seatOf`, `myChar`). Klasik modda davranış aynı (her oyuncu kendi takımı).

## Fikir 2 — Son Vuruş Tekrarı
- Maçı bitiren atış bir rakibi elediyse, sonuç ekranından önce **ağır çekimde (×0,42)** yeniden oynatılır: sinema şeritleri, "SON VURUŞ" yazısı, kırmızı "TEKRAR" işareti; kamera mermiyi ve patlamayı izler. Ateşten patlamanın 1,5 sn sonrasına kadar (en fazla ~4 sn kayıt, ekranda ~4,5–9 sn).
- **Atla ›** butonu veya Esc/Boşluk/Enter ile geçilir. Menüye çıkılırsa iptal olur.
- Her cihaz kendi gördüğünü kaydeder (atış başında arazinin bir kopyası + saniyede 30 kare + patlamalar); oyun durumuna dokunmaz. Ölüm Maçında (süre bitince biter) ve Eğitimde yok.

## Fikir 3 — Tünel Hazineleri
- 3. turdan itibaren tünel odalarında **hazine sandığı** belirir (aynı anda 1; geniş haritada 2). Açılan sandığın yerine 2 tur sonra yenisi gelir.
- Hangi takımın karakteri dokunursa açar: **+1 ULTİ şarjı** (%40) · sınırlı bir silaha **+1 hak** (%40) · **+25 altın** (%20, yalnızca insan oyuncu; bilgisayar için cephaneye döner). Zemin oyulursa sandık düşer, sıvıya düşerse kaybolur.
- Görsel: ahşap gövde, altın kenar ve kilit, nabız gibi parlayan ışık, yükselen pırıltılar; açılışta halka + kıvılcım + ödül yazısı + üç notalı ses. Online: oda sahibi hesaplar, `ev {k:'chest'}` ile efekt ve altın herkese gider.

## Testte bulunan ve düzeltilen eski hatalar (önemli)
Satır sonuna eklenen `//` yorumları aynı satırdaki sonraki kodu "yutmuş":
- **v9:** harita süs nesnelerinin üst üste binmesini engelleyen kontrol çalışmıyordu → geri açıldı (süsler artık iç içe girmez; harita görünümü biraz değişebilir).
- **v10.1:** açılış ekranının en az gösterim süresi atlanıyordu → düzeldi.
- **v10.2:** yavaş cihazda biriken fizik açığını sınırlayan satır çalışmıyordu → düzeldi (yavaş telefonda "yetişmeye çalışma" takılması önlenir).
- Bu sürümde aynı hatayı iki kez daha yaptım ve test sırasında yakaladım; tüm dosya tarandı, başka yok. Bundan sonra satır içi açıklamalar `/* */` ile.

## Test edilenler (hedefli)
- **Sis (yerel):** ULTİ ile kullanıldı → hemen değil, rakibin sonraki turunda etkin; gece haritasında ekran görüntüsü (net çevre, gri pus). **Online (4 kişi):** 3 rakipten koltuk 1 seçildi; sisli turda oda sahibi ve koltuk 3 sisi gördü; sonraki turda kalktı, koltuk 1 7. tura kadar korumalı.
- **Takım Savaşı (4 sekme, 2v2):** takımlar Kırmızı {0,2} / Mavi {1,3}; sıra 0→1→2→3→0→1; koltuk 2'nin turunda yalnızca o kontrol etti (oda sahibi takım arkadaşı dahil); rakip koltuğun sahte ateş komutu reddedildi; Mavi elenince oda sahibi ve koltuk 2 "ZAFER", koltuk 1 ve 3 "MAĞLUBİYET · Kırmızı Takım kazandı!". Aynı oda Klasik'e çevrildi → 4 ayrı takımla klasik maç başladı.
- **Son Vuruş Tekrarı:** kayıt 104 kare; tekrar penceresi atışın başından patlama+1,5 sn'ye; ekran görüntüsü (şeritler, SON VURUŞ, TEKRAR, Atla); kendiliğinden ~4,5 sn'de bitip ZAFER ekranı açıldı.
- **Hazine:** şehir haritasında 7 tünel noktası, sandık çıktı; koltuk 2 açtı (+1 ULTİ, ikinci denemede +1 Buz Bombası) ve misafirde efekt + yazı görüldü.

## Bilinen / elle kontrol
- Takım Savaşında takımlar katılma sırasıyla belirleniyor; takım değiştirme (oyuncunun kendi seçmesi) yok — isterseniz eklerim.
- Takım Savaşı yalnızca online.
- Son vuruş tekrarı her cihazın kendi kaydıyla; arka planda kalmış (görünmeyen) sekmede kayıt olmayacağı için o cihazda tekrar oynamaz, doğrudan sonuç ekranı gelir.
- Gerçek telefonda: sisin okunabilirliği, tekrarın akıcılığı ve süresi.
