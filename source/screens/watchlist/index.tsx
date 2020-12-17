import React, { FC, useEffect, useState } from 'react';
import { Container } from './styles';
import MovieList from '../../components/movielist/movielist';
import Movie from '../../models/movie';
import { getWatchList } from '../../services/localdb';
import { ActivityIndicator, View } from 'react-native';


const WathcList: FC<any> = ({ navigation }) => {
    const [movies, setMovies] = useState<Array<Movie>>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mount = true;

        const getMovies = async () => {
            const watchlist = await getWatchList();

            if (watchlist.length > 0 && mount) {
                setMovies(watchlist);
            }
            setLoading(false);
        };

        getMovies();

        return () => {
            mount = false;
        }
    }, [])

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222', width: '100%' }}>
                <ActivityIndicator size={'small'} color={'tomato'} />
            </View>
        );
    }

    return (
        <Container>
            <MovieList first_movies={movies} nav={navigation} watchlist={true} />
        </Container>
    )
}

export default WathcList;