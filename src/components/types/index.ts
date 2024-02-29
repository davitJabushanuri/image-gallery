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
}

interface IUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}
