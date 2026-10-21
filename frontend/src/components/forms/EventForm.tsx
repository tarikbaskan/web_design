import { events } from "../../data/events";
import type { Category } from "../../types/campus-event";

interface EventFormProps {
  onSubmit: () => void;
}

// Kategori seçenekleri veriden üretilir, her biri bir kez.
const categories: Category[] = [...new Set(events.map((e) => e.category))];

function EventForm({ onSubmit }: EventFormProps) {
  return (
    <>
      <p>Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
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

        <button type="submit">Kaydet</button>
      </form>
    </>
  );
}

export default EventForm;
