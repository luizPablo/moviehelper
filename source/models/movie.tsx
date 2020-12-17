interface Genre {
    name: string;
}

export default interface Movie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    vote_average: Number;
    title: string;
    overview: string;
    runtime: number;
    release_date: string;
    genres: Genre[];
}