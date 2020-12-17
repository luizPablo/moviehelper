import axios from 'axios';
import constants from './constants';
import useSWR from 'swr';
import Movie from '../models/movie';
import Actor from '../models/actor';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
});

api.interceptors.request.use((config) => {
    config.params = config.params || {};
    config.params['api_key'] = constants.MOVIE_DB_API_KEY;
    return config;
});

export const useFetchMovies = (url: string, data_fetch: boolean = true) => {
    const { data, error } = useSWR(data_fetch ? url : null, async url => {
        const response = await api.get(url);

        return response.data.results;
    });

    return { data, error };
}

export const useSearchMovies = (url: string, data_fetch: boolean = true) => {
    const { data, error } = useSWR(data_fetch ? url : null, async url => {
        const response = await api.get(url);

        return response.data.results;
    });

    const searchResult = data;
    const searchError = error;
    return { searchResult, searchError };
}

export const useFetchMovie = (url: string) => {
    const { data, error } = useSWR(url, async url => {
        const response = await api.get(url);

        return response.data;
    });

    const movieDetail: Movie = data;
    return { movieDetail, error };
}

export const useFetchActors = (url: string) => {
    const { data, error } = useSWR(url, async url => {
        const response = await api.get(url);

        return response.data.cast.slice(0, 15);
    });

    const actors: Actor[] = data;
    const actors_error = error
    return { actors, actors_error };
}

export default api;