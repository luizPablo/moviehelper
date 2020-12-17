import Movie from "./movie";

export default interface User {
    email: string;
    password: string;
    watchlist: Movie[];
}