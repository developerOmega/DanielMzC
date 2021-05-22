// Interfaz para el modelo padre
export interface ModelData {
  id: number,
  updated_at: string,
  created_at: string
}

// Interfaz para Admins
export interface AdminData {
  name: string,
  email: string,
  password: string,
  is_su_admin: boolean
}

// Interfaz para Sliders
export interface SliderData {
  img?: string,
  content: string,
  url?: string,
  admin_id: number
}

// Interfaz de Projects
export interface ProjectData {
  title: string,
  description: string,
  main_img?: string,
  admin_id: number
}

// Interfaz de Blogs
export interface BlogData {
  title: string,
  description: string,
  content: string,
  main_img?: string,
  admin_id: number
}

// Interfaz de Seccions
export interface SectionData {
  img?: string,
  content: string,
  project_id: number
}