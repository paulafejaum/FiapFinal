/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  TextInput,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import ISignUpRequest from '../interfaces/ISignUpResquest';

import {put} from '../utils/Request';

function SignUp({navigation}): JSX.Element {
  const [userName, onChangeUserName] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [cellphoneNumber, onChangeCellphoneNumber] = React.useState('');

  const onPressSignUp = async () => {
    console.log('chamando put');
    try {
      await put<ISignUpRequest>('/storeProducts/signup', {
        name: userName,
        email: email,
        phone: cellphoneNumber,
        password: password,
      });
      Alert.alert('Usuário cadastrado com sucesso');
      navigation.goBack();
    } catch (e) {
      console.log(e);
      Alert.alert('Erro');
    }
  };

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
          value={email}
          type="email"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeCellphoneNumber}
          placeholder="Telefone"
          value={cellphoneNumber}
          type="tel"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          placeholder="Senha"
          secureTextEntry={true}
          value={password}
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
