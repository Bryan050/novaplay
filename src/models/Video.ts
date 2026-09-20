export interface Video {
    id?: number;
    title: string;
    views: string;
    duration?: string;
    url_image?: string;
    origin?: string;
    url_path?: string;
    url_video?: string;
    likes?: string;
    overview?: string;
    backdrop_path?: string;
    release_date?: string;
    vote_average?: number;
    vote_count?: number;
}

export interface VideoDetails {
    video: Video,
    related: Video[]
}

export interface FeaturedVideos {
    videos: Video[],
    pagination: {
        pageCount: number
    }
}
