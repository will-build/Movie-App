# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- `npm install` - Install dependencies
- `npm run dev` - Start development server (runs on http://localhost:5173/)
- `npm run build` - Build for production (runs TypeScript compiler + Vite build)
- `npm run preview` - Preview production build

### Environment Setup
Create a `.env` file in the root with:
```
VITE_API_KEY=<tmdb-api-key>
VITE_TMDB_API_BASE_URL=https://api.themoviedb.org/3
```

Optional variables for monetization:
- `VITE_GA_MEASUREMENT_ID` - Google Analytics
- `VITE_GOOGLE_AD_CLIENT` - AdSense client ID
- `VITE_GOOGLE_AD_SLOT` - AdSense slot ID

## Architecture Overview

### Core Tech Stack
- **React 18** with TypeScript and Vite
- **Redux Toolkit Query** for API data fetching and caching
- **React Context** for global UI state (theme, modal state)
- **React Router DOM** for routing
- **Framer Motion** for animations with accessibility considerations
- **Tailwind CSS** with custom configuration

### Key Architecture Patterns

#### API Integration
- Uses Redux Toolkit Query (`src/services/TMDB.ts`) for all TMDB API calls
- Two main endpoints: `getShows` (lists) and `getShow` (individual details)
- API responses are cached automatically by RTK Query

#### State Management
- **Global State**: Two React Context providers
  - `ThemeContext` - handles light/dark mode with localStorage persistence
  - `GlobalContext` - manages video modal state and trailer fetching
- **Server State**: Redux Toolkit Query handles all API data and caching

#### Component Organization
- `src/common/` - Reusable components (Header, Footer, MovieCard, etc.)
- `src/pages/` - Route-level components (Home, Detail, Catalog, NotFound)
- Each page has its own `components/` folder for page-specific components
- Components use barrel exports (`index.ts` files) for clean imports

#### Styling System
- **Tailwind Config**: Custom breakpoints (`xs: 380px`), colors, fonts
- **Style Utilities**: `src/styles/index.ts` contains reusable Tailwind class strings
- **Responsive Design**: Mobile-first approach with custom breakpoint system
- **Theme Support**: Uses Tailwind's dark mode with class-based switching

#### Animation Patterns
- **Accessibility First**: `useMotion` hook disables animations for users with reduced motion preference
- **Performance**: Animations disabled on mobile screens to improve performance
- **Common Variants**: Pre-built variants for fadeDown, fadeUp, slideIn, zoomIn, staggerContainer

#### TypeScript Patterns
- **Path Aliases**: `@/*` maps to `src/*` for clean imports
- **Interface Definitions**: `src/types.d.ts` contains shared interfaces
- **API Types**: Interfaces for TMDB responses (IMovie, etc.)

## Key Implementation Details

### TMDB API Integration
The app fetches data from The Movie Database API with these patterns:
- Movie lists: `/movie/popular`, `/movie/top_rated`
- TV lists: `/tv/popular`, `/tv/top_rated`  
- Search: `/search/movie` or `/search/tv`
- Details: `/movie/{id}` or `/tv/{id}` with `append_to_response=videos,credits`
- Similar content: `/movie/{id}/similar` or `/tv/{id}/similar`

### Routing Structure
- `/` - Home page with hero section and movie/TV sections
- `/movie` - Movie catalog with pagination and search
- `/tv` - TV series catalog with pagination and search
- `/movie/{id}` - Individual movie details
- `/tv/{id}` - Individual TV series details

### Component Patterns
- **MovieCard**: Displays movie poster with hover effects and YouTube play overlay
- **Hero**: Swiper carousel of popular movies with background images
- **Section**: Generic component for movie/TV show lists with horizontal scrolling
- **VideoModal**: YouTube embed modal triggered by trailer buttons

### Performance Considerations
- **Lazy Loading**: Route components are lazy-loaded with React.lazy
- **Image Optimization**: Uses react-lazy-load-image-component
- **Animation Optimization**: Motion disabled on mobile and for accessibility
- **API Caching**: RTK Query provides automatic caching and deduplication

### Error Handling
- Uses `console.error()` for logging errors
- Error boundaries implemented with Error component
- Loading states handled with Loader component throughout the app

### Development Workflow
- ESLint integration via vite-plugin-eslint
- TypeScript strict mode enabled
- Hot module replacement via Vite
- Auto-imports configured for React and common utilities

## Development Best Practices

### Testing Strategy
- Test each component incrementally as you build
- Verify responsive behavior across breakpoints (xs: 380px, sm, md, lg, xl)
- Test both light and dark theme modes for any UI changes
- Validate API integrations work with real TMDB data
- Check animations respect `prefers-reduced-motion` accessibility setting

### Code Quality Standards
- **Follow Existing Patterns**: Study similar components before creating new ones
- **TypeScript**: All new code must be properly typed, extend existing interfaces in `src/types.d.ts`
- **Styling**: Use existing Tailwind utilities from `src/styles/index.ts` when possible
- **Imports**: Use `@/*` path aliases and barrel exports (`index.ts`) for clean imports
- **Error Handling**: Use consistent error patterns with `console.error()` and Error component
- **Performance**: Lazy load components and images, use React.memo for expensive renders

### Component Development Guidelines
- Place reusable components in `src/common/`
- Page-specific components go in `src/pages/{PageName}/components/`
- Follow the barrel export pattern with `index.ts` files
- Use the `useMotion` hook for all animations to ensure accessibility
- Implement proper loading and error states for data-dependent components

### Git Commit Standards
- Use descriptive commit messages that explain the "why" not just the "what"
- Format: `type(scope): description` (e.g., `feat(watchlist): add heart icon toggle`)
- Common types: `feat`, `fix`, `refactor`, `style`, `test`, `chore`
- Include breaking changes in commit body when applicable
- Test the build (`npm run build`) before committing

### API Integration Patterns
- Always use Redux Toolkit Query endpoints in `src/services/TMDB.ts`
- Handle loading, error, and success states consistently
- Cache responses appropriately using RTK Query's built-in caching
- Follow existing query parameter patterns for consistency
- Never hardcode API keys - always use environment variables

### Accessibility Requirements
- Respect `prefers-reduced-motion` using the `useMotion` hook
- Maintain proper color contrast in both light and dark themes
- Ensure keyboard navigation works for interactive elements
- Use semantic HTML elements and proper ARIA labels
- Test with screen readers when adding complex interactions