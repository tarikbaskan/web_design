https://web-design-seven-tau.vercel.app/

# Kampüs Etkinlikleri - Sprint 3 (JavaScript ve DOM)

Etkinlikler artık HTML'e elle yazılmıyor; tek bir veri dosyasından (`js/data.js`) üretiliyor.

## Neler var?
* 6 etkinlik `data.js` içinde bir dizi; kartlar JavaScript ile üretilir.
* Ana sayfada tarihi en yakın 2 etkinlik (`data-limit="2"`), Etkinlikler sayfasında hepsi.
* Arama + kategori filtresi birlikte çalışır, sonuç sayısı / "bulunamadı" mesajı gösterilir.
* `etkinlik-detay.html?id=event-3` ile doğru etkinlik açılır; geçersiz/eksik id'de hata kutusu.
* Ekle formu kendi hata/başarı mesajını gösterir (veri kaydedilmez, localStorage yok).
* Güncelle formu detaydan `?id=` ile dolu gelir; id yoksa uyarı gösterir.

## Dosya yapısı
```
sprint3/
  css/2416501012.css
  js/
    data.js          etkinlik verisi
    utils.js         tarih biçimleme ve güvenli metin yardımcıları
    event-list.js    liste, ana sayfa, arama + kategori filtresi
    event-detail.js  ?id= ile detay sayfası
    event-form.js    ekle / güncelle formu doğrulaması
  index.html, etkinlikler.html, etkinlik-detay.html,
  etkinlik-ekle.html, etkinlik-guncelle.html
  afis.jpg, afis1.jpg
```

## Çalıştırma
Modüller (`type="module"`) `file://` ile çalışmaz. VS Code'da **Live Server** ile aç:
`http://127.0.0.1:5500/sprint3/`

## Teknolojiler
HTML5, CSS3, JavaScript (ES modules). Framework, jQuery ve localStorage kullanılmamıştır.

## Geliştirici
**Tarık Başkan**
Süleyman Demirel Üniversitesi, Bilgisayar Mühendisliği
