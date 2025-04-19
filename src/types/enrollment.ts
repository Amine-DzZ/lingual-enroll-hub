
export interface Enrollment {
  id: string;
  student_name: string;
  email: string;
  phone: string;
  courses: {
    name: string;
    level: string;
  };
  status: string;
  created_at: string;
  message?: string;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}
