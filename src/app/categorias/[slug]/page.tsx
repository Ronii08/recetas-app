import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: recetas, error } = await supabase
    .from('recetas')
    .select('*')
    .eq('categoria_slug', slug)

  const categoriaNombre = recetas?.[0]?.categoria ?? slug

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <Link href="/" className="text-orange-600 text-sm">&larr; Volver</Link>
      <h1 className="text-3xl font-bold mt-4 mb-8 capitalize">{categoriaNombre}</h1>

      {error && <p className="text-red-600">Error al cargar la categoría.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recetas?.map((receta) => (
          <Link
            key={receta.id}
            href={`/recetas/${receta.slug}`}
            className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative w-full h-40">
              <Image src={receta.imagen_url} alt={receta.titulo} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h2 className="font-semibold">{receta.titulo}</h2>
            </div>
          </Link>
        ))}
        {recetas?.length === 0 && <p className="text-gray-500">No hay recetas en esta categoría.</p>}
      </div>
    </main>
  )
}