import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Client } from '@models/Client';

interface ClientContextType {
  selectedClients: Client[];
  saveSelectedClients: (clients: Client[]) => void;
  clearSelectedClients: () => void;
  toggleClientSelection: (client: Client) => void;
  isClientSelected: (clientId: string) => boolean;
  removeClient: (clientId: string) => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

const SELECTED_CLIENTS_STORAGE_KEY = '@selected_clients';

export const ClientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedClients, setSelectedClients] = useState<Client[]>([]);

  // Salvar array no AsyncStorage
  const persistSelectedClients = async (clients: Client[]) => {
    try {
      await AsyncStorage.setItem(SELECTED_CLIENTS_STORAGE_KEY, JSON.stringify(clients));
    } catch (error) {
      console.error('Erro ao salvar clientes no AsyncStorage:', error);
    }
  };

  // Carregar do AsyncStorage no mount
  useEffect(() => {
    const loadSelectedClients = async () => {
      try {
        const storedClients = await AsyncStorage.getItem(SELECTED_CLIENTS_STORAGE_KEY);
        if (storedClients) {
          setSelectedClients(JSON.parse(storedClients));
        }
      } catch (error) {
        console.error('Erro ao carregar clientes do AsyncStorage:', error);
      }
    };

    loadSelectedClients();
  }, []);

  const saveSelectedClients = (clients: Client[]) => {
    setSelectedClients(clients);
    persistSelectedClients(clients);
  };

  const clearSelectedClients = () => {
    setSelectedClients([]);
    persistSelectedClients([]);
  };

  const removeClient = (clientId: string) => {
    setSelectedClients(prev => {
      const filtered = prev.filter(c => c.id !== clientId);
      persistSelectedClients(filtered);
      return filtered;
    });
  };

  const toggleClientSelection = (client: Client) => {
    setSelectedClients(prev => {
      const exists = prev.some(c => c.id === client.id);
      const updated = exists ? prev.filter(c => c.id !== client.id) : [...prev, client];
      persistSelectedClients(updated);
      return updated;
    });
  };

  const isClientSelected = (clientId: string) => {
    return selectedClients.some(c => c.id === clientId);
  };

  return (
    <ClientContext.Provider
      value={{
        selectedClients,
        saveSelectedClients,
        clearSelectedClients,
        toggleClientSelection,
        isClientSelected,
        removeClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClients = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClients must be used within a ClientProvider');
  }
  return context;
};
