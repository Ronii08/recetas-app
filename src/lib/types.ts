export type Receta = {
  id: string
  titulo: string
  slug: string
  descripcion: string
  ingredientes: string[]
  categoria: string
  categoria_slug: string
  tiempo_preparacion: number
  imagen_url: string
  created_at: string
}