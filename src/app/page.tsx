import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { Receta } from '@/lib/types'

// La página se genera en cada visita (no al compilar): si Supabase falla durante el build
// no se queda guardado el mensaje de error, y las recetas nuevas aparecen sin redesplegar.
export const dynamic = 'force-dynamic'

export default async function Home() {
  const { data: recetas, error } = await supabase
    .from('recetas')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
      console.log('ERROR SUPABASE:', error)
  return <p className="p-8 text-red-600">Error al cargar las recetas.</p>
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-2">🍳 Recetario</h1>
      <p className="text-gray-600 mb-8">Descubre recetas deliciosas para cada ocasión</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recetas?.map((receta: Receta) => (
          <Link
            key={receta.id}
            href={`/recetas/${receta.slug}`}
            className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative w-full h-48">
              <Image
                src={receta.imagen_url}
                alt={receta.titulo}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <span className="text-xs font-medium text-orange-600 uppercase">
                {receta.categoria}
              </span>
              <h2 className="text-lg font-semibold mt-1">{receta.titulo}</h2>
              <p className="text-sm text-gray-500 mt-1">{receta.descripcion}</p>
              <p className="text-xs text-gray-400 mt-2">⏱ {receta.tiempo_preparacion} min</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}