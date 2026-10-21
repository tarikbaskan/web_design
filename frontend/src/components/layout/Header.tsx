interface HeaderProps {
  title: string; // zorunlu: sayfanın başlığı
  text?: string; // isteğe bağlı: başlığın altındaki kısa yazı
}

function Header({ title, text }: HeaderProps) {
  return (
    <header className="site-baslik">
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </header>
  );
}

export default Header;
