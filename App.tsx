import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { UserProvider } from '@context/UserContext';
import { ClientProvider } from '@context/ClientContext';



export default function App() {
  return (
    <NavigationContainer>
      <ClientProvider>
        <UserProvider>
          <DrawerNavigator />
        </UserProvider>
      </ClientProvider>
    </NavigationContainer>
  );
}
