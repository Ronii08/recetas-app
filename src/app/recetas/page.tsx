import { supabase } from '@/lib/supabase'
import { Receta } from '@/lib/types'
import BuscadorRecetas from '@/components/BuscadorRecetas'

// "force-dynamic" = la página se genera en cada visita, NO una sola vez al compilar.
// Así el build no depende de Supabase y las recetas nuevas aparecen sin volver a desplegar.
export const dynamic = 'force-dynamic'

// Server Component (async): corre en el servidor, así que puede pedir datos a Supabase directamente.
// Los datos se los pasamos al Client Component (BuscadorRecetas), que se encarga de la interacción.
export default async function RecetasPage() {
  const { data: recetas, error } = await supabase
    .from('recetas')
    .select('*')
    .order('titulo', { ascending: true })

  // Si Supabase falla, lanzamos el error: Next.js lo captura y muestra src/app/error.tsx
  if (error) {
    throw new Error('No se pudieron cargar las recetas')
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Todas las recetas</h1>
      <p className="text-gray-600 mb-8">Busca por nombre o por categoría</p>

      {/* "?? []" significa: si recetas es null, usa una lista vacía para no romper el componente */}
      <BuscadorRecetas recetas={(recetas ?? []) as Receta[]} />
    </main>
  )
}
