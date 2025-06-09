// __tests__/ClientsScreen.test.tsx

// ✅ Mock do AsyncStorage (resolve erro: NativeModule: AsyncStorage is null)
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

import React from 'react';
import { render, waitFor, screen } from '@testing-library/react-native';

import * as clientService from '@services/clientStorage';
import { Client } from '@models/Client';
import { UserProvider } from '@context/UserContext';
import { ClientProvider } from '@context/ClientContext';

// ✅ Mock do BottomSheet
jest.mock('@gorhom/bottom-sheet', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: React.forwardRef((props, ref) => {
      return <>{props.children}</>;
    }),
    BottomSheetFlatList: (props) => <>{props.children}</>,
    BottomSheetView: (props) => <>{props.children}</>,
  };
});

import ClientsScreen from './index';

// ✅ Clientes mockados para teste
const mockClients: Client[] = [
  {
    id: '1',
    name: 'Cliente A',
    salary: 1000,
    companyValuation: 5000,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: '2',
    name: 'Cliente B',
    salary: 2000,
    companyValuation: 7000,
    createdAt: '',
    updatedAt: '',
  },
];

describe('ClientsScreen', () => {
  describe('Teste com mock da API', () => {
    beforeAll(() => {
      jest.spyOn(clientService, 'getClientsFromApi').mockResolvedValue({
        clients: mockClients,
        totalPages: 1,
        totalClients: 2,
      });
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('deve carregar e exibir os clientes da API mockada', async () => {
      render(
        <UserProvider>
          <ClientProvider>
            <ClientsScreen />
          </ClientProvider>
        </UserProvider>
      );

      for (const client of mockClients) {
        await waitFor(() => {
          expect(screen.getByText(client.name)).toBeTruthy();
          console.log('Cliente mock carregado:', client);
        });
      }
    });
  });

  describe('Teste de integração com API real', () => {
    it('deve chamar a API real e imprimir o resultado', async () => {
      const page = 1;
      const limit = 10;

      const response = await clientService.getClientsFromApi(page, limit);

      console.log('Resposta da API real:', response);

      expect(response.clients.length).toBeGreaterThan(0);
    });
  });
});
