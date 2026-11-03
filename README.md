# Recetario

Aplicación web de recetas de cocina construida con Next.js 16 (App Router) y Supabase como backend serverless. Proyecto enfocado en rutas dinámicas, consumo de datos desde Server Components e interactividad con Client Components.

🌐 **Demo en vivo:** _(pendiente: pegar aquí la URL pública de AWS Amplify, por ejemplo `https://main.xxxxxxxx.amplifyapp.com`)_

## Tecnologías

- Next.js 16 (App Router, Server Components, Turbopack)
- TypeScript
- Tailwind CSS
- Supabase (base de datos PostgreSQL + Data API)
- Despliegue en AWS Amplify

## Rutas

| Ruta | Descripción |
|---|---|
| `/` | Inicio: recetas más recientes |
| `/recetas` | Listado completo con buscador por nombre o categoría |
| `/recetas/[slug]` | Detalle de una receta, con botón de favoritos |
| `/categorias/[slug]` | Recetas filtradas por categoría |
| `/acerca` | Información del proyecto |

## Funcionalidades

- Listado de recetas obtenido desde Supabase (Server Components)
- Buscador en tiempo real (Client Component con `useState`)
- Botón de favoritos guardado en el navegador (`useState` + `useEffect` + `localStorage`)
- Rutas dinámicas `/recetas/[slug]` y `/categorias/[slug]`
- Row Level Security (RLS) configurado para lectura pública
- Estados de carga y error (`loading.tsx`, `error.tsx`, `not-found.tsx`)
- Diseño responsive con Tailwind CSS

## Instalación local

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Ronii08/recetas-app.git
   cd recetas-app
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea tu archivo de variables de entorno a partir del ejemplo y completa los valores:

   ```bash
   cp .env.example .env.local
   ```

4. Corre el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Crea un archivo `.env.local` (nunca lo subas a GitHub) con:

```bash
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
```

Estos valores se obtienen desde el dashboard de Supabase, en **Settings > API**. El archivo `.env.example` documenta las variables necesarias.

## Estructura de datos

Tabla `recetas` en Supabase con columnas: `id`, `titulo`, `slug`, `descripcion`, `ingredientes`, `categoria`, `categoria_slug`, `tiempo_preparacion`, `imagen_url`, `created_at`. RLS habilitado con política de lectura pública (`SELECT`).

## Despliegue en AWS Amplify

1. En la consola de AWS, abrir **AWS Amplify** y elegir **Create new app → GitHub**.
2. Autorizar el acceso al repositorio y seleccionar la rama `main`.
3. Confirmar que Amplify detecta Next.js y el comando de build `npm run build`.
4. En **Environment variables**, agregar `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` con los mismos valores de `.env.local`, **antes** del primer build.
5. Guardar y desplegar. Cada `git push` a `main` vuelve a desplegar automáticamente.

## Proceso de desarrollo con IA

El registro de prompts, iteraciones, decisiones técnicas y desafíos está en [VIBE_CODING.md](./VIBE_CODING.md).
