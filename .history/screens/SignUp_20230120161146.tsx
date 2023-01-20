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
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
    title: string;
}>;

function Section({ children, title }: SectionProps): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.sectionContainer}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: isDarkMode ? Colors.white : Colors.black,
                    },
                ]}>
                {title}
            </Text>
            <Text
                style={[
                    styles.sectionDescription,
                    {
                        color: isDarkMode ? Colors.light : Colors.dark,
                    },
                ]}>
                {children}
            </Text>
        </View>
    );
}

function SignUp({ navigation }): JSX.Element {
    const [userName, onChangeUserName] = React.useState('');
    const [passWord, onChangePassword] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [cellphoneNumber, onChangeCellphoneNumber] = React.useState('');

    const onPressSignUp = () => {
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
                    onChangeText={onChangeEmail}
                    placeholder="E-mail"
                    secureTextEntry={true}
                    value={email}
                    type="email"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeCellphoneNumber}
                    placeholder="Telefone"
                    secureTextEntry={true}
                    value={cellphoneNumber}
                    type="tel"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangePassword}
                    placeholder="Senha"
                    secureTextEntry={true}
                    value={passWord}
                />

                <Button
                    onPress={onPressSignUp}
                    title="Cadastrar"
                    accessibilityLabel="Cadastrar"
                />
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


export default SignUp;
