# BOOMPUFF v10.6 — 6. Grup (Türkçe / English + görsel iyileştirmeler)

Değişen dosyalar: `www/index.html`, **yeni `www/i18n.js`** (merkezi dil dosyası), `www/sw.js` (önbellek 10.6.0 + i18n.js önbelleğe eklendi), `package.json`, `server/package.json` (yalnızca sürüm), bu dosya. Sunucu kodu değişmedi.

## 14. Çoklu dil (Türkçe / English)
| İstek | Nasıl |
|---|---|
| Dil seçeneği | Ana menü kartının sağ üstünde **🌐 TR / EN** düğmesi; dokununca anında değişir. |
| Her ekran | Ana menü, oyun içi HUD (silahlar, pusula, ipuçları, afişler), uyarılar ve bildirimler, oda ekranları, davet, lobi, sonuç ekranları, açılış/yükleme ekranı, gardırop, görev/başarım, eğitim, yardım. Yeni özel güçler (Şimşek, Pus Bulutu, portallar, 3x küre, sandık, Ölüm Maçı, Takım Savaşı) dahil. Sunucudan gelen hata mesajları da çevrilir. |
| Merkezi dosya | Tüm İngilizce metinler `www/i18n.js` içinde (~560 kayıt + değişkenli cümleler için kurallar + yardım panelinin bütün blokları). Kaynak dil Türkçe. |
| Eksik çeviri | Sözlükte yoksa Türkçe metin aynen kalır — boş metin oluşmaz. |
| Kalıcılık | Tercih cihazda saklanır (`bp_lang`). İlk açılışta cihaz dili Türkçe ise TR, değilse EN. |
| Çok oyunculu | Çeviri tamamen cihazda yapılır, ağ üzerinden dil gönderilmez → her oyuncu kendi dilini görür, bir oyuncunun değiştirmesi diğerini etkilemez (test: aynı lobide oda sahibi EN, misafir TR). |
| Oyuncu adları | Oyuncu/karakter adları çevrilmez (ör. "Volkan" adlı oyuncu "Volcano" olmaz); adı haritayla aynı olan oyuncu varsa o oturumda o kelime çevrilmeden kalır. |

**Nasıl çalışır (teknik):** ekrandaki metin düğümleri ve `title/placeholder/aria-label` öznitelikleri bir izleyiciyle (MutationObserver) otomatik çevrilir; orijinal Türkçe saklanır, TR'ye dönünce birebir geri yazılır (test: TR → EN → TR metni aynı). Tuvale çizilen yazılar (pusula, oyuncu etiketleri, uçan yazılar, tekrar/sis etiketleri) çizim anında önbellekli olarak çevrilir. Türkçe moddayken izleyici çalışmaz (ek yük yok). Oyun mantığına, hesaplamalara ve senkrona dokunulmadı.

## 18. Görsel iyileştirmeler (bu grupta eklenenler)
Önceki gruplarda: açılış ekranı, zafer/mağlubiyet ekranları, harita kartları, portal, 3x küre, Şimşek, sis, son vuruş tekrarı, hazine sandığı, Ölüm Maçı skorbordu. Bu grupta, akışı yavaşlatmayan ve yalnızca görsel olanlar:
- **Silah seçimi:** seçilen yuva kısa bir zıplama + altın parıltı, ikon hafifçe döner ("hareket azaltma" tercihinde kapalı).
- **Sıra kimde:** her tur başında sıradaki karakterin ayağının altında takım renginde genişleyen çift halka (oda sahibi ve misafirlerde).
- **Ölüm anı:** takım renginde şok halkası + kıvılcımlar + yükselen ruh dumanı + hafif sarsıntı (sıvıya düşünce de); online istemcilerde de oynar.
- Atış pusulasında uzun silah adı (İngilizce) başlık etiketiyle çakışınca etiket gizlenir.

## Testte bulunan ve düzeltilen
- Dil düğmesinin CSS'i ekleme sırasında yanlışlıkla betiğin içine de girmişti → oyun betiği çalışmıyordu; bulundu ve kaldırıldı (artık her değişiklikten sonra betik Node ile sözdizimi kontrolünden geçiriliyor).
- Üst bardaki saatte maç yüklenirken "Tur undefined" görünüyordu → "Tur 0".
- 360 px İngilizce menüde "1v1 Deathmatch" düğmesi taşıyordu → dar ekranda heceleme.

## Test edilenler
- Menü, yardım, online (ana/oluştur/lobi), görevler, başarımlar, gardırop, profil, yükleme, üst bar, alt panel, HUD: İngilizcede Türkçe kalan metin taraması → yalnızca bilgisayar karakter adları (özel isim) kaldı.
- Oyun içi (bilgisayara karşı ve Ölüm Maçı): afişler, ipuçları, ULTİ menüsü, savunma, pusula, skorbord, yeniden doğma, sonuç ekranı ve ödüller İngilizce.
- 22 örnek değişkenli cümle için birim testi (ör. "Ali suya düştü!" → "Ali fell in the water!", "Kırmızı Takım kazandı!" → "Red Team wins!").
- TR → EN → TR geri dönüş kayıpsız; tercih kaydediliyor; 360 px'te menüde taşma yok.

## Elle kontrol
- İngilizce metinlerin doğallığı (özellikle eğitim ve yardım).
- Gerçek telefonda dil düğmesinin konumu ve yeni efektlerin hissi.
