import React, { FC, useMemo, useState, useEffect } from 'react';
import {
    TouchableOpacity,
    ActivityIndicator,
    View,
} from 'react-native';
import {
    Container,
    SearchBar,
    SearchInput,
    Title
} from './styles';
import MovieList from '../../components/movielist/movielist';
import Icon from 'react-native-vector-icons/Feather';
import { useFetchMovies, useSearchMovies } from '../../services/moviedb';

const Home: FC<any> = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [activeSearch, setActiveSearch] = useState(false);

    const { data, error } = useFetchMovies('/movie/popular');
    const { searchResult, searchError } = useSearchMovies('/search/movie?page=1&include_adult=false&query=' + searchText, activeSearch);

    useEffect(() => {
        let mount = true;

        if (searchText === '' && mount) {
            setActiveSearch(false);
        }

        return () => {
            mount = false;
        }
    }, [searchText]);

    const searchMovies = () => {
        setActiveSearch(true);
    }

    const show_list = useMemo(() => {
        if (error) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222', width: '100%' }}>
                    <Title>Something wrong! :(</Title>
                </View>
            );
        }

        if (!data) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222', width: '100%' }}>
                    <ActivityIndicator size={'small'} color={'tomato'} />
                </View>
            );
        }

        return <MovieList first_movies={data} nav={navigation} search_text={searchText} />

    }, [data, error]);

    const search_result = useMemo(() => {
        if (searchError) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222', width: '100%' }}>
                    <Title>Something wrong! :(</Title>
                </View>
            );
        }

        if (!searchResult) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222', width: '100%' }}>
                    <ActivityIndicator size={'small'} color={'tomato'} />
                </View>
            );
        }

        return <MovieList first_movies={searchResult} nav={navigation} search_text={searchText} />

    }, [searchResult, searchError]);

    return (
        <Container>
            <SearchBar>
                <SearchInput
                    placeholder={'Search...'}
                    placeholderTextColor={'#222'}
                    value={searchText}
                    onChangeText={text => setSearchText(text)}
                />
                <TouchableOpacity onPress={searchMovies}>
                    <Icon name={'search'} size={18} color={'#fff'} />
                </TouchableOpacity>
            </SearchBar>
            <Title>Popular Movies</Title>
            {!activeSearch && show_list}
            {activeSearch && search_result}
        </Container>
    )
}

export default Home;