import { theme } from '@themes/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.BasePrimary,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: theme.colors.BasePrimary,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingRight: 12,
  },
  selectedCard: {
    backgroundColor: theme.colors.textSecondary,
    borderColor: theme.colors.primary,
  },
  pressedCard: {
    opacity: 0.95,
    transform: [{ scale: 0.99 }],
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 4,
  },
  content: {
    flex: 1,
    flexShrink: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  idText: {
    fontSize: 12,
    color: theme.colors.border,
    marginBottom: 8,
  },
  detailsContainer: {
    marginTop: 4,
  },
  text: {
    fontSize: 14,
    color: theme.colors.primary,
    marginBottom: 2,
  },
  label: {
    fontWeight: '600',
    color: theme.colors.border,
  },
  dateText: {
    fontSize: 12,
    color: theme.colors.border,
    marginTop: 6,
  },
  actions: {
    flexDirection: 'row',
    marginLeft: 12,
  },
  iconButton: {
    marginLeft: 8,
  },
});

export default styles;
