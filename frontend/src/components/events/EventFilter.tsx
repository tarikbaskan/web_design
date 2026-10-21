import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  category: Category | "";
  categories: Category[];
  onSearchChange: (text: string) => void;
  onCategoryChange: (category: Category | "") => void;
}

// State App'te; burası sadece değeri gösterir, değişikliği yukarı bildirir.
function EventFilter({
  searchText,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}: EventFilterProps) {
  return (
    <div className="filtre">
      <label htmlFor="arama">Etkinlik ara</label>
      <input
        id="arama"
        type="search"
        placeholder="Örn. atölye, kariyer"
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <label htmlFor="kategori-filtre">Kategori</label>
      <select
        id="kategori-filtre"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value as Category | "")}
      >
        <option value="">Tümü</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}

export default EventFilter;
