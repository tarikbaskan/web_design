// Bir etkinlik neye benzer? Önce tarif ediyoruz.
export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma";

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  capacity: number;
  date: string; // YYYY-AA-GG
  time: string; // SS:DD
  location: string;
  description: string;
  image?: string; // afiş isteğe bağlı
}

export interface EventFormData {
  title: string;
  category: Category | "";
  capacity: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export type EventFormErrors = Partial<Record<keyof EventFormData, string>>;
