import React, { FC, useState } from 'react';
import {
    TouchableWithoutFeedback,
    Text,
    FlatList,
    View,
    ActivityIndicator,
    Alert,
} from 'react-native';
import constants from '../../services/constants';
import {
    ImageBackground,
    MovieRate,
    MovieDescription,
    RemoveButton,
} from './styles';
import { useFetchMovies } from '../../services/moviedb';
import Movie from '../../models/movie';
import { toggleWatchList } from '../../services/localdb';

export interface Props {
    first_movies: Movie[]
    nav: any;
    search_text?: string;
    watchlist?: boolean;
}

const MovieList: FC<Props> = ({ first_movies, nav, search_text = '', watchlist = false }) => {
    const [movies, setMovies] = useState(first_movies);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    let url: string = '/movie/popular?page=' + (page + 1);

    if (search_text !== '') {
        url = `/search/movie?page=${(page + 1)}&include_adult=false&query=${search_text}`
    }

    const { data, error } = useFetchMovies(url, !watchlist);

    if (error && loading) {
        setLoading(false);
        Alert.alert('Something wrong! :(');
    }

    if (data && loading) {
        setMovies([...movies, ...data]);
        setPage(page + 1);
        setTimeout(() => {
            setLoading(false);
        }, 500)
    }

    const removeMovie = (movie: Movie) => {
        toggleWatchList(movie);

        const newMovies = movies.filter(el => el.id !== movie.id);
        setMovies(newMovies);
    }

    return (
        <>
            {movies.length === 0 && watchlist &&
                <Text style={{ color: 'white', fontSize: 18 }}>Your watch list is empty!</Text>
            }
            <FlatList
                style={{ width: '100%' }}
                showsVerticalScrollIndicator={false}
                data={movies}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.1}
                onEndReached={() => !watchlist ? setLoading(true) : null}
                renderItem={({ item, index }) => (
                    <>
                        {watchlist &&
                            <RemoveButton onPress={() => removeMovie(item)}>
                                <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>Remove from Watch List</Text>
                            </RemoveButton>
                        }
                        <TouchableWithoutFeedback
                            key={index.toString()}
                            style={{ elevation: 10 }}
                            onPress={() => nav.navigate('Movie', { movie: item })}
                        >
                            <ImageBackground
                                source={{ uri: constants.MOVIE_DB_IMAGE_URL + '/w780' + item.backdrop_path }}
                                style={{ marginBottom: watchlist ? 48 : 0 }}
                                imageStyle={{ borderRadius: 10 }}
                            >
                                <MovieRate >
                                    <Text style={{ color: '#fff', fontSize: 8 }}>Rate</Text>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'tomato' }}>{item.vote_average}</Text>
                                </MovieRate>
                                <MovieDescription>
                                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>{item.title}</Text>
                                    <Text style={{ color: '#fff', fontWeight: '100', fontSize: 8 }}>
                                        {item.overview.substring(0, 100) + '...'}
                                    </Text>
                                </MovieDescription>
                            </ImageBackground>
                        </TouchableWithoutFeedback>
                    </>
                )}
            />
            {loading &&
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    padding: 8,
                }}>
                    <ActivityIndicator size={'small'} color={'tomato'} />
                </View>
            }
        </>
    )
}

export default MovieList;