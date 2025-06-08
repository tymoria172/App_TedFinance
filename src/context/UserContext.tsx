import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserContextType {
  name: string;
  setName: (name: string) => void;
}

const USER_NAME_STORAGE_KEY = '@user_name';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [name, setNameState] = useState<string>('');

  // Função que atualiza state e grava no AsyncStorage
  const setName = async (newName: string) => {
    setNameState(newName);
    try {
      await AsyncStorage.setItem(USER_NAME_STORAGE_KEY, newName);
    } catch (error) {
      console.error('Erro ao salvar nome no AsyncStorage:', error);
    }
  };

  // No mount, carrega o nome do AsyncStorage para o estado
  useEffect(() => {
    const loadNameFromStorage = async () => {
      try {
        const storedName = await AsyncStorage.getItem(USER_NAME_STORAGE_KEY);
        if (storedName) {
          setNameState(storedName);
        }
      } catch (error) {
        console.error('Erro ao carregar nome do AsyncStorage:', error);
      }
    };

    loadNameFromStorage();
  }, []);

  return (
    <UserContext.Provider value={{ name, setName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
