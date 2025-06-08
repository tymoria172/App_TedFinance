import { theme } from '@themes/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    alignItems: 'center',
    paddingBottom: '25%',

  },
  title: {
    fontSize: theme.fonts.sizes.xxlarge,
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: theme.fonts.light,
    color: theme.colors.primary,
  },
  input: {
    borderWidth: 0,
    borderColor: '#aaa',
    color: theme.colors.white,
    padding: 10,
    borderRadius: 8,
    width: '100%',
    marginBottom: 16,
    height: 50,
    backgroundColor: theme.colors.BaseSecondary
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
