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
  Alert,
} from 'react-native';
import ILoggedUser from '../interfaces/ILoggedUser';
import ILoginRequest from '../interfaces/ILoginRequest';
import AuthContext from '../context/AuthProvider';
import {post} from '../utils/Request';

function Login({navigation}): JSX.Element {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [loggedUser, setLoggedUser] = React.useContext(AuthContext);

  const onPressLogin = async () => {
    console.log('chamando login');
    try {
      const loggedUser = await post<ILoginRequest, ILoggedUser>(
        '/storeProducts/login',
        {
          email: email,
          password: password,
        },
      );
      if (loggedUser) {
        setLoggedUser(loggedUser);
      } else {
        Alert.alert('Usuário não encontrado');
      }
    } catch (error) {
      Alert.alert('Usuário não encontrado');
    }
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
