# Cosmic CMS Website Clone

![App Preview](https://imgix.cosmicjs.com/3e351630-c4d5-11f0-885f-6dd039c126d9-photo-1460925895917-afdab827c52f-1763508059755.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, fully-featured clone of the Cosmic CMS website built with Next.js 16 and powered by your existing Cosmic content. Features dynamic landing pages, a comprehensive blog with author profiles, and responsive design throughout.

## ✨ Features

- 🎨 Modern, responsive design matching Cosmic's branding
- 📝 Full-featured blog with rich HTML content rendering
- 👥 Author profiles with social media links
- 🖼️ Optimized images with imgix integration
- 🔍 SEO-optimized with meta tags and Open Graph data
- 📱 Mobile-friendly navigation with hamburger menu
- ⚡ Server-side rendering for optimal performance
- 🎯 Dynamic routing for blog posts and landing pages
- 🏷️ Tag system for content categorization
- ⏱️ Reading time estimates for blog posts

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=691cfed53376bfc6e819ddcd&clone_repository=691d04493376bfc6e819dde6)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a clone of the Cosmic website https://www.cosmicjs.com include blogs and landing pages."

### Code Generation Prompt

> Based on the content model I created for "Create a clone of the Cosmic website https://www.cosmicjs.com include blogs and landing pages.", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless content management
- **Imgix** - Image optimization and delivery

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Cosmic account with your content model set up
- Bun package manager (or npm/yarn)

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file in the root directory:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Run the development server:

```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Blog Posts

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'blog-posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Landing Page

```typescript
const { object: page } = await cosmic.objects
  .findOne({
    type: 'landing-pages',
    slug: 'homepage'
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(0)
```

### Fetching Author with Related Posts

```typescript
const { object: author } = await cosmic.objects
  .findOne({
    type: 'authors',
    slug: authorSlug
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(0)
```

## 🎨 Cosmic CMS Integration

This application uses the following content types from your Cosmic bucket:

- **Landing Pages**: Homepage and feature pages with hero sections
- **Blog Posts**: Articles with rich HTML content, featured images, and metadata
- **Authors**: Author profiles with avatars, bios, and social links

All content is fetched server-side for optimal performance and SEO.

## 🚀 Deployment Options

### Vercel (Recommended for Next.js)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Create a new site in Netlify
3. Configure build settings:
   - Build command: `bun run build`
   - Publish directory: `.next`
4. Add environment variables in Netlify settings
5. Deploy!

### Environment Variables

Make sure to set these in your deployment platform:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key

## 📝 License

MIT License - feel free to use this project as a starting point for your own applications!

<!-- README_END -->