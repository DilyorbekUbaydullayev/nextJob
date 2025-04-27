export interface Job {
  id: string
  title: string
  company: string
  description: string
  location: string
  time: string
  work_type: string
  salary: number
  ish_vaqti:string
}

export interface User {
  id: string
  first_name: string
  last_name: string
  username: string
  phone: string
  email: string
  position: string
  age: number
}
