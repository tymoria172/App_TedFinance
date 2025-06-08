import { theme } from '@themes/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    flexDirection: 'column',
    backgroundColor: theme.colors.BaseSecondary,
  },
  containerProfile: {
    flex: 1,
    flexDirection: 'row'

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: 16,
  },
  card: {
    backgroundColor: theme.colors.BasePrimary,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 0,
    borderColor: theme.colors.border,
    flexDirection: 'row', // 🔥 muda aqui
    alignItems: 'center', // 🔥 alinha na vertical
    justifyContent: 'space-between', // opcional
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary, // 🔥 importante manter
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: 4,
  },
  idText: {
    fontSize: 14,
    color: theme.colors.placeholder,
    marginBottom: 8,
  },

  removeButton: {
    padding: theme.spacing.xsmall,
    transform: [{ scale: 1 }],
  },

  actionsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginLeft: 0,
  },

  removeButtonPressed: {
    transform: [{ scale: 0.9 }],
    opacity: 0.8,
  },
  detailsContainer: {
    flex: 1, // 🔥 ocupa espaço à esquerda
    marginRight: 12,
  },
  text: {
    fontSize: 14,
    color: theme.colors.white,
    marginBottom: 4,
  },
  label: {
    fontWeight: '600',
  },
  dateText: {
    fontSize: 12,
    color: theme.colors.placeholder,
    marginTop: 8,
  },
  listContent: {
    paddingBottom: 0,
  },
  removeContainer: {
    marginLeft: 20,
    borderLeftWidth: 1,
    borderColor: theme.colors.placeholder,
    padding: 10
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: theme.colors.placeholder,
    fontSize: 16,
  },
});
