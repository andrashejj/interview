export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    age: number;
    company: { name: string };
    location: { city: string; state: string };
  }
  
  export interface SortConfig {
    key: keyof User | 'fullName' | 'company' | 'location';
    direction: 'asc' | 'desc';
  }