export interface Experience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Certificate {
  name: string;
  issuer: string;
  year: string;
}

export interface Project {
  name: string;
  description: string;
  url: string;
}

export interface CVData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  photoUrl: string;
  experience: Experience[];
  education: Education[];
  skills: string;
  certificates: Certificate[];
  projects: Project[];
}
