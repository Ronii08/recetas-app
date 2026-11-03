'use client' // Usa useState, useEffect y localStorage: todo eso solo existe en el navegador

import { useEffect, useState } from 'react'

// Nombre con el que guardamos la lista en el navegador (localStorage es como un mini bloc de notas del navegador)
const CLAVE = 'recetario:favoritos'

// Lee la lista de favoritos guardada. Si no hay nada (o está dañada), devuelve una lista vacía.
// El try/catch evita que la app se caiga si el navegador bloquea localStorage.
function leerFavoritos(): string[] {
  try {
    const guardado = localStorage.getItem(CLAVE)
    const lista = guardado ? JSON.parse(guardado) : []
    return Array.isArray(lista) ? lista : []
  } catch {
    return []
  }
}

export default function BotonFavorito({ slug }: { slug: string }) {
  // Empezamos en false porque el servidor NO conoce los favoritos del usuario.
  // Si leyéramos localStorage aquí directamente, el HTML del servidor y el del navegador
  // no coincidirían y React mostraría un error de "hydration".
  const [esFavorito, setEsFavorito] = useState(false)

  // useEffect se ejecuta DESPUÉS de que la página aparece en el navegador.
  // Aquí es seguro leer localStorage y actualizar el botón.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sincronizar con localStorage (sistema externo) es el uso correcto de useEffect
    setEsFavorito(leerFavoritos().includes(slug))
  }, [slug]) // el [slug] significa: "vuelve a ejecutar solo si cambia el slug"

  function alternar() {
    const favoritos = leerFavoritos()

    // Si ya era favorito lo quitamos; si no, lo agregamos.
    const nuevos = esFavorito
      ? favoritos.filter((s) => s !== slug)
      : [...favoritos, slug]

    try {
      localStorage.setItem(CLAVE, JSON.stringify(nuevos))
    } catch {
      // Si no se puede guardar, igual cambiamos el botón en pantalla
    }
    setEsFavorito(!esFavorito)
  }

  return (
    <button
      onClick={alternar}
      aria-pressed={esFavorito} // le dice a lectores de pantalla si el botón está activado
      className={`mt-4 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
        esFavorito
          ? 'bg-orange-600 border-orange-600 text-white'
          : 'border-orange-600 text-orange-600 hover:bg-orange-50'
      }`}
    >
      {esFavorito ? '★ En favoritos' : '☆ Guardar en favoritos'}
    </button>
  )
}
