Proceso de Vibe Coding

Registro del trabajo hecho con IA como copiloto de desarrollo.

Herramienta de IA: Claude
Proyecto base: Recetario (Next.js 16, App Router, TypeScript, Tailwind, Supabase), que ya tenía listado de recetas y las rutas dinámicas /recetas/[slug] y /categorias/[slug].
Alcance de este documento: las iteraciones que se hicieron con la IA para completar los requisitos de la tarea y llevar la app a producción.



Iteración 1: Diagnóstico contra los requisitos

Prompt (resumen):— se pidió revisar el proyecto completo contra los requisitos de la tarea (4 rutas, Server y Client Components, useState/useEffect, loading/error UI, .env.example, README) y completar lo que faltara.

Hallazgos de la revisión:

Hallazgo	Por qué importaba
Solo 3 rutas (/, /recetas/[slug], /categorias/[slug])	La tarea pide mínimo 4
Ningún componente usaba useState ni useEffect	Requisito explícito de la tarea
El archivo se llamaba no-encontrado.tsx	Next.js solo reconoce el nombre exacto not-found.tsx, así que esa pantalla nunca se mostraba
.gitignore tenía .env*	Eso también ignoraba .env.example, que nunca se habría subido a GitHub
Título de la pestaña "Create Next App" e idioma en	Valores por defecto sin personalizar

Decisión: corregir estos puntos con cambios pequeños, cada uno en su propio commit.

Iteración 2: Cuarta ruta y buscador (Client Component)

Prompt (resumen):crear la ruta /recetas con un buscador que filtre por nombre o categoría.

Decisión técnica: separar responsabilidades.

src/app/recetas/page.tsx es un Server Component: pide los datos a Supabase.
src/components/BuscadorRecetas.tsx es un Client Component ('use client'): guarda lo escrito con useState y filtra en pantalla.

Así el navegador solo descarga el JavaScript de lo que realmente es interactivo.

Iteración 3: Favoritos con useEffect y localStorage

Prompt (resumen):agregar un botón para guardar recetas favoritas en el navegador.

Decisión técnica: BotonFavorito.tsx empieza en false y lee localStorage dentro de useEffect. Si se leyera al renderizar, el HTML del servidor (que no conoce los favoritos) no coincidiría con el del navegador y React mostraría un error de hidratación.

Iteración 4: Navegación y página /acerca

Prompt (resumen):agregar un Navbar común y una página estática /acerca.

Decisión técnica: el Navbar va en layout.tsx para aparecer en todas las páginas sin repetirlo. Es un Server Component porque solo muestra enlaces.

Iteración 5: Problema de build y páginas dinámicas

Desafío: al probar el build con Supabase inaccesible, la página /recetas falló la compilación completa. Next.js intentaba generar la página una vez durante el build, y el error de Supabase detenía todo.

Solución: export const dynamic = 'force-dynamic' en / y /recetas. Las páginas se generan en cada visita, así:

El build no depende de que Supabase o las variables de entorno estén bien en ese momento.
Las recetas nuevas aparecen sin volver a desplegar.
Iteración 6: Despliegue (de AWS Amplify a Vercel)

Desafío: no se pudo crear la cuenta de AWS. El plan era desplegar en AWS Amplify. Al registrarme, el formulario devolvió el error ERR-837 ("Se ha producido un error al procesar tu solicitud", Request ID f8404701-18a0-46b9-83de-dca11a37efec, 3 de noviembre de 2026 GMT). El error apareció al intentar registrarme con mi correo estudiantil, y además el proceso pedía una tarjeta para verificar la cuenta. Sin cuenta no se podía usar Amplify.

Decisión: desplegar en Vercel, que la tarea de Vibe Coding menciona como plataforma recomendada. El proyecto no necesitó cambios de código, porque Vercel detecta Next.js solo.

Decisiones técnicas:

Las variables NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY se configuran en el panel de Vercel antes del primer despliegue, porque Next.js las incrusta en el código al compilar.
Se usa la publishable key de Supabase, que es pública por diseño y está protegida por RLS. La secret key nunca se usa en el proyecto.
.env.local nunca se sube al repositorio; solo .env.example.



Validación del código generado

Qué se revisó antes de aceptar el código de la IA:

npm run lint sin errores.
npm run build compila y pasa TypeScript.
Prueba manual: el buscador filtra, el botón de favoritos recuerda su estado al recargar, el Navbar navega entre las 5 rutas y una receta inexistente muestra la pantalla de "no encontrada".
Revisión de que no hay claves reales en el repositorio.