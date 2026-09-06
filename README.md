# Recetario - Landing Page

Landing page de recetas de cocina construida con Next.js 16 (App Router) y Supabase como backend serverless. Proyecto enfocado en rutas dinámicas y consumo de datos desde Server Components.

## Tecnologías

- Next.js 16 (App Router, Server Components, Turbopack)
- TypeScript
- Tailwind CSS
- Supabase (base de datos PostgreSQL + Data API)

## Funcionalidades

- Listado de recetas obtenido desde Supabase
- Ruta dinámica `/recetas/[slug]` — detalle de cada receta
- Ruta dinámica `/categorias/[slug]` — recetas filtradas por categoría
- Row Level Security (RLS) configurado para lectura pública
- Loading states y manejo de errores (`loading.tsx`, `error.tsx`, `not-found.tsx`)
- Diseño responsive con Tailwind CSS

## Instalación local

1. Cloná el repositorio:
```bash
   git clone https://github.com/Ronii08/recetas-app.git
   cd recetas-app
```

2. Instalá las dependencias:
```bash
   npm install
```

3. Creá un archivo `.env.local` en la raíz con las siguientes variables (ver sección abajo).

4. Corré el servidor de desarrollo:
```bash
   npm run dev
```

5. Abrí [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Creá un archivo `.env.local` con:
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase


Estos valores se obtienen desde el dashboard de Supabase, en **Settings > API**.

## Estructura de datos

Tabla `recetas` en Supabase con columnas: `id`, `titulo`, `slug`, `descripcion`, `ingredientes`, `categoria`, `categoria_slug`, `tiempo_preparacion`, `imagen_url`, `created_at`. RLS habilitado con política de lectura pública (`SELECT`).