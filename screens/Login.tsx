/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  Button,
} from 'react-native';
import ILoggedUser from '../interfaces/ILoggedUser';
import ILoginRequest from '../interfaces/ILoginRequest';

import {post} from '../utils/Request';

function Login({navigation}): JSX.Element {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const onPressLogin = async () => {
    console.log('chamando login');
    const loggedUser = await post<ILoginRequest, ILoggedUser>(
      '/storeProducts/login',
      {
        email: email,
        password: password,
      },
    );

    console.log('voltou');
    console.log(loggedUser);
  //  navigation.navigate('ProductList', {loggedUser});
  navigation.navigate('ProductFavorites', {loggedUser});
  };

  const onPressSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          placeholder="E-mail"
          value={email}
          type="email"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          placeholder="Senha"
          secureTextEntry={true}
          value={password}
        />
        <View style={{flexDirection: 'row'}}>
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
