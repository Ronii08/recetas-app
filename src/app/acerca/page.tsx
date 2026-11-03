import type { Metadata } from 'next'
import Link from 'next/link'

// Cada página puede definir su propio título (aparece en la pestaña del navegador)
export const metadata: Metadata = {
  title: 'Acerca de | Recetario',
}

// Página estática: no pide datos, así que Next.js la genera una sola vez al compilar
export default function AcercaPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Acerca de Recetario</h1>
      <p className="text-gray-700 mb-4">
        Recetario es una aplicación web de recetas de cocina construida con Next.js 16
        (App Router) y Supabase como base de datos.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Tecnologías</h2>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        <li>Next.js 16 con App Router y Server Components</li>
        <li>TypeScript y Tailwind CSS</li>
        <li>Supabase (PostgreSQL con Row Level Security)</li>
        <li>Desplegada en AWS Amplify</li>
      </ul>

      <Link href="/recetas" className="inline-block mt-8 text-orange-600 font-medium">
        Ver todas las recetas &rarr;
      </Link>
    </main>
  )
}
