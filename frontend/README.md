https://web-design-seven-tau.vercel.app/

# Kampüs Etkinlikleri - Sprint 4 (Vite + TypeScript + React)

Sprint 3'teki 5 HTML sayfalı site React ve TypeScript'e taşındı. Tüm sayfalar tek `App.tsx` içinde; sayfa geçişi, arama ve kategori filtresi `useState` ile çalışır (React Router Sprint 6'da gelecek).

## Çalıştırma
```
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run preview
```

## Dosyalar
* `package.json`: Proje adı, komutlar (dev, build, preview) ve paket listesi.
* `package-lock.json`: `npm install` ile oluşur; yüklenen paketlerin tam sürümlerini tutar.
* `node_modules/`: İndirilen paketler; GitHub'a gitmez.
* `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`: TypeScript ayarları.
* `vite.config.ts`: Vite ayarları ve React eklentisi.
* `index.html`: Tek HTML dosyası; içinde boş `div#root` bulunur.
* `public/`: Olduğu gibi kopyalanan dosyalar (afiş görselleri, favicon).
* `src/main.tsx`: React'i başlatır, `App`'i `root`'a çizer.
* `src/App.tsx`: Uygulamanın ana bileşeni; 5 sayfanın hepsi burada.
* `src/App.css`: Sprint 3 CSS'i (renk ve font öğrenci numarasından gelir).
* `src/index.css`: Genel stil; bu sprintte boş.
* `src/types/campus-event.ts`: `Category` ve `CampusEvent` tipleri.
* `src/data/events.ts`: Tipli 6 etkinlik kaydı.
* `src/utils/filter-events.ts`: Saf fonksiyonlar `searchEvents`, `filterByCategory`, `findEventById`.

## Geliştirici
**Tarık Başkan**
Süleyman Demirel Üniversitesi, Bilgisayar Mühendisliği
