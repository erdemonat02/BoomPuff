/* BOOMPUFF — merkezi dil dosyası (v10.6)
 * Kaynak dil Türkçe; İngilizce karşılıklar burada. Eksik çeviride Türkçe gösterilir (boş metin oluşmaz).
 * Dil tercihi bu cihazda saklanır (localStorage 'bp_lang'); online'da her oyuncu kendi dilini görür — ağ üzerinden metin dili gönderilmez.
 * Çalışma: ekrandaki metin düğümleri ve title/placeholder/aria-label öznitelikleri otomatik çevrilir (MutationObserver);
 * tuvale çizilen yazılar çizim anında çevrilir. Değişken içeren cümleler için aşağıdaki kurallar ve sayı kalıbı (#) kullanılır.
 */
(function(){'use strict';
const EN={
// ---- genel / menü ----
'Yükleniyor…':'Loading…','Hazırlanıyor…':'Getting ready…','Oyun yüklenemedi.':'The game could not load.','Tekrar dene':'Try again','Yine de devam et':'Continue anyway',
'Yükleme beklenenden uzun sürdü. Bağlantınızı kontrol edip tekrar deneyin.':'Loading took longer than expected. Check your connection and try again.',
'Yazı tipleri yükleniyor…':'Loading fonts…','Silahlar hazırlanıyor…':'Preparing weapons…','Savaş alanı kuruluyor…':'Building the battlefield…','Harita önizlemeleri…':'Map previews…','Hazır!':'Ready!','Hazır! %#':'Ready! #%',
'Savaş alanı oluşturuluyor…':'Building the battlefield…','Savaş alanı oluşturuluyor… %#':'Building the battlefield… #%','Savaşçılar hazırlanıyor… %#':'Preparing fighters… #%','Önizleme hazırlanıyor…':'Preparing preview…',
'SAVAŞ ALANI':'BATTLEFIELD','Savaşçılar':'Fighters','# savaşçı':'# fighters',
'OYUNCU PROFİLİ':'PLAYER PROFILE','Oyuncu profili':'Player profile','Oyuncu adı':'Player name','Oyuncu adın':'Your player name','Oyuncu':'Player','Oyuncu #':'Player #','Sen':'You','Seviye':'Level','SV':'LV','SV #':'LV #',
'Oyuncu seviyesi ve XP':'Player level and XP','# / # XP':'# / # XP',
'Eğitim':'Training','EĞİTİM':'TRAINING','Hayatta Kal':'Survival','Gardırop':'Wardrobe','Görevler':'Missions','Başarımlar':'Achievements','GÖREVLER & BAŞARIMLAR':'MISSIONS & ACHIEVEMENTS','Görev':'Mission','Başarım':'Achievement',
'ARKADAŞLARINLA OYNA':'PLAY WITH FRIENDS','online':'online','Mod':'Mode','Bilgisayara karşı':'Vs computer','Yerel çok oyunculu':'Local multiplayer','(aynı cihaz, sırayla)':'(same device, take turns)',
'⚔️ 1v1 Ölüm Maçı':'⚔️ 1v1 Deathmatch','1v1 Ölüm Maçı':'1v1 Deathmatch','(süreli, bilgisayara karşı)':'(timed, vs computer)','Oyuncu<br>sayısı':'Players','sayısı':'',
'Maç<br>süresi':'Match<br>length','Maç süresi':'Match length','Zorluk':'Difficulty','Kolay':'Easy','Normal':'Normal','Zor':'Hard','Orta':'Medium','Tam':'Full','Kısa':'Short',
'Karakter Seçimi':'Character','Harita Seçimi':'Map','Yardımcı nişan':'Aim assist','SAVAŞA BAŞLA':'START BATTLE','NASIL OYNANIR?':'HOW TO PLAY?','Önceki karakter':'Previous character','Sonraki karakter':'Next character','Önceki harita':'Previous map','Sonraki harita':'Next map',
'# sn':'# s','Rastgele':'Random','Dil':'Language',
// karakterler
'Tavşan':'Rabbit','Maymun':'Monkey','Ayı':'Bear','Arı':'Bee','Kaplan':'Tiger','Tilki':'Fox',
'Süper zıplama':'Super jump','Tırmanıcı':'Climber','Çevik tırmanış':'Agile climber','+# can':'+# HP','+# can (#)':'+# HP (#)','Süzülür':'Glides','Süzülür, düşme hasarı almaz':'Glides, takes no fall damage','+%# hasar':'+#% damage','+#% hasar':'+#% damage','Hızlı koşu':'Fast runner',
// haritalar
'Orman Adası':'Jungle Island','Volkan':'Volcano','Neon Şehir':'Neon City','Buzul Adası':'Glacier Island','Kayıp Çöl':'Lost Desert','Lanetli Liman':'Cursed Harbor',
'Palmiyeler, yüzen adalar ve kemer tünel':'Palm trees, floating islands and an arch tunnel','Lav gölü, kristaller ve uyanan bir krater':'A lava lake, crystals and an awakening crater','Neon tabelalar, gökdelenler ve zehirli kanal':'Neon signs, skyscrapers and a toxic canal',
'Donmuş göller, buz mağaraları ve kar yağışı':'Frozen lakes, ice caves and snowfall','Antik piramit, tapınak kalıntıları ve kum fırtınası':'An ancient pyramid, temple ruins and sandstorms','Korsan gemisi, ahşap iskeleler ve sisli bir gece':'A pirate ship, wooden piers and a foggy night',
'kaya altı geçitleri':'underground passages','Kök Tüneli':'Root Tunnel',
// silahlar
'Roket':'Rocket','El Bombası':'Grenade','Ağır Füze':'Heavy Missile','Çoklu Roket':'Cluster Rocket','Hava Saldırısı':'Air Strike','İtici Bomba':'Push Bomb','Yapışkan Bomba':'Sticky Bomb','Buz Bombası':'Ice Bomb','Kara Mayını':'Land Mine','Sekmeli Bomba':'Bouncy Bomb','Şimşek':'Lightning',
'Zemine/hedefe yapışır, 1,6 sn sonra patlar':'Sticks to ground or target, explodes after 1.6 s','Az hasar verir, vurduğunu bir sonraki turunda dondurur (hareket edemez)':'Low damage; freezes whoever it hits for their next turn (can’t move)',
'Zemine yerleşir; rakip yaklaşınca patlar':'Settles on the ground; explodes when an enemy gets close','Zeminde 3 kez sekip patlar':'Bounces 3 times, then explodes',
'Seçtiğin noktaya gökten yıldırım düşer':'Lightning strikes the spot you pick','tam isabette # hasar':'# damage on a direct hit','rüzgârdan etkilenmez':'not affected by wind',
'SİLAHLAR':'WEAPONS','silah kısayolları':'weapon shortcuts',
// ultiler ve savunma
'ULTİ':'ULTI','ULTİ (süper güç)':'ULTI (super power)','Meteor Yağmuru':'Meteor Shower','Şifa':'Heal','Işınlanma':'Teleport','Mega Atış':'Mega Shot','Pus Bulutu':'Fog Cloud',
'Seçtiğin bölgeye 8 meteor':'8 meteors on the area you pick','+50 can, tur devam eder':'+50 HP, your turn goes on','Haritada bir nokta seç':'Pick a spot on the map','Bu atış ×2,5 hasar':'This shot deals ×2.5 damage','Rakibin sonraki turu sisli geçer':'Your rival’s next turn is foggy',
'♥ +50 HP':'♥ +50 HP','+50 HP':'+50 HP','⛨ Enerji Kalkanı':'⛨ Energy Shield','Kalkan':'Shield','+50 HP — maç başına 1 kez (H)':'+50 HP — once per match (H)','Enerji kalkanı — %50 hasar emer, maç başına 1 kez (J)':'Energy shield — absorbs 50% damage, once per match (J)',
'ULTİ HAZIR!':'ULTI READY!','Sağ alttaki butona bas':'Tap the button at the bottom right','MEGA ATIŞ HAZIR':'MEGA SHOT READY','×2,5 hasar · ×1,5 krater':'×2.5 damage · ×1.5 crater','METEOR YAĞMURU!':'METEOR SHOWER!','HAVA SALDIRISI!':'AIR STRIKE!','ŞİMŞEK!':'LIGHTNING!',
'+50 HP bu maçta zaten kullanıldı':'+50 HP already used this match','Enerji Kalkanı bu maçta zaten kullanıldı':'Energy Shield already used this match','Canın zaten dolu':'Your health is already full','KALKAN AKTİF':'SHIELD ON','Kalkan söndü':'Shield faded',
'Savunma güçleri kendi turunda, atıştan önce kullanılır':'Defense powers are used on your own turn, before you shoot','Önce nişanı bırak':'Release your aim first',
'PUS BULUTU!':'FOG CLOUD!','PUS BULUTU':'FOG CLOUD','Pus bulutu — görüş azaldı':'Fog cloud — visibility reduced','Sislenecek rakibe dokun / tıkla':'Tap / click the rival to fog','Bir rakip karaktere dokun':'Tap a rival character',
'Sislenecek rakip yok (az önce sislenen bir tur korunur)':'No rival to fog (a team that was just fogged is protected for a round)','Pus Bulutu: sislenecek rakibe dokun / tıkla':'Fog Cloud: tap / click the rival to fog','Esc iptal':'Esc to cancel',
// nişan / atış ipuçları
'Sol tuşa bas, geriye çek, bırak':'Press the left button, pull back, release','Karakterinden geriye çek, bırak':'Pull back from your character, release','karakterinden geriye çek, bırak':'pull back from your character, release',
'Güç %#':'Power #%','bırak → ATEŞ':'release → FIRE','geri getir → iptal':'bring back → cancel','BIRAK → ATEŞ':'RELEASE → FIRE','hız #':'speed #','biraz daha geri çek':'pull back a bit more','geri çek →':'pull back →','ATEŞ!':'FIRE!',
'ATIŞ KOMPASI':'SHOT COMPASS','RÜZGÂR':'WIND','RÜZGÂR #':'WIND #','RÜZGÂR YOK':'NO WIND','RÜZGÂR ETKİLEMEZ':'NO WIND EFFECT','KARŞIDAN':'HEADWIND','ARKADAN':'TAILWIND','→ # ARKADAN':'→ # TAILWIND','← # ARKADAN':'← # TAILWIND','→ # KARŞIDAN':'→ # HEADWIND','← # KARŞIDAN':'← # HEADWIND','# ARKADAN':'# TAILWIND','# KARŞIDAN':'# HEADWIND','RÜZGÂR → # ARKADAN':'WIND → # TAILWIND','RÜZGÂR → # KARŞIDAN':'WIND → # HEADWIND','RÜZGÂR ← # ARKADAN':'WIND ← # TAILWIND','RÜZGÂR ← # KARŞIDAN':'WIND ← # HEADWIND',
'rüzgâr →':'wind →','← rüzgâr':'← wind','rüzgâr → #':'wind → #','← rüzgâr #':'← wind #','Rüzgâr':'Wind','Rüzgâr #':'Wind #',
'Atış iptal — biraz daha geriye çek':'Shot cancelled — pull back a bit more','Bombaların düşeceği yere dokun / tıkla':'Tap / click where the bombs should fall','Hedef bölgeye dokun / tıkla':'Tap / click the target area','rüzgâr bombaları kaydırır':'wind drifts the bombs',
'Işınlanacağın yere dokun / tıkla':'Tap / click where to teleport','Meteorların düşeceği yere dokun / tıkla':'Tap / click where the meteors should fall','Oraya ışınlanamazsın — boş bir nokta seç':'You can’t teleport there — pick an empty spot',
'Şimşeğin düşeceği yere dokun / tıkla':'Tap / click where the lightning should strike','Şimşek: hedefe dokun / tıkla':'Lightning: tap / click a target','en üstteki ilk engele düşer':'strikes the first thing below',
'Donmuşsun! Bu tur yürüyemez/zıplayamazsın, ama ateş edebilirsin':'You’re frozen! You can’t walk or jump this turn, but you can shoot','DONMUŞ — bu tur yürüyemez/zıplayamaz':'FROZEN — can’t walk or jump this turn','DONDU!':'FROZEN!',
// tur / maç olayları
'Sıra sende!':'Your turn!','Bilgisayarın sırası':'Computer’s turn','Süre doldu!':'Time’s up!','SÜRE DOLDU!':'TIME’S UP!','Süre doldu':'Time’s up','Son atış sayılıyor…':'Counting the last shot…',
'KONUMUNU SEÇ!':'PICK YOUR SPOT!','KONUMUNU SEÇ':'PICK YOUR SPOT','Karakterini sürükle, uygun yere bırak':'Drag your character and drop it on a good spot','Savaşçılar yerleşiyor…':'Fighters are taking positions…','Bilgisayarlar konum seçiyor…':'Computers are picking spots…',
'Karakterini sürükleyip yeşil bölgeye bırak':'Drag your character to a green area','Burası uygun — bırak!':'This spot works — drop it!','Buraya yerleşemezsin:':'You can’t stand here:','Uygun değil:':'Not allowed:','SÜRÜKLE':'DRAG',
'Harita dışı':'Outside the map','Arazinin içi':'Inside the terrain','Su / boşluk':'Water / gap','Portalın önü':'In front of a portal','Zemin dar':'Ground too narrow','Zayıf ahşap zemin':'Weak wooden floor','Çok dar':'Too tight','Başka savaşçıya çok yakın':'Too close to another fighter','geçersiz':'invalid',
'SAVAŞ BAŞLIYOR!':'BATTLE BEGINS!','ANİ ÖLÜM!':'SUDDEN DEATH!','Lav her tur yükseliyor':'Lava rises every turn','Sıvı her tur yükseliyor':'The water rises every turn','ANİ ÖLÜM':'SUDDEN DEATH',
'VOLKAN UYANIYOR!':'THE VOLCANO AWAKENS!','Yer sarsılıyor…':'The ground is shaking…','VOLKAN PATLIYOR!':'THE VOLCANO ERUPTS!','Sıcak kayalara dikkat':'Watch out for hot rocks','KUM FIRTINASI!':'SANDSTORM!','Yoğun sis!':'Thick fog!',
'MAYIN KURULDU':'MINE SET','BİP!':'BEEP!','YAPIŞTI!':'STUCK!','KURTARILDI!':'RESCUED!','ÇAT!':'CRACK!','GÜM!':'BOOM!','3x KÜRESİ!':'3x ORB!','HAZİNE SANDIĞI!':'TREASURE CHEST!','+1 ULTİ':'+1 ULTI','+# altın':'+# gold',
'elendi!':'is out!','düştü!':'went down!',
'Bağlantı yok — tur geçiliyor':'No connection — turn skipped','Oyuncular bekleniyor…':'Waiting for players…','Herkes yüklenince konumlandırma başlar':'Placement starts once everyone has loaded',
'YENİDEN DOĞ!':'RESPAWN!','YENİDEN DOĞDU!':'RESPAWNED!','RAKİP YENİDEN DOĞUYOR':'RIVAL IS RESPAWNING','Konumunu seçiyor…':'Picking a spot…','konumunu sürükle':'drag your spot',
'1v1 Ölüm Maçı':'1v1 Deathmatch','en çok öldüren kazanır':'most kills wins','KALAN SÜRE':'TIME LEFT','öldürme':'kills','# öldürme':'# kills',
'SON VURUŞ':'FINAL HIT','ağır çekim tekrar':'slow-motion replay','TEKRAR':'REPLAY','Atla ›':'Skip ›',
// HUD
'Misafir':'Guest','# hasar':'# dmg','# eleme':'# KOs','# hasar · # eleme':'# dmg · # KOs','hasar':'damage','eleme':'KOs','Tur #':'Turn #','# atış':'# shots','atış':'shots',
'◂ YÜRÜ ▸':'◂ WALK ▸','yürü':'walk','JUMP':'JUMP','Hareket joystick\'i ve zıplama':'Movement joystick and jump','Ana menü':'Main menu','Yardım':'Help','Müzik (N)':'Music (N)','Ses (M)':'Sound (M)','Tam ekran':'Fullscreen','Uzaklaş (PageDown)':'Zoom out (PageDown)','Yakınlaş (PageUp)':'Zoom in (PageUp)',
'Sinematiği atla (Esc / Boşluk)':'Skip the intro (Esc / Space)','ATLA':'SKIP','Ana menüye dön?':'Back to the main menu?','Oyundan çık?':'Quit the game?','Onaylamak için geri tuşuna tekrar bas':'Press back again to confirm','Maç devam ediyor':'The match is still on',
// sonuç ekranı
'ZAFER':'VICTORY','MAĞLUBİYET':'DEFEAT','BERABERE':'DRAW','Zafer!':'Victory!','Yenildin!':'You lost!','Berabere!':'Draw!','DALGA TAMAM':'WAVE CLEARED','OYUN BİTTİ':'GAME OVER','Hayatta Kalma bitti':'Survival is over','Mağlubiyet':'Defeat',
'TEKRAR OYNA':'PLAY AGAIN','TEKRAR OYNA · LOBİ':'PLAY AGAIN · LOBBY','🗺️ HARİTAYI DEĞİŞTİR':'🗺️ CHANGE MAP','🗺️ Haritayı oda sahibi seçer':'🗺️ The host picks the map','ODADAN AYRIL':'LEAVE ROOM','ANA MENÜ':'MAIN MENU','MENÜYE DÖN':'BACK TO MENU','SONRAKİ DALGA ▶':'NEXT WAVE ▶','YENİDEN BAŞLA':'RESTART',
'Harita seç':'Pick a map','Seçim tüm oyunculara oda üzerinden gider':'Your pick is sent to every player in the room','En iyi atış:':'Best shot:','— tek turda # hasar':'— # damage in one turn','# eleme':'# KOs',
'SEVİYE ATLADIN!':'LEVEL UP!','ÖN İZLEME':'PREVIEW','Önceki seviye #':'Previous level #','Yeni toplam: # / # XP':'New total: # / # XP','Görev tamamlandı:':'Mission complete:','Başarım:':'Achievement:','sn':'s','Kapasite:':'Capacity:','süresi':'length','sıra sende!':'your turn!','tek turda # hasar':'# damage in one turn','SEVİYE':'LEVEL','Önceki seviye':'Previous level','Açar:':'Unlocks:','Açılan kostüm':'Unlocked outfit','✅ Görev tamamlandı:':'✅ Mission complete:','🏆 Başarım:':'🏆 Achievement:','Açıldı:':'Unlocked:',
'Kırmızı Takım':'Red Team','Mavi Takım':'Blue Team','Kırmızı':'Red','Mavi':'Blue','Yeşil':'Green','Sarı':'Yellow','Mor':'Purple','Turuncu':'Orange','Pembe':'Pink','Turkuaz':'Teal',
'Bilgisayar':'Computer','Bilgisayar #':'Computer #','Düşman #':'Enemy #','Hedef':'Target','Kukla':'Dummy','Dalga # temizlendi!':'Wave # cleared!','Hayatta Kalma · Dalga #':'Survival · Wave #',
// online
'Oyuncu adın':'Your player name','➕ Oda oluştur':'➕ Create room','🚪 Odaya katıl':'🚪 Join a room','DAVET KODU':'INVITE CODE','Kodla katıl':'Join with code','Sunucu':'Server','bağlı değil':'not connected','bağlı':'connected','bağlanıyor…':'connecting…','sunucu adresi yok':'no server address','bağlantı yok':'no connection',
'Varsayılan sunucu otomatik kullanılır; yalnızca farklı bir sunucu için değiştirin. Boş bırakırsanız varsayılana döner.':'The default server is used automatically; only change this for a different server. Leave it empty to go back to the default.',
'Online maçta oda sahibinin cihazı oyunu yönetir; herkesin internet bağlantısı gerekir. Yerel çok oyunculu mod ayrı ve çevrimdışı çalışmaya devam eder.':'In online matches the host’s device runs the game; everyone needs an internet connection. Local multiplayer is separate and still works offline.',
'Kapasite':'Capacity','Oyun türü':'Game type','Klasik':'Classic','👥 Takım Savaşı':'👥 Team Battle','Takım Savaşı':'Team Battle','⚔️ 1v1 Ölüm Maçı ·':'⚔️ 1v1 Deathmatch ·','Takımlar':'Teams','Takımlar:':'Teams:','Tur süresi':'Turn time',
'Odayı herkese açık listede göster':'Show the room in the public list','Geri':'Back','ODAYI OLUŞTUR':'CREATE ROOM','Yenile':'Refresh','Harita':'Map','Harita ·':'Map ·','oda sahibi seçer':'host picks',
'Arkadaş davet et':'Invite a friend','Davet Et':'Invite','Kodu kopyala':'Copy code','Davet kodunu kopyala':'Copy invite code','Kopyalandı!':'Copied!','📋 Kopyalandı':'📋 Copied','Kod seçildi':'Code selected','basılı tutup "Kopyala"yı seçin':'press and hold, then choose "Copy"',
'Davet metni panoya kopyalandı:':'Invite text copied:','Ayrıl':'Leave','HAZIRIM':'I’M READY','HAZIR DEĞİLİM':'NOT READY','OYUNU BAŞLAT':'START GAME','👑 Oda sahibi':'👑 Host','✔ Hazır':'✔ Ready','Bekliyor':'Waiting','Oda dolu':'Room is full','# boş yer':'# open slots','arkadaşlarına kodu gönder':'send your friends the code',
'Tür:':'Type:','Süre:':'Length:','Tur:':'Turn:','Tur: # sn':'Turn: # s','Kapasite: #/#':'Capacity: #/#','Herkese açık':'Public','Özel oda':'Private room','lobide':'in lobby','maçta':'in match','Katıl':'Join','Dolu':'Full','Başladı':'Started',
'Şu an herkese açık oda yok. Bir oda oluştur ya da davet kodu gir.':'There are no public rooms right now. Create one or enter an invite code.','Davet kodu':'Invite code','6 karakterli kodu gir':'Enter the 6-character code',
'Takım Savaşı 4 (2v2) ya da 6 (3v3) oyuncuyla başlar':'Team Battle starts with 4 (2v2) or 6 (3v3) players','takımlar katılma sırasına göre':'teams follow join order',
'📡 Bağlantı hatası':'📡 Connection error','📡 Online maç bitti':'📡 Online match ended','📴 Bağlantı koptu':'📴 Disconnected','🔌 Bağlandı':'🔌 Connected','Oda sahibi geri döndü':'The host is back','Oda sahibi geri dönmedi; oda kapandı.':'The host didn’t come back; the room was closed.',
'Oda sahibi odadan ayrıldı.':'The host left the room.','Oda sahibinin bağlantısı koptu — 45 sn bekleniyor…':'The host disconnected — waiting 45 s…','Bağlantı koptu — yeniden bağlanılıyor…':'Disconnected — reconnecting…','Bağlantı kurulamadı; maçtan çıkıldı.':'Couldn’t reconnect; you left the match.',
'Sunucu bağlantısı kurulamadı.':'Couldn’t connect to the server.','Sunucuya ulaşılamadı (zaman aşımı).':'Couldn’t reach the server (timeout).','Geçersiz sunucu adresi.':'Invalid server address.','Sunucu adresi tanımlı değil. "Sunucu" alanına wss:// adresini yazın.':'No server address set. Enter a wss:// address in the "Server" field.',
'Bu kodla bir oda bulunamadı.':'No room found with this code.','Bu odada maç başladı; şu an katılamazsın.':'This room’s match has started; you can’t join right now.','Oda dolu (#/#).':'Room is full (#/#).','En az 2 oyuncu gerekli.':'At least 2 players are needed.','Herkes hazır değil.':'Not everyone is ready.',
'1v1 Ölüm Maçı için odada en fazla 2 oyuncu olmalı.':'A 1v1 Deathmatch room can have at most 2 players.','1v1 Ölüm Maçı tam 2 oyuncuyla oynanır.':'1v1 Deathmatch needs exactly 2 players.','Takım Savaşı en fazla 6 oyuncuyla (3v3) oynanır.':'Team Battle allows at most 6 players (3v3).','Takım Savaşı 4 (2v2) ya da 6 (3v3) oyuncuyla başlar.':'Team Battle starts with 4 (2v2) or 6 (3v3) players.','Geçersiz sonuç':'Invalid result',
'Online':'Online','# oyuncu':'# players','Bir hata oluştu:':'Something went wrong:',
// gardırop / ilerleme
'Şapka':'Hat','Kask':'Helmet','Gözlük':'Glasses','Boyun':'Neck','Kostüm':'Outfit','Renk & Desen':'Colour & Pattern','Zafer Efekti':'Victory Effect','Yok':'None',
'Parti Şapkası':'Party Hat','Bere':'Beanie','Kovboy':'Cowboy','Korsan':'Pirate','Taç':'Crown','Çivili':'Spiked','Viking':'Viking','Astronot':'Astronaut','Şövalye':'Knight','Güneş Gözlüğü':'Sunglasses','Pilot Gözlüğü':'Pilot Goggles','Kalp Gözlük':'Heart Glasses','Monokl':'Monocle',
'Papyon':'Bow Tie','Atkı':'Scarf','Bandana':'Bandana','Madalya':'Medal','Ninja Kuşağı':'Ninja Belt','Pelerin':'Cape','Süper Kahraman':'Superhero','Zırh':'Armor','Düz':'Plain','Çizgili':'Striped','Benekli':'Spotted','Yıldızlı':'Starry','Altın Kürk':'Golden Fur','Konfeti':'Confetti','Kalpler':'Hearts','Havai Fişek':'Fireworks','Şimşek efekti':'Lightning effect','Şövalye Kaskı':'Knight Helmet',
'SATIN AL':'BUY','VAZGEÇ':'CANCEL','KUŞAN':'EQUIP','KUŞANILDI':'EQUIPPED','TAKILI':'ON','Sahip':'Owned','Kuşanılı':'Equipped','🔒 Kilitli':'🔒 Locked','🔒 Başarım':'🔒 Achievement','Başarımla açılır:':'Unlocked by achievement:','Yetersiz altın':'Not enough gold','🛍️ Satın alındı':'🛍️ Purchased',
'Bir ürüne dokun':'Tap an item','Karakterin üzerinde ön izlenir — satın alınmaz.':'Previewed on your character — not bought.','Sahipsin — ücretsiz kuşanabilirsin':'You own it — equip it for free','ÖN İZLEME ·':'PREVIEW ·','Kalan bakiye: 🪙':'Balance left: 🪙','# altın gerekli (sende #)':'# gold needed (you have #)',
'Ürüne dokunmak yalnızca ön izler; altın yalnızca SATIN AL onayıyla harcanır. Kostümler kozmetiktir.':'Tapping an item only previews it; gold is spent only when you confirm BUY. Outfits are cosmetic.',
'Maçlardan XP ve altın kazan; Gardıroptan kozmetik al, Görevler ve Başarımları tamamla.':'Earn XP and gold from matches; buy cosmetics in the Wardrobe and complete Missions and Achievements.',
'💾 Kayıt kurtarıldı':'💾 Save recovered','Ana kayıt okunamadı; son geçerli yedekten yüklendi.':'The main save couldn’t be read; loaded the last good backup.','altın':'gold','Maç':'Match','Oynanan maç':'Matches played','Oynanan harita':'Maps played','Toplam kazanılan altın':'Total gold earned','İsabetli tur':'Turns with a hit','Kurtarılma':'Rescues',
// başarımlar & görevler
'İlk Zafer':'First Victory','Bir maç kazan':'Win a match','Seri Galip':'Winning Streak','# maç kazan':'Win # matches','Arenanın Kralı':'King of the Arena','Efsane':'Legend','İlk Kan':'First Blood','Bir rakip ele':'Knock out a rival','Avcı':'Hunter','# rakip ele':'Knock out # rivals',
'Müdavim':'Regular','# maç oyna':'Play # matches','Gazi':'Veteran','Keskin Nişancı':'Sharpshooter','# isabetli tur':'# turns with a hit','Uzak Menzil':'Long Range','#px\'ten uzağa isabet ettir':'Hit from more than #px away','# px\'ten uzağa isabet ettir':'Hit from more than # px away','İkili Darbe':'Double Strike','Tek turda # rakip ele':'Knock out # rivals in one turn',
'Kusursuz':'Flawless','Hiç hasar almadan kazan':'Win without taking damage','Buz Devri':'Ice Age','# rakibi dondur':'Freeze # rivals','Mayın Ustası':'Mine Master','Mayınla # rakip vur':'Hit # rivals with mines','Çelik Duvar':'Steel Wall','Kalkanla toplam # hasar em':'Absorb # damage in total with the shield',
'Kıl Payı':'Close Call','# kez kurtarıl':'Get rescued # times','Dünya Turu':'World Tour','# haritanın hepsinde oyna':'Play on all # maps','Hayatta Kalan':'Survivor','Hayatta Kalma\'da # dalga temizle':'Clear # waves in Survival','Ölümsüz':'Immortal','Yükselen Yıldız':'Rising Star','#. seviyeye ulaş':'Reach level #',
'Usta Savaşçı':'Master Fighter','Hazine Avcısı':'Treasure Hunter','Toplam # altın kazan':'Earn # gold in total','Koleksiyoncu':'Collector','# kozmetik eşya satın al':'Buy # cosmetic items','Büyük Savaş':'Big Battle','# oyunculu maç kazan':'Win a #-player match',
'İlk galibiyet':'First win','Herhangi bir modda maç kazan':'Win a match in any mode','Üç rakip ele':'Three knockouts','Toplam # rakibi oyundan çıkar':'Knock out # rivals in total','Buz bombası kullan':'Use an ice bomb','Bir maçta Buz Bombası at':'Throw an Ice Bomb in a match','Bütün haritalarda oyna':'Play every map',
'# haritanın her birinde en az bir maç':'At least one match on each of the # maps','Kalkanla korun':'Shield up','Kalkan açıkken bir saldırının hasarını em':'Absorb an attack’s damage with your shield up','# isabetli atış':'# hits','Rakibe isabet ettirdiğin # tur':'# turns where you hit a rival','Toplam # galibiyet':'# wins in total',
'Eğitimi tamamla':'Finish training','Eğitim modunu bitir':'Complete the training mode','Dalga #':'Wave #','Mayın tuzağı':'Mine trap','Kara Mayını ile bir rakibi vur':'Hit a rival with a Land Mine','Yapıştır!':'Stick it!','Yapışkan Bombayı bir rakibe yapıştır':'Stick a Sticky Bomb on a rival','Kalabalık arena':'Crowded arena','# oyunculu bir maç oyna':'Play a #-player match',
'Toparlan':'Patch up','+50 HP gücünü kullan':'Use the +50 HP power','Isınma turu':'Warm-up',
// ipuçları (yükleme ekranı)
'Rüzgâr roketleri savurur; el bombası rüzgârdan etkilenmez.':'Wind pushes rockets around; grenades ignore the wind.','Enerji Kalkanı, bir sonraki turuna kadar gelen patlama hasarını yarıya indirir.':'The Energy Shield halves blast damage until your next turn.',
'+50 HP her maçta yalnızca bir kez kullanılabilir — zamanlamayı iyi seç!':'+50 HP can be used only once per match — time it well!','Buzul Adası\'nda donmuş göllerin üstü kaygandır: yürürken kayarsın.':'Frozen lakes on Glacier Island are slippery: you slide as you walk.',
'Kayıp Çöl\'de kum fırtınası rüzgârı güçlendirir ve görüşü azaltır.':'In the Lost Desert, sandstorms boost the wind and reduce visibility.','Lanetli Liman\'da ahşap iskeleler kırılabilir — altında deniz var!':'The wooden piers of Cursed Harbor can break — the sea is below!',
'Volkanın krateri parlamaya başladıysa uzaklaşmanın vakti gelmiştir.':'If the volcano’s crater starts glowing, it’s time to move away.','Rakibe isabet ettirdiğin her tur ULTİ barını bir kademe doldurur.':'Every turn you hit a rival fills the ULTI bar by one step.',
'Havadayken tekrar zıplarsan çift zıplama yaparsın.':'Jump again in mid-air for a double jump.','Ağır Füze ateşlerken geri teper — uçurum kenarında dikkat!':'The Heavy Missile kicks back when fired — careful near cliffs!','Hava Saldırısı açıkta duran rakiplere karşı çok etkilidir.':'Air Strike is very effective against rivals out in the open.',
'Antik sütunlar ve tahta yapılar siper olur ama patlamayla yıkılır.':'Ancient columns and wooden structures give cover but break in explosions.','Binaların katları siper olur; köprü yıkılmaz.':'Building floors give cover; the bridge can’t be destroyed.','Kemer tünelin altı iyi bir siperdir — ama üstü yıkılabilir!':'Under the arch tunnel is good cover — but the top can break!','İpucu:':'Tip:',
// eğitim
'Eğitim · hareket, nişan, rüzgâr, silahlar ve savunma':'Training · movement, aiming, wind, weapons and defense','Yürü:':'Walk:','Zıpla:':'Jump:','Nişan al ve ateş et:':'Aim and fire:','Hedefi vur:':'Hit the target:','Rüzgâr:':'Wind:','Silah değiştir:':'Switch weapons:','Savunma — +50 HP:':'Defense — +50 HP:','Savunma — Enerji Kalkanı:':'Defense — Energy Shield:','ULTİ:':'ULTI:','Tebrikler!':'Well done!',
'Joystick\'i sağa/sola sürükle (ya da A / D tuşları) ve biraz yürü. Az sürüklersen yavaş, çok sürüklersen hızlı yürürsün.':'Drag the joystick right or left (or use A / D) and walk a little. Drag a little to walk slowly, a lot to walk fast.',
'Joystick\'in ortasındaki':'Use the','(ya da Boşluk) ile zıpla. Havadayken tekrar basarsan çift zıplama!':'button in the middle of the joystick (or Space) to jump. Press again in mid-air for a double jump!',
'Karakterinden geriye çek, güç topla, bırak. Beyaz noktalar atış yönünü gösterir.':'Pull back from your character, build up power, release. The white dots show the shot direction.','Kuklaya bir isabet kaydet. Patlama yarıçapı içinde kalması yeterli.':'Land a hit on the dummy. Catching it inside the blast radius is enough.',
'Kırmızı kesikli çizgi rüzgârın mermiyi nereye savuracağını gösterir. Rüzgârda bir':'The red dashed line shows where the wind will carry your shot. Fire a','at.':'into the wind.','Alttaki panelden':'From the bottom panel pick the','nı (2) seç ve at. Rüzgârdan etkilenmez, 3 sn sonra patlar.':'(2) and throw it. It ignores wind and explodes after 3 s.',
'Canın azaldı! Yeşil kalp butonuna (H) bas.':'Your health is low! Press the green heart button (H).','Mavi kalkan butonuna (J) bas. Bir sonraki turuna kadar hasarın yarısını emer.':'Press the blue shield button (J). It absorbs half the damage until your next turn.',
'Barın doldu! Sağ alttaki ULTİ butonuna bas ve bir süper güç seç.':'Your bar is full! Press the ULTI button at the bottom right and pick a super power.','Eğitimi tamamladın: +100 XP, +50 altın. Artık arenaya hazırsın!':'You finished training: +100 XP, +50 gold. You’re ready for the arena!',
'ULTİ için 3 isabetli tur gerekli (':'ULTI needs 3 turns with a hit (','EĞİTİMİ BİTİR':'FINISH TRAINING',
// yardım paneli başlıkları (gövde metni bloklar halinde aşağıda)
'OYUN YARDIMI':'GAME HELP','Nasıl ateş edilir?':'How do I shoot?','Hareket ve kamera':'Movement and camera','Savunma güçleri (maç başına 1\'er kez)':'Defense powers (once each per match)','Haritalar':'Maps','v8 — Yeni silahlar (':'New weapons (','v8 — Konum, kurtarma, ilerleme':'Placement, rescue, progress','ANLADIM':'GOT IT',
// v11: yeni ana menü, karakterler, mağaza, ayarlar, sohbet, skorbord
'OYUNA KATIL':'PLAY','MAĞAZA':'SHOP','PROFİL':'PROFILE','GÖREVLER':'MISSIONS','✨ ÖZELLEŞTİR':'✨ CUSTOMIZE','AYARLAR':'SETTINGS','Ayarlar':'Settings','Bağlantı durumu':'Connection status',
'Altın satın al':'Buy gold','Elmas satın al':'Buy gems','Karakter Sv #':'Character Lv #','Karakter Sv # · Aktif':'Character Lv # · Active','🔒 Sv #\'de açılır':'🔒 Unlocks at Lv #','Seviye #\'de açılır':'Unlocks at level #',
'Baykuş':'Owl','Yılan':'Snake','Boğa':'Bull','Ejderha':'Dragon','Rüzgâra dirençli':'Wind resistant','Zehirli':'Venomous','Güçlü itme':'Strong push','+%15 patlama alanı':'+15% blast radius','+40 can':'+40 HP','+40 can (240)':'+40 HP (240)',
'Atışları rüzgârdan %50 az etkilenir · 190 can':'Shots are 50% less affected by wind · 190 HP','Vurduğu rakip 2 tur 6\'şar zehir hasarı alır · zıplama zayıf':'Enemies it hits take 6 poison damage for 2 turns · weak jump',
'Patlama itmesi +%35, kendisi %40 az savrulur · 220 can · yavaş':'Blasts push 35% harder, gets knocked back 40% less · 220 HP · slow','Patlama alanı +%15 · 185 can':'Blast radius +15% · 185 HP',
'ZEHİRLENDİ!':'POISONED!','☠ ZEHİR':'☠ POISON','İLK KARAKTERİNİ SEÇ':'CHOOSE YOUR FIRST CHARACTER','Diğer karakterler seviye atladıkça sırayla açılır. Seçmediğin karakter 2. seviyede açılır.':'Other characters unlock as you level up. The one you don’t pick unlocks at level 2.',
'Diğer karakterler seviye atladıkça açılır':'Other characters unlock as you level up','Joystick konumu':'Joystick side','Sağ':'Right','Sol':'Left','(varsayılan)':'(default)','(solak)':'(left-handed)','Müzik':'Music','Ses efektleri':'Sound effects','Sohbet':'Chat','Açık':'On','Kapalı':'Off',
'Joystick konumu yalnızca hareket joystick\'ini taşır; saldırı ve güç butonları yerinde kalır. Tercihler bu cihazda saklanır.':'Joystick side only moves the movement joystick; attack and power buttons stay put. Preferences are saved on this device.',
'⭐ Günün Fırsatları':'⭐ Daily Deals','🎯 Avantaj':'🎯 Boosts','👑 Kostüm & Efekt':'👑 Outfits & FX','🖼️ Profil':'🖼️ Profile','💎 Elmas':'💎 Gems','🪙 Altın':'🪙 Gold','%30 İNDİRİM':'30% OFF','%20 İNDİRİM':'20% OFF','SEZON':'SEASON','Sahipsin':'Owned','Kullan':'Use','Kullanılıyor':'In use','AÇ':'OPEN','Alındı':'Purchased',
'Cephane Paketi':'Ammo Pack','Cephane Paketi ×#':'Ammo Pack ×#','XP Desteği':'XP Boost','Altın Takası':'Gold Exchange','Gardırop':'Wardrobe','Gölge Kürk':'Shadow Fur','Gökkuşağı Kürk':'Rainbow Fur','Efsanevi görünüm':'Legendary look','Nadir görünüm':'Rare look',
'Bir maçta +1 Ağır Füze (maç başına en fazla 1)':'+1 Heavy Missile in one match (max 1 per match)','# maç için +1 Ağır Füze':'+1 Heavy Missile for # matches','Sonraki # maçta XP ×#':'XP ×# in your next # matches','Sonraki 3 maçta XP ×2 (seviye/görev destek)':'XP ×2 in your next 3 matches (level boost)',
'Altın ve elmasla yapılan alışverişler bu cihazdaki profile kaydedilir.':'Gold and gem purchases are saved to the profile on this device.','Günün fırsatları her gün yenilenir.':'Daily deals refresh every day.',
'Gerçek para ile satın alma henüz etkin değil: Google Play Billing yapılandırması bekleniyor.':'Real-money purchases are not active yet: Google Play Billing setup is pending.','Ödeme Google Play üzerinden alınır ve sunucuda doğrulanır; içerik ancak doğrulamadan sonra eklenir.':'Payment is taken via Google Play and verified on the server; content is added only after verification.',
'Ödeme henüz açık değil':'Payments are not open yet','Google Play ödemeleri yapılandırıldığında etkinleşecek':'Will be enabled once Google Play payments are configured','Satın alma tamamlandı':'Purchase complete','🛍️ Satın alındı':'🛍️ Purchased','Yetersiz elmas':'Not enough gems',
'Mağaza sunucusuna ulaşılamadı':'Could not reach the shop server','İnternet bağlantını kontrol et.':'Check your internet connection.','Yükleniyor…':'Loading…',
'Altın Çerçeve':'Gold Frame','Tropik Çerçeve':'Tropical Frame','Alev Çerçeve':'Flame Frame','Kış Sezonu Çerçevesi':'Winter Season Frame','Kraliyet Çerçevesi':'Royal Frame','Çerçevesiz':'No frame',
'🎯 Cephane Paketi kullan (+1 Ağır Füze) ·':'🎯 Use Ammo Pack (+1 Heavy Missile) ·','adet':'left','Mesaj yaz…':'Type a message…','Gönder':'Send','Odadakilerle sohbet et 👋':'Chat with the room 👋','Sohbet kapalı':'Chat is off','Çok hızlı yazıyorsun; biraz bekle.':'You’re typing too fast; wait a bit.',
'Selam! 👋':'Hi! 👋','İyi oyundu!':'Good game!','Güzel atış!':'Nice shot!','Hay aksi!':'Oops!','Bir saniye…':'One sec…','Hadi başlayalım!':'Let’s go!','Teşekkürler!':'Thanks!','Pardon!':'Sorry!','Maç sohbeti':'Match chat',
'öldürme':'kills','hasar':'damage','Verilen hasar':'Damage dealt','Alınan hasar':'Damage taken','Öldürme':'Kills','Kaybedilen can':'HP lost','Performans puanı':'Performance score','En çok kullanılan:':'Most used:','Saldırı yapılmadı':'No attacks',
'Ayrıntılar için oyuncuya dokun':'Tap a player for details','KAZANDI':'WON','KAYBETTİ':'LOST','BERABERE':'DRAW','Kırmızı Takım':'Red Team','Mavi Takım':'Blue Team','elendi':'out','Meteor Yağmuru ×#':'Meteor Shower ×#',
'İnternet bağlantısı yok':'No internet connection','Sunucuya bağlı':'Connected to server','İnternet var · sunucuya bağlı değil':'Online · not connected to the server',
// v11.1
'OYNA!':'PLAY!','FIRSATLAR':'DEALS','ARKADAŞLAR':'FRIENDS','MODLAR':'MODES','SOHBET':'CHAT','💬 SOHBET':'💬 CHAT','💬 ODA SOHBETİ':'💬 ROOM CHAT','Sohbeti kapat':'Close chat','Silah seç':'Choose weapon',
'Bir silah seç · klavyede 1–0':'Pick a weapon · keys 1–0','∞ sınırsız':'∞ unlimited','×# cephane':'×# ammo','SİLAHLAR ▴':'WEAPONS ▴','#s #dk':'#h #m','Sol menü':'Left menu','Sağ menü':'Right menu',
'🤖 Bilgisayara karşı · # oyuncu · Kolay':'🤖 Vs computer · # players · Easy','🤖 Bilgisayara karşı · # oyuncu · Normal':'🤖 Vs computer · # players · Normal','🤖 Bilgisayara karşı · # oyuncu · Zor':'🤖 Vs computer · # players · Hard',
'👥 Yerel çok oyunculu · # oyuncu':'👥 Local multiplayer · # players','⚔️ 1v1 Ölüm Maçı · # sn · Kolay':'⚔️ 1v1 Deathmatch · # s · Easy','⚔️ 1v1 Ölüm Maçı · # sn · Normal':'⚔️ 1v1 Deathmatch · # s · Normal','⚔️ 1v1 Ölüm Maçı · # sn · Zor':'⚔️ 1v1 Deathmatch · # s · Hard',
'Sunucu (gelişmiş) · otomatik — arkadaşlarına adres göndermen gerekmez':'Server (advanced) · automatic — no need to send friends an address','Sunucu (gelişmiş) · özel adres':'Server (advanced) · custom address',
// v11.5
'KAÇ!':'RUN!','ÖZELLEŞTİR':'CUSTOMIZE',
// v11.4: resimli ana menü
'BAŞARILAR':'ACHIEVEMENTS','👕 ÖZELLEŞTİR':'👕 CUSTOMIZE',
// v11.3: görevler & başarımlar + profil yeniden tasarımı
'ÖDÜLÜ AL':'CLAIM','✔ ALINDI':'✔ CLAIMED','TÜMÜNÜ AL':'CLAIM ALL','GÖREV':'MISSIONS','BAŞARIM':'ACHIEV.','Görev ilerlemen':'Mission progress','Başarım ilerlemen':'Achievement progress','Hepsi tamamlandı! 🎉':'All complete! 🎉',
'# ödül seni bekliyor!':'# rewards waiting!','Tüm ödüller alındı':'All rewards claimed','Kalan ödüller: 🪙 #':'Remaining rewards: 🪙 #','Kalan ödüller: 🪙 # · # XP':'Remaining rewards: 🪙 # · # XP',
'Tümü':'All','Devam ediyor':'In progress','Tamamlandı':'Completed','Kilitli':'Locked','Bu filtrede gösterilecek bir şey yok.':'Nothing to show for this filter.','🎁 Açar: #':'🎁 Unlocks: #',
'🎁 Ödül alındı':'🎁 Reward claimed','🎁 # ödül alındı':'🎁 # rewards claimed','+# altın · +# XP':'+# gold · +# XP',
'SEVİYE':'LEVEL','# / # XP · sonraki seviyeye # XP':'# / # XP · # XP to next level','PROFİLİ DÜZENLE':'EDIT PROFILE','İSTATİSTİKLER':'STATS','KOLEKSİYON':'COLLECTION','ÖDÜLLERİM':'MY REWARDS',
'⚔️ Maç Performansı':'⚔️ Match Performance','🎯 Oyun Becerileri':'🎯 Skills','🎒 Koleksiyon ve İlerleme':'🎒 Collection & Progress','Oynanan maç':'Matches played','Galibiyet':'Wins','Mağlubiyet':'Losses','Eliminasyon':'Eliminations',
'İsabetli tur':'Hit turns','Hayatta kalma rekoru':'Survival record','#. dalga':'wave #','Kurtarılma':'Rescued','Oynanan harita':'Maps played','Açılan kostüm':'Costumes unlocked','Toplam kazanılan altın':'Total gold earned',
'🔥 EN ÇOK KULLANILAN SİLAHLAR':'🔥 MOST USED WEAPONS','# · # atış':'# · # shots','Farklı silahlar denedikçe liste dolacak.':'The list fills up as you try more weapons.','Henüz yeterli veri yok · birkaç atış yap, favori silahların burada görünsün.':'Not enough data yet · fire a few shots and your favourite weapons will show up here.',
'🐾 Karakterler · # / #':'🐾 Characters · # / #','SEÇİLİ':'SELECTED','Ustalık #':'Mastery #','🔒 Sv #':'🔒 Lv #','Açık bir karaktere dokun → aktif karakter olur. Kilitliler seviye atladıkça açılır.':'Tap an unlocked character to make it active. Locked ones unlock as you level up.',
'✨ GARDIROBU AÇ':'✨ OPEN WARDROBE','Varsayılan görünüm':'Default look','🧺 Kostüm koleksiyonu':'🧺 Costume collection','💠 Özel aksesuarlar ve çerçeveler':'💠 Special accessories & frames','Henüz yok · başarımlar ve elmas mağazası özel parçalar açar':'None yet · achievements and the gem shop unlock special items',
'✏️ Oyuncu adı':'✏️ Player name','KAYDET':'SAVE','En fazla 14 karakter · uygunsuz adlar online maçta değiştirilir':'Up to 14 characters · inappropriate names are replaced online','🙂 Avatar':'🙂 Avatar','Aktif karakter':'Active character','🖼️ Profil çerçevesi':'🖼️ Profile frame',
'Yeni çerçeveler Mağaza → Profil sekmesinden alınır.':'Get new frames in Shop → Profile.','✏️ Ad kaydedildi':'✏️ Name saved','Avatarı düzenle':'Edit avatar','Kapat':'Close',
// dil düğmesi
'Türkçe':'Türkçe','English':'English'
};
// Değişken içeren cümleler (ad, harita, sayı)
const VERB={'suya düştü':'fell in the water','denize düştü':'fell into the sea','lavlara düştü':'fell into the lava','buzlu suya düştü':'fell into the icy water','zehirli kanala düştü':'fell into the toxic canal','bataklık kuma gömüldü':'sank in the quicksand'};
const RULES=[
 [new RegExp('^(.+) ('+Object.keys(VERB).join('|')+')!$'),m=>m[1]+' '+VERB[m[2]]+'!'],
 [/^\+(\d+) (.+)$/,m=>'+'+m[1]+' '+T(m[2])],
 [/^(.+) kazandı!$/,m=>T(m[1])+' wins!'],
 [/^(.+) — sıra sende!$/,m=>T(m[1])+' — your turn!'],
 [/^RÜZGÂR (.+)$/,m=>'WIND '+T(m[1])],
 [/^— sıra sende!$/,()=>'— your turn!'],
 [/^(.+) oynuyor$/,m=>T(m[1])+' is playing'],
 [/^(.+) elendi!$/,m=>m[1]+' is out!'],
 [/^(.+) düştü!$/,m=>m[1]+' went down!'],
 [/^(.+) bir sonraki turunda sisin içinde$/,m=>T(m[1])+' is in the fog on their next turn'],
 [/^(.+) enerji kalkanı açtı$/,m=>m[1]+' raised an energy shield'],
 [/^(.+) \+50 HP kullandı$/,m=>m[1]+' used +50 HP'],
 [/^(.+) \(sen\)$/,m=>m[1]+' (you)'],
 [/^oda (\w+)$/,m=>'room '+m[1]],
 [/^Açar: (.+)$/,m=>'Unlocks: '+T(m[1])],
 [/^(🔒|✅|🏆|🛍️|🎁) (.+)$/,m=>m[1]+' '+T(m[2])],
 [/^\((.+)\)$/,m=>'('+T(m[1])+')'],
 [/^Sonraki maç: (.+)$/,m=>'Next match: '+T(m[1])],
 [/^Buraya yerleşemezsin: (.+)$/,m=>'You can’t stand here: '+T(m[1])],
 [/^Uygun değil: (.+)$/,m=>'Not allowed: '+T(m[1])],
 [/^(.+) Takım$/,m=>T(m[1])+' Team'],
 [/^(.+) bitti$/,m=>T(m[1])+' is used up'],
 [/^BOOMPUFF'ta odama katıl! Davet kodu: (.+)$/,m=>'Join my BOOMPUFF room! Invite code: '+m[1]],
 [/^(.+) altın gerekli \(sende (.+)\)$/,m=>m[1]+' gold needed (you have '+m[2]+')'],
 [/^(\d+)v(\d+)$/,m=>m[0]],
 [/^Online · Takım Savaşı (\d+)v(\d+)$/,m=>'Online · Team Battle '+m[1]+'v'+m[2]],
 [/^SEVİYE (\d+)!$/,m=>'LEVEL '+m[1]+'!'],
 [/^(.+) · konumunu sürükle$/,m=>m[1]+' · drag your spot'],
 [/^Zafer! (\d+) – (\d+)$/,m=>'Victory! '+m[1]+' – '+m[2]],
 [/^Berabere! (\d+) – (\d+)$/,m=>'Draw! '+m[1]+' – '+m[2]],
 [/^Yenildin! (\d+) – (\d+)$/,m=>'You lost! '+m[1]+' – '+m[2]],
 [/^(.+) kazandı! (\d+) – (\d+)$/,m=>T(m[1])+' wins! '+m[2]+' – '+m[3]],
 [/^Dalga (\d+) temizlendi!$/,m=>'Wave '+m[1]+' cleared!'],
];
// Yardım paneli gövdeleri (parçalı cümleler yerine bütün blok)
const BLOCKS={
 h1:'<h3>How do I shoot?</h3>1. Pick one of the <b>weapon slots</b> in the bottom panel (or <kbd>1</kbd>–<kbd>6</kbd>).<br>2. Press the left mouse button anywhere on the screen.<br>3. <b>Pull back</b>: the further you pull, the stronger the shot. The dotted line shows the path.<br>4. You can raise or lower the power as much as you like until time runs out.<br>5. <b>Release → fire!</b> If you are still pulling when time runs out, it fires automatically. Pull too little and the shot is cancelled. <kbd>Esc</kbd> cancels too.<br><i>Touch:</i> start with your finger near your own character and pull back.',
 h2:'<h3>Movement and camera</h3><kbd>A</kbd><kbd>D</kbd> or <kbd>←</kbd><kbd>→</kbd> walk<br><kbd>Space</kbd>, <kbd>W</kbd> or <kbd>↑</kbd> jump — press again in mid-air for a <b>double jump</b><br><kbd>1</kbd>…<kbd>6</kbd> weapon shortcuts · <kbd>U</kbd> ULTI<br><kbd>Shift</kbd> + move the mouse, or right-drag → pan the map<br><kbd>PageUp</kbd>/<kbd>PageDown</kbd> or wheel → zoom in/out<br><kbd>M</kbd> sound · <kbd>N</kbd> music<br><i>Touch:</i> drag the joystick right/left (a little = slow, a lot = fast), use <b>JUMP</b> in the middle to jump. You can walk and jump while aiming. Pan with one finger on empty space, zoom with two.',
 h3:'<h3>ULTI (super power)</h3>Every turn you hit a rival fills the bar by 1; it is full after <b>3 hits</b>. Options:<br><b>Meteor Shower</b> 8 meteors fall on the area you pick.<br><b>Heal</b> +50 HP (your turn goes on).<br><b>Teleport</b> go wherever you like (your turn goes on).<br><b>Mega Shot</b> this turn’s shot deals ×2.5 damage, ×1.5 crater.<br><b>Fog Cloud</b> your rival’s next turn is foggy for everyone.',
 h4:'<h3>Defense powers (once each per match)</h3><b style="color:#5dff8a">♥ +50 HP</b> (<kbd>H</kbd>) heals instantly, never above max; your turn goes on.<br><b style="color:#9be7ff">⛨ Energy Shield</b> (<kbd>J</kbd>) absorbs <b>50%</b> of blast damage until your next turn starts. It doesn’t use time, your shot or your turn.',
 h5:'<h3>Maps</h3><b>Jungle Island</b> · <b>Volcano</b> (erupts every few turns) · <b>Neon City</b> · <b>Glacier Island</b> (you slide on frozen lakes) · <b>Lost Desert</b> (sandstorms boost the wind, columns break) · <b>Cursed Harbor</b> (wooden piers break, the fog thickens).<br>Skip the intro at the start of a match with <kbd>Esc</kbd> / <kbd>Space</kbd> or SKIP.',
 h6:'<h3>More weapons (<kbd>7</kbd>–<kbd>0</kbd>)</h3><b>Sticky Bomb</b> sticks to ground or target and explodes after 1.6 s · <b>Ice Bomb</b> low damage, freezes whoever it hits (can’t walk/jump on their next turn) · <b>Land Mine</b> settles on the ground and explodes when a rival gets close · <b>Bouncy Bomb</b> bounces 3 times, then explodes · <b>Lightning</b> strikes the spot you pick from the sky.<br><b>Wind guide:</b> white dots show the shot direction, the <span style="color:#ff6b6b">red dashed line</span> shows the real drift with wind.',
 h7:'<h3>Placement, rescue, progress</h3>At the start of a match you have <b>10 s</b> to drag your character into place (green = OK, red = not allowed).<br>If the platform below breaks, your character heads to nearby ground; if they fall, a <b>rescue balloon</b> carries them to safety (−15 HP). Getting blasted off the map is still deadly!<br>Earn XP and gold from matches; buy cosmetics in the Wardrobe and complete Missions and Achievements.'
};
const HAS=/[A-Za-zÇĞİÖŞÜçğıöşü]/,ATTRS=['title','placeholder','aria-label'];
const I18N={lang:'tr',en:EN,blocks:BLOCKS,cache:new Map(),names:new Set(),
 addNames(list){let ch=false;for(const n of list||[]){const s=String(n||'').trim();if(s&&!this.names.has(s)){this.names.add(s);ch=true}}if(ch)this.cache.clear()}, /* oyuncu adları çevrilmez (ör. 'Volkan' adlı oyuncu) */
 init(){let l=null;try{l=localStorage.getItem('bp_lang')}catch(e){}if(l!=='tr'&&l!=='en')l=/^tr\b/i.test(navigator.language||'tr')?'tr':'en';this.lang=l;document.documentElement.lang=l},
 set(l){if(l!=='tr'&&l!=='en'||l===this.lang)return;this.lang=l;this.cache.clear();try{localStorage.setItem('bp_lang',l)}catch(e){}document.documentElement.lang=l;this.apply(document.body);try{window.dispatchEvent(new CustomEvent('bp-lang',{detail:l}))}catch(e){}},
 T(s){if(this.lang==='tr'||s==null)return s;s=String(s);const c=this.cache.get(s);if(c!==undefined)return c;let r=s;const m=s.match(/^([\s·—]*)([\s\S]*?)([\s·—]*)$/);if(m&&m[2]&&HAS.test(m[2])&&!this.names.has(m[2])){const o=this.one(m[2],0);if(o!==null)r=m[1]+o+m[3]}if(this.cache.size>6000)this.cache.clear();this.cache.set(s,r);return r},
 one(c,d){if(Object.prototype.hasOwnProperty.call(EN,c))return EN[c];if(this.names.has(c))return c;
  for(const[re,f]of RULES){const m=c.match(re);if(m)return f(m)}
  const nums=[],k=c.replace(/\d+(?:[.,]\d+)?/g,x=>{nums.push(x);return'#'});if(nums.length&&Object.prototype.hasOwnProperty.call(EN,k)){let i=0;return EN[k].replace(/#/g,()=>nums[i++]??'')}
  {const cm=c.match(/^([^:]{2,40}):\s(.+)$/);if(cm){const L=cm[1]+':',hl=Object.prototype.hasOwnProperty.call(EN,L)?EN[L]:Object.prototype.hasOwnProperty.call(EN,cm[1])?EN[cm[1]]+':':null;if(hl!==null){const R=this.one(cm[2],d+1);return hl+' '+(R===null?cm[2]:R)}}} /* 'Başlık: değer' */
  if(d<3)for(const sep of[' · ',' — ',' • ']){if(c.includes(sep)){const ps=c.split(sep);let ch=false;const out=ps.map(p=>{const t=p.trim();if(!t)return p;const r=this.one(t,d+1);if(r!==null&&r!==t){ch=true;return p.replace(t,r)}return p});if(ch)return out.join(sep)}}
  return null},
 // DOM: metin düğümleri + öznitelikler; orijinal Türkçe saklanır, dil geri alınınca geri yazılır
 node(n){const v=n.nodeValue;if(!v||!HAS.test(v))return;const p=n.parentNode;if(p&&(p.nodeName==='SCRIPT'||p.nodeName==='STYLE'||p.nodeName==='TEXTAREA'))return;
  if(n.__en!==undefined&&v===n.__en){if(this.lang==='tr'){n.nodeValue=n.__tr;n.__en=undefined}return}
  n.__tr=v;n.__en=undefined;if(this.lang==='en'){const t=this.T(v);if(t!==v){n.__en=t;n.nodeValue=t}}},
 attr(el){for(const a of ATTRS){const v=el.getAttribute&&el.getAttribute(a);if(!v)continue;const k='__a_'+a;
  if(el[k]&&el[k].en===v){if(this.lang==='tr'){el.setAttribute(a,el[k].tr);el[k]=null}continue}
  el[k]={tr:v,en:null};if(this.lang==='en'){const t=this.T(v);if(t!==v){el[k].en=t;el.setAttribute(a,t)}}}},
 block(el){const k=el.getAttribute('data-i18n');if(!BLOCKS[k])return;if(this.lang==='en'){if(el.__trHTML==null)el.__trHTML=el.innerHTML;if(el.innerHTML!==BLOCKS[k])el.innerHTML=BLOCKS[k]}else if(el.__trHTML!=null){el.innerHTML=el.__trHTML;el.__trHTML=null}},
 apply(root){if(!root)return;this.busy=true;try{
  if(root.nodeType===3){this.node(root);return}
  if(root.nodeType!==1)return;
  for(const el of root.querySelectorAll?root.querySelectorAll('[data-i18n]'):[])this.block(el);if(root.hasAttribute&&root.hasAttribute('data-i18n'))this.block(root);
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while((n=w.nextNode()))this.node(n);
  this.attr(root);for(const el of root.querySelectorAll('[title],[placeholder],[aria-label]'))this.attr(el)}finally{this.busy=false}},
 observe(){const mo=new MutationObserver(list=>{if(this.lang==='tr')return;for(const m of list){if(m.type==='characterData')this.node(m.target);else if(m.type==='attributes')this.attr(m.target);else for(const a of m.addedNodes)this.apply(a)}});
  mo.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:ATTRS});this.mo=mo},
 // tuval yazıları: çizim anında çevir (önbellekli)
 patchCanvas(){const P=CanvasRenderingContext2D.prototype,f=P.fillText,s=P.strokeText,me=this;P.fillText=function(t,...a){return f.call(this,me.lang==='en'?me.T(t):t,...a)};P.strokeText=function(t,...a){return s.call(this,me.lang==='en'?me.T(t):t,...a)};
  const mt=P.measureText;P.measureText=function(t){return mt.call(this,me.lang==='en'?me.T(t):t)}}
};
const T=s=>I18N.T(s);
I18N.init();I18N.patchCanvas();window.I18N=I18N;window.T=T;
const start=()=>{I18N.seen=true;I18N.apply(document.body);I18N.observe()};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
