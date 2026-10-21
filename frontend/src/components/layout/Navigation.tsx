import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName; // şu an açık sayfa (aktif linki boyar)
  onNavigate: (page: PageName) => void; // tıklanınca App'e haber verir
}

// Menü dizisi artık App'te değil, menüyü çizen bileşende.
const menuItems: { name: PageName; label: string }[] = [
  { name: "home", label: "Ana Sayfa" },
  { name: "events", label: "Etkinlikler" },
  { name: "add", label: "Ekle" },
];

function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav className="menu">
      {menuItems.map((item) => (
        <a
          key={item.name}
          href="#"
          aria-current={current === item.name ? "page" : undefined}
          onClick={(e) => {
            e.preventDefault(); // sayfa yenilenmesin
            onNavigate(item.name);
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export default Navigation;
