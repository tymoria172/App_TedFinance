// @themes/theme.ts
export const theme = {
  colors: {
    // Cores principais
    BasePrimary: '#333333',
    BaseSecondary: '#262626',

    primary: '#FF6D00',
    primaryDark: '#E65100',
    primaryLight: '#FFE0B2',
    secondary: '#1A237E',
    secondaryLight: '#534BAE',
    accent: '#FFAB40',

    // Cores de fundo e superfícies
    background: '#333',
    surface: '#FFFFFF',
    cardBackground: '#FFFFFF',
    selectedCardBackground: '#FFF3E0',
    white: '#FFFFFF', // Laranja muito claro para seleção

    // Cores de texto
    textPrimary: '#1A237E', // Azul escuro para contraste
    textSecondary: '#424242',
    textLight: '#FFFFFF',
    buttonText: '#FFFFFF',
    textOnPrimary: '#FFFFFF', // Texto sobre fundo laranja

    // Cores de status
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800',
    info: '#2196F3',

    // Cores de UI
    border: '#E0E0E0',
    divider: '#EEEEEE',
    shadow: '#00000029',
    placeholder: '#9E9E9E',
    disabled: '#BDBDBD',

    // Seleção
    selectionPrimary: '#FF6D00',
    selectionSecondary: '#1A237E',
  },

  fonts: {
    // Famílias (usando as padrão do React Native + customizações)
    regular: 'Roboto-Regular',
    medium: 'Roboto-Medium',
    bold: 'Roboto-Bold',
    light: 'Roboto-Light',

    // Tamanhos
    sizes: {
      xsmall: 12,
      small: 14,
      medium: 16,
      large: 18,
      xlarge: 20,
      xxlarge: 24,
      xxxlarge: 32,
    },

    // Estilos pré-definidos
    styles: {
      header: {
        fontFamily: 'Roboto-Bold',
        fontSize: 24,
        color: 'textPrimary',
      },
      title: {
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        color: 'textPrimary',
      },
      subtitle: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: 'textSecondary',
      },
      body: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: 'textPrimary',
      },
      button: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        color: 'textLight',
      },
      caption: {
        fontFamily: 'Roboto-Light',
        fontSize: 12,
        color: 'textSecondary',
      },
    },
  },

  spacing: {
    xsmall: 4,
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
    xxlarge: 48,
  },

  radii: {
    small: 4,
    medium: 8,
    large: 16,
    xlarge: 24,
    full: 999,
  },

  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 8,
    },
  },

};

// Tipo para TypeScript
export type AppTheme = typeof theme;