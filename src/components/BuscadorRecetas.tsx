'use client' // Obligatorio: sin esta línea no se puede usar useState (los hooks solo existen en el navegador)

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Receta } from '@/lib/types'

// Recibe las recetas por "props": el Server Component las trae de Supabase
// y las pasa aquí. Este componente solo se encarga de filtrar en pantalla.
export default function BuscadorRecetas({ recetas }: { recetas: Receta[] }) {
  // useState guarda lo que el usuario escribe. Cada vez que cambia, React vuelve a dibujar el componente.
  // Es como una variable normal, pero React se entera cuando cambia.
  const [busqueda, setBusqueda] = useState('')

  // Texto normalizado: minúsculas para que "Pupusa" y "pupusa" cuenten igual.
  const texto = busqueda.trim().toLowerCase()

  // filter() recorre el arreglo y se queda solo con los elementos que cumplen la condición.
  // Aquí: el título o la categoría deben contener lo que escribió el usuario.
  const filtradas = recetas.filter(
    (r) =>
      r.titulo.toLowerCase().includes(texto) ||
      r.categoria.toLowerCase().includes(texto)
  )

  return (
    <div>
      <input
        type="search"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)} // se ejecuta en cada tecla y actualiza el estado
        placeholder="Buscar por nombre o categoría..."
        aria-label="Buscar recetas"
        className="w-full rounded-lg border px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      <p className="text-sm text-gray-500 mb-4">
        {filtradas.length} {filtradas.length === 1 ? 'receta' : 'recetas'}
      </p>

      {/* Si no hay resultados mostramos un mensaje en vez de una pantalla vacía */}
      {filtradas.length === 0 ? (
        <p className="text-gray-500">No se encontraron recetas con “{busqueda}”.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtradas.map((receta) => (
            <Link
              key={receta.id} // "key" ayuda a React a identificar cada elemento de la lista
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
                <p className="text-xs text-gray-400 mt-2">⏱ {receta.tiempo_preparacion} min</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
