# Ayan Malik Portfolio

Personal portfolio website built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

The site showcases selected client projects with a bold visual style, animated hero section, project gallery, contact links, and footer profile links.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Framer Motion
- Lucide React / React Icons

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview production build:

```bash
npm run preview
```

## Available Scripts

- npm run dev: start Vite in development mode
- npm run build: type-check and build production assets
- npm run lint: run ESLint
- npm run preview: preview the built app

## Project Structure

- src/App.tsx: page composition (Hero, Projects, Contact, Footer)
- src/components/Hero.tsx: animated headline and call-to-action
- src/components/Projects.tsx: project grid and detail modal trigger
- src/components/WorkDetailModal.tsx: project detail display
- src/components/Contact.tsx: contact/social links
- src/components/Footer.tsx: footer links and copyright
- src/projectData.json: project metadata used by the projects section
- public/Potfolio: project image assets grouped by project folder

## Update Project Data

Project assets are stored in public/Potfolio.

To regenerate src/projectData.json from folder contents:

```bash
node getProjects.cjs
```

This scans each project folder, collects images, and writes updated project entries.

## Metadata

SEO and social metadata are configured in index.html.

Current branding is set to Ayan Malik across:

- title
- description
- author
- Open Graph tags
- Twitter tags

## Deployment

This project is ready to deploy on static hosting providers such as:

- Vercel
- Netlify
- GitHub Pages (with appropriate Vite base path configuration)
