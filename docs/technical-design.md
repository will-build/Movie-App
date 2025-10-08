# tMovies - Technical Design Specification

## 1. System Architecture Overview

### 1.1 High-Level Architecture
tMovies follows a modern frontend-only architecture with external API integration, designed for optimal performance and maintainability.

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   User Browser  │    │   tMovies App    │    │   TMDB API      │
│                 │◄──►│  (React/Vite)    │◄──►│  (External)     │
│  - UI Rendering │    │  - State Mgmt    │    │  - Movie Data   │
│  - User Input   │    │  - API Calls     │    │  - Search       │
│  - Local Cache  │    │  - Data Cache    │    │  - Details      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### 1.2 Deployment Architecture
```
┌─────────────────────────────────────────────────────────────────┐
│                    GitHub Pages (Static Host)                   │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   Static Assets │  │   React Bundle  │  │   Service Files │ │
│  │   - Images      │  │   - Components  │  │   - manifest    │ │
│  │   - Fonts       │  │   - Styles      │  │   - robots.txt  │ │
│  │   - Icons       │  │   - Logic       │  │   - sitemap     │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## 2. Technology Stack & Rationale

### 2.1 Core Technologies

| Technology | Version | Purpose | Rationale |
|------------|---------|---------|-----------|
| **React** | 18.2.0 | UI Framework | - Mature ecosystem<br>- Excellent TypeScript support<br>- Strong community<br>- Optimal for interactive UIs |
| **TypeScript** | 4.9.3 | Type Safety | - Compile-time error detection<br>- Better IDE support<br>- Enhanced maintainability<br>- Self-documenting code |
| **Vite** | 4.0.0 | Build Tool | - Fast HMR in development<br>- Optimized production builds<br>- Modern ES modules support<br>- Excellent developer experience |

### 2.2 State Management

| Technology | Purpose | Rationale |
|------------|---------|-----------|
| **Redux Toolkit Query** | Server State | - Automated caching<br>- Request deduplication<br>- Background refetching<br>- Optimistic updates |
| **React Context** | Global UI State | - Theme management<br>- Modal state<br>- Simple, built-in solution<br>- No external dependencies |
| **localStorage** | Persistence | - Watchlist data<br>- User preferences<br>- No backend required<br>- Immediate availability |

### 2.3 UI & Styling

| Technology | Purpose | Rationale |
|------------|---------|-----------|
| **Tailwind CSS** | Styling Framework | - Utility-first approach<br>- Consistent design system<br>- Responsive by default<br>- Small bundle size |
| **Framer Motion** | Animations | - Declarative API<br>- Accessibility features<br>- Performance optimizations<br>- Rich animation capabilities |
| **React Icons** | Icon Library | - Comprehensive icon set<br>- Tree-shakeable<br>- Consistent styling<br>- Multiple icon families |

### 2.4 Data Fetching & APIs

| Technology | Purpose | Rationale |
|------------|---------|-----------|
| **TMDB API** | Movie Data | - Comprehensive database<br>- Free tier available<br>- Well-documented<br>- Rich metadata |
| **Fetch API** | HTTP Client | - Native browser support<br>- Promise-based<br>- Lightweight<br>- No external dependencies |

## 3. Application Architecture

### 3.1 Folder Structure
```
src/
├── common/           # Reusable components
│   ├── Header/
│   ├── Footer/
│   ├── MovieCard/
│   ├── Loader/
│   └── index.ts      # Barrel exports
├── pages/            # Route-level components
│   ├── Home/
│   │   ├── components/
│   │   └── index.tsx
│   ├── Catalog/
│   ├── Detail/
│   ├── Watchlist/
│   └── NotFound/
├── services/         # API layer
│   └── TMDB.ts       # RTK Query endpoints
├── context/          # React Context providers
│   ├── themeContext.tsx
│   ├── globalContext.tsx
│   └── watchlistContext.tsx
├── hooks/            # Custom React hooks
│   └── useMotion.ts
├── utils/            # Utility functions
│   ├── config.ts
│   ├── helper.ts
│   └── watchlist.ts
├── styles/           # Style utilities
│   └── index.ts
├── constants/        # App constants
│   └── index.ts
├── types.d.ts        # TypeScript definitions
└── main.tsx          # Application entry
```

### 3.2 Component Architecture

#### 3.2.1 Component Hierarchy
```
App
├── VideoModal (Global)
├── SideBar (Global)
├── Header (Global)
├── Main Content
│   └── Routes
│       ├── Home
│       │   ├── Hero
│       │   └── Section (x4)
│       ├── Catalog
│       │   ├── CatalogHeader
│       │   ├── Search
│       │   └── MovieCard (Grid)
│       ├── Detail
│       │   ├── Poster
│       │   ├── WatchlistButton
│       │   ├── Genre
│       │   ├── Casts
│       │   ├── Videos
│       │   └── Section (Similar)
│       └── Watchlist
│           └── MovieCard (Grid)
└── Footer (Global)
```

#### 3.2.2 Component Design Patterns

**Container/Presentational Pattern**
- **Container Components**: Handle data fetching and state logic
- **Presentational Components**: Focus on UI rendering
- **Example**: `Catalog/index.tsx` (container) + `MovieCard` (presentational)

**Compound Component Pattern**
- **Usage**: Complex components with multiple related parts
- **Example**: `Detail` page with `Poster`, `Casts`, `Videos` subcomponents

**Render Props/Custom Hooks**
- **Usage**: Shared logic across components
- **Example**: `useMotion` hook for animation logic

### 3.3 State Management Architecture

#### 3.3.1 State Categories

| State Type | Technology | Scope | Examples |
|------------|------------|-------|----------|
| **Server State** | RTK Query | Global | Movie data, search results |
| **Global UI State** | React Context | Global | Theme, modal visibility |
| **Local Component State** | useState | Component | Form inputs, UI toggles |
| **Persistent State** | localStorage | Browser | Watchlist, theme preference |

#### 3.3.2 RTK Query Endpoints

```typescript
// Service Definition
export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: TMDB_API_BASE_URL }),
  endpoints: (builder) => ({
    getShows: builder.query({
      query: ({ category, type, page, searchQuery }) => {
        // Dynamic endpoint construction
      },
    }),
    getShow: builder.query({
      query: ({ category, id }) => 
        `${category}/${id}?append_to_response=videos,credits&api_key=${API_KEY}`,
    }),
  }),
});
```

#### 3.3.3 Context Architecture

```typescript
// Theme Context
interface ThemeContextValue {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: ThemeType) => void;
  isDark: boolean;
}

// Watchlist Context
interface WatchlistContextValue {
  watchlist: IWatchlistItem[];
  addItem: (item: IWatchlistItem) => void;
  removeItem: (id: string) => void;
  isInWatchlist: (id: string) => boolean;
}
```

## 4. Data Flow & API Design

### 4.1 Data Flow Patterns

#### 4.1.1 Unidirectional Data Flow
```
TMDB API → RTK Query → Component Props → UI Render
    ↑                      ↓
Cache Layer ←── User Actions (Search, Navigate)
```

#### 4.1.2 Caching Strategy
- **RTK Query Cache**: Automatic caching with stale-while-revalidate
- **Cache Duration**: 
  - List endpoints: 5 minutes
  - Detail endpoints: 30 minutes
  - Search results: 2 minutes
- **Cache Invalidation**: Manual invalidation on user actions

### 4.2 API Integration Patterns

#### 4.2.1 TMDB API Endpoints

| Endpoint | Purpose | Cache Strategy | Error Handling |
|----------|---------|---------------|----------------|
| `/movie/popular` | Homepage content | 5min cache | Retry + fallback UI |
| `/search/movie` | Search functionality | 2min cache | Debounced + loading state |
| `/movie/{id}` | Detail pages | 30min cache | Error boundary |
| `/movie/{id}/similar` | Recommendations | 10min cache | Graceful failure |

#### 4.2.2 Request Lifecycle
```
1. Component Mount/Action Trigger
2. RTK Query Check Cache
3. If Stale/Missing → API Request
4. Loading State → UI Skeleton
5. Success/Error → Component Re-render
6. Cache Update → Background Sync
```

### 4.3 Error Handling Strategy

#### 4.3.1 Error Categories
- **Network Errors**: Offline, timeout, server down
- **API Errors**: Rate limits, invalid requests, data errors
- **Application Errors**: Invalid routes, missing data, UI errors

#### 4.3.2 Error Recovery Mechanisms
```typescript
// RTK Query Error Handling
const { data, error, isLoading, refetch } = useGetShowsQuery(
  { category, type, page },
  {
    retry: (failureCount, error) => {
      return failureCount < 3 && error.status !== 404;
    },
  }
);

// Component Error Boundaries
if (error) {
  return <Error error="Unable to fetch movies!" onRetry={refetch} />;
}
```

## 5. Performance Architecture

### 5.1 Bundle Optimization

#### 5.1.1 Code Splitting Strategy
```typescript
// Route-based splitting
const Home = lazy(() => import("./pages/Home"));
const Catalog = lazy(() => import("./pages/Catalog"));
const Detail = lazy(() => import("./pages/Detail"));

// Feature-based splitting
const VideoModal = lazy(() => import("./components/VideoModal"));
```

#### 5.1.2 Asset Optimization
- **Images**: WebP format with JPEG fallbacks
- **Lazy Loading**: `react-lazy-load-image-component`
- **Bundle Analysis**: Vite bundle analyzer
- **Tree Shaking**: Automatic with Vite

### 5.2 Runtime Performance

#### 5.2.1 React Optimizations
```typescript
// Memoization for expensive operations
const MemoizedMovieCard = React.memo(MovieCard);

// Callback optimization
const handleSearch = useCallback(
  debounce((query: string) => {
    setSearchQuery(query);
  }, 300),
  []
);

// State optimization
const [searchQuery, setSearchQuery] = useState("");
```

#### 5.2.2 Animation Performance
```typescript
// Reduced motion support
const useMotion = () => {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return prefersReducedMotion || isMobile ? null : motionVariants;
};
```

### 5.3 Caching Strategy

#### 5.3.1 Multi-layer Caching
```
Browser Cache → RTK Query Cache → Component State → UI
      ↑              ↑                ↑           ↑
  Long-term     Medium-term     Short-term   Immediate
  (24h+)        (5-30min)       (component)  (render)
```

#### 5.3.2 Cache Configuration
```typescript
// RTK Query Cache
configureStore({
  reducer: {
    tmdbApi: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

// localStorage Cache
const WATCHLIST_KEY = "tmovies_watchlist";
const THEME_KEY = "tmovies_theme";
```

## 6. Security Architecture

### 6.1 API Security

#### 6.1.1 API Key Management
```typescript
// Environment variable usage
const API_KEY = import.meta.env.VITE_API_KEY;
const TMDB_API_BASE_URL = import.meta.env.VITE_TMDB_API_BASE_URL;

// Build-time key injection (safe for client-side)
// Keys are public TMDB read-only tokens
```

#### 6.1.2 Request Security
- **HTTPS Only**: All API requests over HTTPS
- **CORS Handling**: Proper CORS headers from TMDB
- **Rate Limiting**: Built-in RTK Query request deduplication
- **Input Sanitization**: URL encoding for search queries

### 6.2 Client-side Security

#### 6.2.1 XSS Prevention
```typescript
// React built-in protection
return <div>{movie.title}</div>; // Automatically escaped

// Manual sanitization when needed
const sanitizedHTML = DOMPurify.sanitize(htmlContent);
```

#### 6.2.2 Data Validation
```typescript
// TypeScript interfaces for type safety
interface IMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
}

// Runtime validation for external data
const validateMovieData = (data: unknown): data is IMovie => {
  return typeof data === 'object' && data !== null && 'id' in data;
};
```

## 7. Accessibility Architecture

### 7.1 WCAG 2.1 Compliance

#### 7.1.1 Keyboard Navigation
```typescript
// Focus management
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleClick();
  }
};

// Tab order management
<button tabIndex={0} onKeyDown={handleKeyDown}>
  {content}
</button>
```

#### 7.1.2 Screen Reader Support
```typescript
// Semantic HTML
<main role="main">
  <section aria-labelledby="trending-movies">
    <h2 id="trending-movies">Trending Movies</h2>
  </section>
</main>

// ARIA labels
<button 
  aria-label={`Add ${movie.title} to watchlist`}
  aria-pressed={isInWatchlist}
>
  <HeartIcon />
</button>
```

### 7.2 Motion & Animation

#### 7.2.1 Reduced Motion Support
```typescript
const useMotion = () => {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  
  return prefersReducedMotion ? null : {
    fadeIn: { /* animation variants */ },
    slideUp: { /* animation variants */ },
  };
};
```

## 8. Testing Architecture

### 8.1 Testing Strategy

#### 8.1.1 Testing Pyramid
```
    Unit Tests (Components, Hooks, Utils)
         Integration Tests (API, Context)
              E2E Tests (User Flows)
```

#### 8.1.2 Testing Tools (Recommended)
- **Unit Testing**: Vitest + React Testing Library
- **Integration Testing**: MSW (Mock Service Worker)
- **E2E Testing**: Playwright or Cypress
- **Type Testing**: TypeScript compiler

### 8.2 Test Implementation Patterns

#### 8.2.1 Component Testing
```typescript
// Component test example
test('MovieCard displays movie information', () => {
  const mockMovie = {
    id: 1,
    title: 'Test Movie',
    poster_path: '/test.jpg',
  };

  render(<MovieCard movie={mockMovie} category="movie" />);
  
  expect(screen.getByText('Test Movie')).toBeInTheDocument();
  expect(screen.getByRole('img')).toHaveAttribute('alt', 'Test Movie');
});
```

#### 8.2.2 API Testing
```typescript
// Mock API responses
const mockTMDBResponse = {
  results: [
    { id: 1, title: 'Movie 1' },
    { id: 2, title: 'Movie 2' },
  ],
};

// Test with MSW
test('fetches and displays movies', async () => {
  server.use(
    rest.get(`${TMDB_API_BASE_URL}/movie/popular`, (req, res, ctx) => {
      return res(ctx.json(mockTMDBResponse));
    })
  );

  render(<Home />);
  
  await waitFor(() => {
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
  });
});
```

## 9. Deployment Architecture

### 9.1 Build Process

#### 9.1.1 Build Pipeline
```bash
1. Install Dependencies (npm install)
2. Type Check (tsc)
3. Build Assets (vite build)
4. Bundle Analysis (optional)
5. Deploy to GitHub Pages (gh-pages -d dist)
```

#### 9.1.2 Build Optimization
```typescript
// vite.config.ts
export default defineConfig({
  base: '/Movie-App/',  // GitHub Pages path
  build: {
    target: 'es2015',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          api: ['@reduxjs/toolkit'],
          ui: ['framer-motion', 'react-icons'],
        },
      },
    },
  },
});
```

### 9.2 GitHub Pages Configuration

#### 9.2.1 Static Hosting Setup
```html
<!-- Public path configuration -->
<script type="module" crossorigin src="/Movie-App/assets/index-[hash].js"></script>
<link rel="stylesheet" href="/Movie-App/assets/index-[hash].css">
```

#### 9.2.2 Routing Configuration
```typescript
// React Router with basename
<BrowserRouter basename="/Movie-App">
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/:category" element={<Catalog />} />
    <Route path="/:category/:id" element={<Detail />} />
  </Routes>
</BrowserRouter>
```

## 10. Monitoring & Analytics

### 10.1 Performance Monitoring

#### 10.1.1 Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

#### 10.1.2 Custom Metrics
```typescript
// Performance measurement
const measurePageLoad = () => {
  const navigation = performance.getEntriesByType('navigation')[0];
  const loadTime = navigation.loadEventEnd - navigation.fetchStart;
  
  // Send to analytics
  gtag('event', 'page_load_time', {
    event_category: 'Performance',
    event_label: location.pathname,
    value: Math.round(loadTime),
  });
};
```

### 10.2 User Analytics

#### 10.2.1 Google Analytics 4
```typescript
// Event tracking
const trackWatchlistAdd = (movieTitle: string) => {
  gtag('event', 'add_to_watchlist', {
    event_category: 'Engagement',
    event_label: movieTitle,
    value: 1,
  });
};

// Page view tracking
useEffect(() => {
  gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
}, [location]);
```

## 11. Future Technical Considerations

### 11.1 Scalability Improvements
- **Service Worker**: Offline caching strategy
- **CDN Integration**: Static asset delivery
- **Database Layer**: User data persistence
- **Authentication**: User accounts and sync

### 11.2 Performance Enhancements
- **Virtual Scrolling**: Large list optimization
- **Image CDN**: Optimized image delivery
- **Micro-frontends**: Modular architecture
- **SSG/SSR**: Server-side rendering with Next.js

### 11.3 Feature Expansions
- **Real-time Updates**: WebSocket integration
- **Push Notifications**: PWA capabilities
- **Advanced Search**: ElasticSearch integration
- **ML Recommendations**: Personalization engine