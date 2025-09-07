export interface ITheme {
  title: string;
  icon: IconType;
}

export interface INavLink extends ITheme {
  path: string;
}

export interface IMovie {
  id: string;
  poster_path: string;
  original_title: string;
  name: string;
  overview: string;
  backdrop_path: string
}

export interface IWatchlistItem {
  id: string;
  category: 'movie' | 'tv';
  title?: string;
  name?: string;
  poster_path: string;
  overview: string;
  dateAdded: string;
}

