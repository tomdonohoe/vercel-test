export interface ApiRes {
    name: string;
    description: string;
  }
  
export interface PhotosResponse {
    data: PexelsRes;
    success: boolean;
}

export interface PexelsResSrc {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
}

export interface PexelsRes {
    id: number;
    width: number;
    height: number;
    url: string;
    alt: string;
    photographer: string;
    photographer_url: string;
    photographer_id: number;
    avg_color: string;
    src: PexelsResSrc;
    liked: boolean;
}
