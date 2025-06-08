import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '@context/UserContext';
import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';
import { theme } from '@themes/theme';

const WelcomeScreen: React.FC = () => {
  const { setName } = useUser();
  const [inputName, setInputName] = useState('');
  const navigation = useNavigation();

  const handleStart = () => {
    const trimmedName = inputName.trim();
    if (!trimmedName) {
      Alert.alert('Atenção', 'Por favor, digite seu nome');
      return;
    }

    setName(trimmedName); // Armazena no contexto
    navigation.navigate('Clientes' as never); // Navega para a próxima tela
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,0.9)', 'transparent']}
        start={{ x: 0.5, y: 0.80 }}
        end={{ x: 0, y: 3 }}
        style={StyleSheet.absoluteFillObject}
      />

      <>
        <Image
          source={{ uri: 'https://lp.teddydigital.io/wp-content/uploads/2024/01/logo-branco-2048x993-1-1024x497.webp' }}  // ajuste o caminho conforme sua estrutura
          style={{ width: 200, height: 200, marginBottom: 20 }}
          resizeMode="contain"
        />
      </>

      <Text style={styles.title}>Bem-vindo!</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        placeholderTextColor={theme?.colors?.placeholder || '#9E9E9E'}
        value={inputName}
        onChangeText={setInputName}
        autoFocus
        onSubmitEditing={handleStart} // Permite enviar com Enter/Return
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleStart}
        disabled={!inputName.trim()} // Desabilita se estiver vazio
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;