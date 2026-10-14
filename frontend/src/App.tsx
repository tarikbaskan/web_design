import "./App.css";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

const menuItems: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" },
];

// "2026-10-12" -> "12 Ekim 2026"
const formatDate = (iso: string): string =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

// Kategori seçenekleri veriden üretilir, her biri bir kez.
const categories: Category[] = [...new Set(events.map((e) => e.category))];

// En yakın 2 etkinlik (önce kopyala, sonra sırala).
const upcoming = [...events]
  .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
  .slice(0, 2);

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  function handleLink(e: MouseEvent, next: PageName, id: string | null = null) {
    e.preventDefault(); // sayfa yenilenmesin
    go(next, id);
  }

  // Filtreli liste state değil; her çizimde hesaplanır.
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  const heading =
    page === "home"
      ? "Kampüs Etkinlikleri"
      : page === "events"
        ? "Tüm Etkinlikler"
        : page === "detail"
          ? (selected?.title ?? "Etkinlik bulunamadı")
          : page === "add"
            ? "Etkinlik Ekle"
            : "Etkinlik Güncelle";

  const subtitle =
    page === "home"
      ? "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin."
      : page === "events"
        ? "Kampüste düzenlenen etkinlikler."
        : "";

  const tabTitle = page === "home" ? "Ana Sayfa" : heading;

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${tabTitle}`;
  }, [tabTitle]);

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <span className="rozet">{event.category}</span>
        <p>
          Tarih: {formatDate(event.date)}, {event.time}
        </p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <a href="#" onClick={(e) => handleLink(e, "detail", event.id)}>
          Detayları gör →
        </a>
      </article>
    );
  }

  return (
    <>
      <header className="site-baslik">
        <h1>{heading}</h1>
        {subtitle && <p>{subtitle}</p>}
        <nav className="menu">
          {menuItems.map((item) => (
            <a
              key={item.page}
              href="#"
              aria-current={page === item.page ? "page" : undefined}
              onClick={(e) => handleLink(e, item.page)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <section className="etkinlik-listesi">
              {upcoming.map(renderCard)}
            </section>
            <p>
              <a
                className="buton"
                href="#"
                onClick={(e) => handleLink(e, "events")}
              >
                Tüm etkinlikleri gör →
              </a>
            </p>
          </>
        )}

        {page === "events" && (
          <>
            <div className="filtre">
              <label htmlFor="arama">Etkinlik ara</label>
              <input
                id="arama"
                type="search"
                placeholder="Örn. atölye, kariyer"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <label htmlFor="kategori-filtre">Kategori</label>
              <select
                id="kategori-filtre"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category | "")}
              >
                <option value="">Tümü</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <p id="sonuc" aria-live="polite">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <section className="etkinlik-listesi">
              {filtered.map(renderCard)}
            </section>
          </>
        )}

        {page === "detail" && !selected && (
          <>
            <div className="hata-kutusu" role="alert">
              Etkinlik bulunamadı. Listeden bir etkinlik seçin.
            </div>
            <p>
              <a
                className="buton"
                href="#"
                onClick={(e) => handleLink(e, "events")}
              >
                ← Listeye dön
              </a>
            </p>
          </>
        )}

        {page === "detail" && selected && (
          <article className="detay">
            {selected.image && (
              <figure>
                <img src={selected.image} alt={`${selected.title} afişi`} />
                <figcaption>{selected.title} afişi</figcaption>
              </figure>
            )}
            <section className="kunye">
              <h2>Etkinlik Künyesi</h2>
              <dl>
                <dt>Tarih</dt>
                <dd>
                  <time dateTime={`${selected.date}T${selected.time}`}>
                    {formatDate(selected.date)}, {selected.time}
                  </time>
                </dd>
                <dt>Yer</dt>
                <dd>{selected.location}</dd>
                <dt>Kategori</dt>
                <dd>{selected.category}</dd>
                <dt>Kontenjan</dt>
                <dd>{selected.capacity} kişi</dd>
              </dl>
            </section>
            <div className="aciklama">
              <h2>Açıklama</h2>
              <p>{selected.description}</p>
              <p className="butonlar">
                <a
                  className="buton"
                  href="#"
                  onClick={(e) => handleLink(e, "events")}
                >
                  ← Listeye dön
                </a>
                <a
                  className="buton"
                  href="#"
                  onClick={(e) => handleLink(e, "update", selected.id)}
                >
                  Bu etkinliği güncelle
                </a>
              </p>
            </div>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <div id="form-alani">
            <p>Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="title">Etkinlik Adı</label>
              <input
                id="title"
                type="text"
                maxLength={80}
                placeholder="Örn. Kariyer Günleri 2026"
              />

              <label htmlFor="category">Kategori</label>
              <select id="category" defaultValue="">
                <option value="">Seçiniz</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <label htmlFor="date">Tarih</label>
              <input id="date" type="date" />

              <label htmlFor="time">Saat</label>
              <input id="time" type="time" />

              <label htmlFor="location">Yer</label>
              <input
                id="location"
                type="text"
                placeholder="Örn. A Blok Konferans Salonu"
              />

              <label htmlFor="capacity">Kontenjan</label>
              <input id="capacity" type="number" min={1} max={1000} />

              <label htmlFor="description">Açıklama</label>
              <textarea id="description" rows={5} />

              <button type="submit">
                {page === "add" ? "Kaydet" : "Güncelle"}
              </button>
            </form>
          </div>
        )}
      </main>

      <footer>
        <p>Tarık Başkan · 2416501012 · 2026</p>
      </footer>
    </>
  );
}

export default App;
