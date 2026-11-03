import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import BotonFavorito from '@/components/BotonFavorito'

export default async function RecetaDetalle({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: receta, error } = await supabase
    .from('recetas')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !receta) {
    notFound()
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/" className="text-orange-600 text-sm">&larr; Volver</Link>

      <div className="relative w-full h-80 rounded-xl overflow-hidden mt-4">
        <Image src={receta.imagen_url} alt={receta.titulo} fill className="object-cover" />
      </div>

      <span className="text-xs font-medium text-orange-600 uppercase mt-4 block">
        <Link href={`/categorias/${receta.categoria_slug}`}>{receta.categoria}</Link>
      </span>
      <h1 className="text-3xl font-bold mt-2">{receta.titulo}</h1>
      <p className="text-gray-600 mt-2">{receta.descripcion}</p>
      <p className="text-sm text-gray-400 mt-2">⏱ {receta.tiempo_preparacion} minutos</p>

      {/* Esta página es un Server Component, pero puede incluir un Client Component adentro.
          Solo el botón se envía como JavaScript al navegador; el resto sigue siendo HTML del servidor. */}
      <BotonFavorito slug={receta.slug} />

      <h2 className="text-xl font-semibold mt-6 mb-2">Ingredientes</h2>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        {receta.ingredientes.map((ing: string, i: number) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>
    </main>
  )
}