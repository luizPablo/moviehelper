import React, { FC, useState, useEffect } from 'react';
import { ScrollView, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import constants from '../../services/constants';
import {
    Actor,
    ActorContainer,
    Container,
    Genre,
    ImageBackground,
    MovieTitle,
    Poster
} from './styles';
import { useFetchActors, useFetchMovie } from '../../services/moviedb';
import { checkUser, toggleWatchList } from '../../services/localdb';
import User from '../../models/user';
import Icon from 'react-native-vector-icons/Feather';

const Movie: FC<any> = ({ route }) => {
    const [userLogged, setUserLogged] = useState<User | null>(null);
    const [onWatchList, setOnWatchList] = useState<Boolean>(false);
    const movie = route.params.movie;

    const { movieDetail, error } = useFetchMovie('/movie/' + movie.id);
    const { actors, actors_error} = useFetchActors('/movie/' + movie.id + '/credits');

    useEffect(() => {
        const check = async () => {
            const user = await checkUser();

            if (user) {
                if (user.watchlist) {
                    if(user.watchlist.filter(el => el.id === movie.id).length > 0) {
                        setOnWatchList(true);
                    }
                }
                setUserLogged(user);
            }
        }

        check();
    }, []);

    const toggleMovie = async () => {
        const onWatchList = await toggleWatchList(movie);

        setOnWatchList(onWatchList);
    }

    if (error || actors_error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222', width: '100%' }}>
                <MovieTitle>Something wrong! :(</MovieTitle>
            </View>
        );
    }

    if (!movieDetail || !actors) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222', width: '100%' }}>
                <ActivityIndicator size={'small'} color={'tomato'} />
            </View>
        );
    }

    return (
        <Container>
            <ImageBackground
                source={{ uri: constants.MOVIE_DB_IMAGE_URL + '/w1280' + movieDetail.backdrop_path }}
                blurRadius={2}
            >
                <ScrollView style={{ width: '100%', backgroundColor: '#000A' }} contentContainerStyle={{ padding: 16 }}>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Poster source={{ uri: constants.MOVIE_DB_IMAGE_URL + '/w500' + movieDetail.poster_path }} />
                            <View style={{ alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={{ color: 'white' }}>Runtime: {movieDetail.runtime} min</Text>
                                    <Text style={{ color: 'white' }}>Release: {movieDetail.release_date}</Text>
                                    <Text style={{ color: 'tomato', fontWeight: 'bold', fontSize: 18 }}>Rate: {movieDetail.vote_average}</Text>
                                </View>
                                {userLogged &&
                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={toggleMovie}>
                                        <Text style={{ marginRight: 8, color: 'white' }}>On my watch list?</Text>
                                        <Icon name={onWatchList ? 'thumbs-up' : 'thumbs-down'} color={'tomato'} size={14} />
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                        <MovieTitle >{movieDetail.title}</MovieTitle>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {movieDetail.genres.map((genre, index) => (
                            <Genre key={index.toString()}>{genre.name}</Genre>
                        ))}
                    </View>
                    <View style={{ marginTop: 16 }}>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'normal' }}>{movieDetail.overview}</Text>
                    </View>
                    <MovieTitle >Actors</MovieTitle>
                    {
                        actors.map((actor, index) => (
                            <ActorContainer key={index.toString()}>
                                <Actor source={{ uri: constants.MOVIE_DB_IMAGE_URL + '/w500' + actor.profile_path }} />
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={{ color: 'white' }}>{actor.name}</Text>
                                    <Text style={{ color: 'white', fontSize: 8 }}>as {actor.character}</Text>
                                </View>

                            </ActorContainer>
                        ))
                    }
                </ScrollView>
            </ImageBackground>
        </Container>
    )
}

export default Movie;