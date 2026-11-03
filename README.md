# Kampüs Etkinlikleri — Sprint 6 ve Vize Teslimi (Router, Context ve Yönetim)

## Canlı Vercel Adresi
* **Canlı Adres:** [https://tarikbaskan-frontend.vercel.app](https://tarikbaskan-frontend.vercel.app)

## Kurulum ve Çalıştırma
Projeyi yerel ortamda çalıştırmak için `frontend` klasöründe aşağıdaki komutları uygulayın:

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
```

Üretim derlemesi ve önizleme için:
```bash
npm run build    # tsc -b && vite build
npm run preview
```

## Route Listesi (10 Adres, 10 Sayfa)

| Adres | Sayfa Bileşeni | Açıklama |
| :--- | :--- | :--- |
| `/` | `HomePage` | Ana sayfa (yaklaşan 2 etkinlik listesi) |
| `/events` | `EventsPage` | Tüm etkinlikler, metin arama ve kategori filtreleme |
| `/events/:id` | `EventDetailPage` | Etkinlik detay sayfası (`useParams` ile `id` okuma) |
| `/admin` | `AdminPage` | Yönetim paneli (masaüstünde tablo, mobilde kart görünümü, silme onayı) |
| `/admin/new` | `AddEventPage` | Yeni etkinlik ekleme sayfası (`EventForm` + `validateEvent`) |
| `/admin/:id/edit` | `EditEventPage` | Mevcut etkinliği güncelleme sayfası (`EventForm` + `validateEvent`) |
| `/login` | `LoginPage` | Giriş yap sayfası (controlled form ve doğrulama) |
| `/register` | `RegisterPage` | Kayıt ol sayfası (controlled form ve şifre tekrar kontrolü) |
| `/forgot-password` | `ForgotPasswordPage` | Şifremi unuttum sayfası (e-posta doğrulama ve demo mesajı) |
| `*` | `NotFoundPage` | Bulunamayan adresler veya geçersiz etkinlik ID'leri için 404 sayfası |

## Klasör Yapısı (`frontend/src`)
```
frontend/
  src/
    components/
      layout/   Header.tsx  Navigation.tsx  Footer.tsx
      events/   EventCard.tsx  EventList.tsx  EventFilter.tsx  EventDetail.tsx
      forms/    EventForm.tsx
    context/    EventsContext.tsx
    pages/
      HomePage.tsx  EventsPage.tsx  EventDetailPage.tsx
      AdminPage.tsx  AddEventPage.tsx  EditEventPage.tsx
      LoginPage.tsx  RegisterPage.tsx  ForgotPasswordPage.tsx
      NotFoundPage.tsx
    data/       events.ts
    types/      campus-event.ts
    utils/      filter-events.ts  format-date.ts  validate-event.ts
    App.tsx  App.css  index.css  main.tsx
```

## Geliştirici
**Tarık Başkan** (`2416501012`)  
Süleyman Demirel Üniversitesi, Bilgisayar Mühendisliği
