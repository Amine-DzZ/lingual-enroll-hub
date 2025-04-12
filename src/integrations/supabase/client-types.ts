
export type Course = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  level: string;
  instructor: string;
  created_at: string;
};

export type Enrollment = {
  id: string;
  student_name: string;
  email: string;
  phone: string;
  course_id: string;
  status: string;
  created_at: string;
};

export type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'staff' | 'user';
  created_at: string;
};
