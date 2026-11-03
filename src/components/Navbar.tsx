import Link from 'next/link'

// Server Component (no tiene "use client"): solo muestra enlaces fijos,
// no necesita estado ni interacción, así que no hace falta enviarlo como JavaScript al navegador.
export default function Navbar() {
  return (
    <header className="border-b">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          🍳 Recetario
        </Link>

        {/* <Link> navega entre páginas sin recargar todo el sitio (es más rápido que <a>) */}
        <ul className="flex gap-4 text-sm font-medium">
          <li>
            <Link href="/" className="hover:text-orange-600">Inicio</Link>
          </li>
          <li>
            <Link href="/recetas" className="hover:text-orange-600">Recetas</Link>
          </li>
          <li>
            <Link href="/acerca" className="hover:text-orange-600">Acerca de</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
