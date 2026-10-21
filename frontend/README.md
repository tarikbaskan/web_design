https://web-design-seven-tau.vercel.app/

# Kampüs Etkinlikleri - Sprint 5 (React Bileşenleri)

Sprint 4'teki tek parça `App.tsx` (294 satır) bileşenlere bölündü. Ekran Sprint 4 ile aynıdır; değişen kodun içidir.

* Her parça kendi dosyasında bir **bileşen**
* Bileşenler veriyi **props** ile alır, her props'un tipi `interface` ile yazılıdır
* Olaylar **callback** ile App'e bildirilir (`onNavigate`, `onShowDetail`, `onBack`, `onEdit`, `onSubmit`...)
* State (`page`, `selectedId`, `searchText`, `category`) App'te kalır (**lifting state**)

## Çalıştırma
```
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run preview
```

## Bileşen ağacı
```
App  (state: page, selectedId, searchText, category)
├─ Header        title, text?
├─ Navigation    current, onNavigate
├─ main (açık sayfaya göre)
│  ├─ EventList      events, onShowDetail, emptyText?   (ana sayfa ve Etkinlikler)
│  │   └─ EventCard  event, onShowDetail
│  ├─ EventFilter    searchText, category, categories, onSearchChange, onCategoryChange
│  ├─ EventDetail    event, onBack, onEdit
│  └─ EventForm      onSubmit                            (Ekle ve Güncelle)
└─ Footer        (props yok)
```

## src klasörü
```
src/
  components/
    layout/   Header.tsx  Navigation.tsx  Footer.tsx
    events/   EventCard.tsx  EventList.tsx  EventFilter.tsx  EventDetail.tsx
    forms/    EventForm.tsx
  data/       events.ts
  types/      campus-event.ts  page.ts
  utils/      filter-events.ts  format-date.ts
  App.css  App.tsx  index.css  main.tsx
```
`page.ts` ve `format-date.ts` bu sprintte App'ten taşındı; çünkü birden fazla bileşen kullanıyor.

## Geliştirici
**Tarık Başkan**
Süleyman Demirel Üniversitesi, Bilgisayar Mühendisliği
