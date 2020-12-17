import React, { FC, useEffect, useState } from 'react';
import { Text } from 'react-native';
import User from '../../models/user';
import { checkUser, signout, createAccount, signin } from '../../services/localdb'
import { Button, Container, FormBox, Input, SwitchButton } from './styles';

const Account: FC<any> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(false);
    const [userLogged, setUserLogged] = useState<User | null>(null);

    const storeUser = async () => {
        const created = await createAccount(email, password);

        if (created) {
            setNewAccount(false);
            setPassword('');
            setEmail('');
        }
    }

    const auth = async () => {
        const user = await signin(email, password);

        if (user) {
            setUserLogged(user);
            setPassword('');
            setEmail('');
        }
    }

    const logout = async () => {
        await signout();
        setUserLogged(null);
    }

    useEffect(() => {
        const check = async () => {
            const user = await checkUser();

            if (user) {
                setUserLogged(user);
            }
        }

        check();
    }, [])

    if (userLogged) {
        return (
            <Container>
                <Text style={{ fontSize: 18, color: 'white' }}>Welcome, { userLogged.email }</Text>
                <Button
                    style={{ width: 300, marginTop: 16 }}
                    onPress={() => navigation.navigate('WatchList')}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        MY WATCH LIST
                    </Text>
                </Button>
                <Button
                    style={{ width: 300, marginTop: 8 }}
                    onPress={logout}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        SIGN OUT
                    </Text>
                </Button>
            </Container>
        );
    }

    return (
        <Container>
            <Text style={{ fontSize: 18, color: 'white' }}>Welcome to the Movie Database!</Text>
            <FormBox>
                <Text style={{ color: 'white', marginBottom: 8 }}>Email</Text>
                <Input
                    keyboardType={'email-address'}
                    placeholder={'Email'}
                    placeholderTextColor={'gray'}
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Text style={{ color: 'white', marginBottom: 8 }}>Password</Text>
                <Input
                    placeholder={'Password'}
                    placeholderTextColor={'gray'}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <Button onPress={() => newAccount ? storeUser() : auth()}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        {newAccount ? 'CREATE ACCOUNT' : 'SIGN IN'}
                    </Text>
                </Button>
                <SwitchButton onPress={() => setNewAccount(!newAccount)}>
                    <Text style={{ color: 'white', fontWeight: 'bold', textDecorationLine: 'underline' }}>
                        {newAccount ? 'Already user? Sign In!' : 'Not an user? Create!'}
                    </Text>
                </SwitchButton>
            </FormBox>
        </Container>
    );
}

export default Account;