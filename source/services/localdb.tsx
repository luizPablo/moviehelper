import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import constants from './constants';
import User from '../models/user';
import Movie from '../models/movie';

export const checkUser = async (): Promise<User | null> => {
    const user = await AsyncStorage.getItem(constants.DB_USER);

    if (user) {
        return JSON.parse(user);
    }

    return null;
}

export const createAccount = async (email: string, password: string): Promise<Boolean> => {
    const stringUsers = await AsyncStorage.getItem(constants.DB_USERS);
    let users;

    if (stringUsers) {
        users = JSON.parse(stringUsers);
    }

    if (users) {
        users.push({
            email,
            password,
        })
    } else {
        users = [{
            email,
            password,
        }]
    }

    await AsyncStorage.setItem(constants.DB_USERS, JSON.stringify(users));
    Alert.alert('Success! You can now sign in');
    return true;
}

export const signin = async (email: string, password: string): Promise<User | null> => {
    const stringUsers = await AsyncStorage.getItem(constants.DB_USERS);
    let users = [];

    if (stringUsers) {
        users = JSON.parse(stringUsers);
    }

    if (email.length === 0 || password.length === 0) {
        Alert.alert('All fields are required!');
        return null;
    }

    if (!users) {
        Alert.alert('User not found!');
        return null;
    }

    const foundUser = users.filter((el: User) => el.email === email && el.password === password);
    if (foundUser.length > 0) {
        await AsyncStorage.setItem(constants.DB_USER, JSON.stringify(foundUser[0]));
        return foundUser[0];
    } else {
        Alert.alert('Incorrect email or password!');
        return null;
    }
}

export const signout = async (): Promise<Boolean> => {
    await AsyncStorage.removeItem(constants.DB_USER);
    return true;
}

export const toggleWatchList = async (movie: Movie): Promise<Boolean> => {
    const user = await AsyncStorage.getItem(constants.DB_USER);

    if (user) {
        const objectUser: User = JSON.parse(user);

        const watchList = objectUser.watchlist;
        if (watchList.length > 0) {
            const hasMovie = watchList.filter((el: Movie) => el.id === movie.id);
            const listWithoutMovie = watchList.filter((el: Movie) => el.id !== movie.id);

            if (hasMovie.length > 0) {
                objectUser.watchlist = listWithoutMovie;
                await AsyncStorage.setItem(constants.DB_USER, JSON.stringify(objectUser));
                return false;
            } else {
                objectUser.watchlist.push(movie);
                await AsyncStorage.setItem(constants.DB_USER, JSON.stringify(objectUser));
                return true;
            }
        } else {
            objectUser.watchlist = [movie];
        }

        await AsyncStorage.setItem(constants.DB_USER, JSON.stringify(objectUser));
        return true;
    }

    return false;
}

export const getWatchList = async (): Promise<Array<Movie>> => {
    const user = await AsyncStorage.getItem(constants.DB_USER);

    if (user) {
        const objectUser: User = JSON.parse(user);
    
        if (objectUser.watchlist) {
            return objectUser.watchlist;
        }

        return [];
    }

    return [];
}