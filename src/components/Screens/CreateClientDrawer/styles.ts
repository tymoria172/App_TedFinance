
import { theme } from '@themes/theme';
import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    background: {
        backgroundColor: theme.colors.BaseSecondary,
        borderRadius: 20,
    },
    handleIndicator: {
        backgroundColor: theme.colors.primary,
        width: 40,
        height: 4,
    },
    contentContainer: {
        flex: 1,
        padding: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 24,
        color: theme.colors.white,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: theme.colors.white,
    },
    input: {
        backgroundColor: theme.colors.background,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: theme.colors.white,
        borderWidth: 1,
        borderColor: theme.colors.divider,
    },
    submitButton: {
        backgroundColor: theme.colors.primary,
        
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 24,
    },
    submitButtonText: {
        color: theme.colors.buttonText,
        fontSize: 16,
        fontWeight: '600',
    },
    submitButtonDisabled: {
        backgroundColor: theme.colors.textSecondary,
        opacity: 0.7,
    },
});