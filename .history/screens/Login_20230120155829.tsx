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
} from 'react-native';



function Login(): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const [userName, onChangeUserName] = React.useState('');
    const [passWord, onChangePassword] = React.useState('');

    return (
        <SafeAreaView>
            <StatusBar />
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeUserName}
                    placeholder="Usuário"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangePassword}
                    placeholder="Senha"
                    secureTextEntry={true}
                />
                <View style={{ flexDirection: "row" }}>
                    <View />
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
