import "./App.css";
import { useEffect, useState } from "react";
import { events } from "./data/events";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { filterByCategory, findEventById, searchEvents } from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

// Kategori seçenekleri veriden üretilir, her biri bir kez.
const categories: Category[] = [...new Set(events.map((e) => e.category))];

// En yakın 2 etkinlik (önce kopyala, sonra sırala).
const upcoming = [...events]
  .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
  .slice(0, 2);

const titles: Record<PageName, string> = {
  home: "Kampüs Etkinlikleri",
  events: "Tüm Etkinlikler",
  detail: "",
  add: "Etkinlik Ekle",
  update: "Etkinlik Güncelle",
};

const texts: Partial<Record<PageName, string>> = {
  home: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.",
  events: "Kampüste düzenlenen etkinlikler.",
};

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  // Filtreli liste state değil; her çizimde hesaplanır.
  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  const title = page === "detail" ? selected?.title ?? "" : titles[page];

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${page === "home" ? "Ana Sayfa" : title}`;
  }, [page, title]);

  return (
    <>
      <Header title={title} text={texts[page]} />
      <Navigation current={page} onNavigate={go} />

      <main>
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
            <p>
              <a className="buton" href="#" onClick={(e) => { e.preventDefault(); go("events"); }}>
                Tüm etkinlikleri gör →
              </a>
            </p>
          </>
        )}

        {page === "events" && (
          <>
            <EventFilter searchText={searchText} category={category} categories={categories}
              onSearchChange={setSearchText} onCategoryChange={setCategory} />
            {filtered.length > 0 && (
              <p className="sonuc" aria-live="polite">{`${filtered.length} etkinlik listeleniyor.`}</p>
            )}
            <EventList events={filtered} onShowDetail={(id) => go("detail", id)}
              emptyText="Aramanıza uygun etkinlik bulunamadı." />
          </>
        )}

        {page === "detail" && selected && (
          <EventDetail event={selected} onBack={() => go("events")} onEdit={(id) => go("update", id)} />
        )}

        {(page === "add" || page === "update") && (
          <div id="form-alani">
            <EventForm onSubmit={() => window.scrollTo(0, 0)} />
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
