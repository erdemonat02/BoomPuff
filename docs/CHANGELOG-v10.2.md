# BOOMPUFF v10.2 — 2. Grup

Sunucu (`server/`) **değişmedi**. Değişen dosyalar: `www/index.html`, `www/sw.js` (önbellek adı 10.2.0), `package.json` (10.2.0), bu dosya.

| # | Konu | Ne yapıldı |
|---|---|---|
| 1 | Yürürken silah gizlenir | Karakter yürürken ya da havadayken (zıplama/düşme) elindeki silah çizilmez. Durunca veya nişan almaya başlayınca ≈0,15 sn'de küçülerek/saydamlıktan geri gelir. Yalnızca görüntü — atış, nişan ve fizik aynı. Online'da diğer oyuncular da aynı şekilde görür (yürüme bilgisi zaten anlık görüntüde vardı). |
| 2 | Online görsel harita seçimi | Oda oluşturma ekranındaki açılır liste yerine, menüdeki ön izleme görselleriyle kaydırmalı harita şeridi (‹ › okları + parmakla kaydırma; seçili kartta ✔). Lobide de aynı şerit: oda sahibi dokunarak değiştirir (mevcut `settings` mesajı), diğer oyuncular seçili haritayı canlı görür ama değiştiremez ("oda sahibi seçer"). Sonuç ekranındaki "Haritayı Değiştir" kartlarıyla aynı çizim kodunu paylaşır. |
| 3 | Şimşek (11. silah) | Maç başına 1 hak. Hava Saldırısı gibi hedef seçilir: dokunduğun x konumunda gökten aşağı **ilk engele** düşer — önce karakter (gövde merkezine, **tam isabette 36 hasar**), yoksa arazi, yoksa sıvı yüzeyi. Rüzgârdan etkilenmez. Hasar mesafeyle azalır (patlama yarıçapı 34; karakter kenarına ≈29, 48 px dışı 0). Küçük krater (yarıçap ×0,7). Mega Atış ile ×2,5 hasar / ×1,5 alan. Görsel: zikzak ana kanal + 3 dal, iki kez titreyen parlaklık, ekran flaşı, kıvılcım, gök gürültüsü sesi. Nişan alırken hedefin üstünde kesik dikey çizgi gösterilir. Klavye: `-` tuşu. Bilgisayar rakibi Şimşek kullanmaz (Hava Saldırısı gibi). |

## Küçük düzeltmeler
- Lobide dar ekranda "Harita · Buzul Adası" etiketi kelime kelime kırılıyordu → tek satır.
- Oyun döngüsü: harita henüz yüklenmemişken (açılış sürerken) fizik adımı atlanır. Önceden `?demo=` test başlatıcısı açılış bitmeden maç başlatınca döngü hata verip durabiliyordu.

## Online uyumluluk
- Şimşek oda sahibinde hesaplanır (host otoritesi korunur). Oda sahibi önce yalnızca görüntü için `ev {k:'bolt'}` yollar, ardından mevcut patlama olayı (`ev {k:'x'}`, tam koordinat) krateri ve hasarı herkese dağıtır. İstemcinin isteği mevcut `tgt` komutuyla gider. Silah listesi anlık görüntüdeki mermi dizisine otomatik eklendi.
- **Eski sürümle karışık odada oynanmamalı:** 10.1 istemcisi 11. silahı tanımaz. Render'a gönderince herkes yeni sürümü alır; PWA olarak kurmuş oyuncular bir sonraki açılışta güncellenir.

## Test edilenler (hedefli)
- Yerel: Şimşek tam isabet 100→64 (36), hak 1→0, hedef modu `bolt`; yürürken silah saydamlığı 0, durunca 1.
- Online (bu bilgisayarda iki sekme): oda oluşturmada şeritten Volkan → oda Volkan ile kuruldu; lobide oda sahibi Buzul Adası seçti → misafirde göründü; misafirin tıklaması etkisiz. Maç Buzul Adası'nda başladı. Oda sahibinin Şimşek'i: misafirde yıldırım + can 100→64 + krater. Misafirin Şimşek'i (komutla): oda sahibinde can 100→64, iki tarafta hak 0, krater sayısı eşit. 60 px ıska: hasar yok, yıldırım misafirde göründü.
- 360 px: harita şeridi taşma yapmıyor, ön izlemeler çiziliyor.

## Elle kontrol
- Telefonda şeridi parmakla kaydırma hissi; Şimşek sesi/parlaması gerçek cihazda.
