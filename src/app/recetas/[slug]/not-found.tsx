import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Receta no encontrada</h1>
      <Link href="/" className="text-orange-600 mt-4 inline-block">Volver al inicio</Link>
    </main>
  )
}