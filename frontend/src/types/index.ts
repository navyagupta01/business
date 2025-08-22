export interface User {
  id: number;
  username: string;
  role: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  summary: string;
  slug: string;
  author_id: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  message: string;
  rating: number;
  created_at: string;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface Newsletter {
  id: number;
  email: string;
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}
