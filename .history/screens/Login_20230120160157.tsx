/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TextInput,
    useColorScheme,
    View,
    Button,
} from 'react-native';



function Login({ navigation }): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const [userName, onChangeUserName] = React.useState('');
    const [passWord, onChangePassword] = React.useState('');

    onPressLogin = () => {

    }

    onPressSignUp = () => {
        navigation.navigate('SignUp');
    }

    return (
        <SafeAreaView>
            <StatusBar />
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeUserName}
                    placeholder="Usuário"
                    value={userName}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangePassword}
                    placeholder="Senha"
                    secureTextEntry={true}
                    value={passWord}
                />
                <View style={{ flexDirection: "row" }}>
                    <Button
                        onPress={onPressLogin}
                        title="Entrar"
                        accessibilityLabel="Entrar"
                    />
                    <Button
                        onPress={onPressSignUp}
                        title="Cadastrar"
                        accessibilityLabel="Cadastrar"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default Login;
