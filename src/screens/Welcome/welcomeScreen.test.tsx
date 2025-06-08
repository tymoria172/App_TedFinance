import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WelcomeScreen from './index';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '@context/UserContext';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('@context/UserContext', () => ({
  useUser: jest.fn(),
}));

describe('WelcomeScreen', () => {
  it('deve salvar o nome no contexto ao clicar no botão', () => {
    const mockSetName = jest.fn().mockImplementation((nome) => {
      console.log('🧪 Nome salvo no contexto:', nome); // <-- Aqui o log
    });
    const mockNavigate = jest.fn();

    (useUser as jest.Mock).mockReturnValue({ setName: mockSetName });
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });

    const { getByPlaceholderText, getByText } = render(<WelcomeScreen />);
    const input = getByPlaceholderText('Digite seu nome');
    const button = getByText('Entrar');

    fireEvent.changeText(input, 'João');
    fireEvent.press(button);

    expect(mockSetName).toHaveBeenCalledWith('João');
  });
});
