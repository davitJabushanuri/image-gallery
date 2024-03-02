export interface IPhoto {
  id: string;
  alt_description: string;
  color: string;
  description: string;
  height: number;
  width: number;
  likes: number;
  urls: IUrls;
  create_at: Date;
  views: number;
  downloads: number;
}

interface IUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface IErrorFallback {
  error: Error;
  resetErrorBoundary: () => void;
}
