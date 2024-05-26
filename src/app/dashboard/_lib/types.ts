export interface Admin {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
}

export interface HistoryItem {
  id: number;
  adminId: number;
  action: string;
  date: string | Date;
  admin: Admin;
}
interface Shared {
  id: number | string;
  name: string;
  description?: string | null;
  cover?: string | null;
  isDraft?: boolean;
  history?: HistoryItem[];
}

export interface EventItem extends Shared {
  agendaId: number | string;
  location?: string | null;
  url?: string | null;
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  categories: string[];
  likes?: number | null;
  subscribers?: number | null;
}

export interface AgendaItem extends Shared {
  logo?: string | null;
  eventsNumber: number | null;
  attendanceRate: number | null;
  events: EventItem[];
  admins?: Admin[];
}
