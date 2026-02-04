// types.ts
export interface Project {
  name: string;
  period: string;
  location?: string;
  link?: string;
  subtitle?: string;
  details: string[];
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description?: string;
  bullets: string[];
}
