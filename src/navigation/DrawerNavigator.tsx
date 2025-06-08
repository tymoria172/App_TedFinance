import React from 'react';
import { Image } from 'react-native'; // Importa Image
import { createDrawerNavigator } from '@react-navigation/drawer';
import WelcomeScreen from '../screens/Welcome';
import ClientsScreen from '../screens/Clients';
import SelectedClientsScreen from '../screens/SelectedClients';
import { theme } from '@themes/theme';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={({ route }) => ({
                headerShown: route.name !== 'Boas-vindas',
                drawerType: 'front',
                swipeEnabled: route.name !== 'Boas-vindas',
                drawerHideStatusBarOnOpen: route.name !== 'Boas-vindas',
                drawerPosition: 'right',

                drawerStyle: {
                    backgroundColor: theme.colors.BaseSecondary,
                    width: 280,
                },
                drawerActiveTintColor: theme.colors.primary,
                drawerInactiveTintColor: theme.colors.placeholder,
                drawerLabelStyle: {
                    fontFamily: theme.fonts.regular,
                    fontSize: theme.fonts.sizes.medium,
                },

                headerStyle: {
                    backgroundColor: theme.colors.BaseSecondary,
                    height: 80,
                },
                headerTitleStyle: {
                    fontFamily: theme.fonts.bold,
                    fontSize: theme.fonts.sizes.large,
                    color: theme.colors.textOnPrimary,
                },
                headerTintColor: theme.colors.textOnPrimary,
                headerTitleAlign: 'center',

                // Coloca o logo no headerLeft (exceto na tela "Boas-vindas")
                headerTitle: route.name !== 'Boas-vindas' ? () => (
                    <Image
                        source={{ uri: 'https://lp.teddydigital.io/wp-content/uploads/2024/01/logo-branco-2048x993-1-1024x497.webp' }}  // ajuste o caminho conforme sua estrutura
                        style={{ width: 80, height: 80, marginLeft: 0 }}
                        resizeMode="contain"
                    />
                ) : undefined,
            })}
        >
            <Drawer.Screen
                name="Boas-vindas"
                component={WelcomeScreen}
                options={{
                    swipeEnabled: false,
                    headerLeft: () => null,
                }}
            />
            <Drawer.Screen
                name="Clientes"
                component={ClientsScreen}

            />
            <Drawer.Screen
                name="Clientes Selecionados"
                component={SelectedClientsScreen}
                options={{
                  
                }}
            />
        </Drawer.Navigator>
    );
}
