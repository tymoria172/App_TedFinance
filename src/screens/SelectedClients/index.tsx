import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useClients } from '@context/ClientContext';
import { Client } from '@models/Client';
import styles from './styles';
import { theme } from '@themes/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Feather } from '@expo/vector-icons';


const SelectedClientsScreen = () => {
    const { selectedClients, removeClient } = useClients();

    const formatCurrency = (value: number) =>
        value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString('pt-BR');

    const generateColor = (id: string) => {
        const colors = [
            theme.colors.primary,
            theme.colors.secondary,
            '#FFB300',
            '#4CAF50',
            '#E91E63',
            '#3F51B5',
        ];

        const safeId = typeof id === 'string' ? id : String(id ?? '');
        const index = [...safeId].reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
        return colors[index];
    };

    const handleRemoveClient = (clientId: string) => {
        removeClient(clientId);
    };

    const renderClientItem = ({ item }: { item: Client }) => (
        <View style={styles.card}>
            <View style={styles.detailsContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.idText}>ID: {item.id}</Text>
                <Text style={styles.text}>
                    <Text style={styles.label}>Salário:</Text> {formatCurrency(item.salary)}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.label}>Valuation:</Text> {formatCurrency(item.companyValuation)}
                </Text>
                <Text style={styles.dateText}>
                    Criado em: {formatDate(item.createdAt)}
                </Text>
            </View>

            <View style={styles.actionsContainer}>
                <View style={[styles.avatarContainer, { backgroundColor: generateColor(item.id) }]}>
                    <MaterialCommunityIcons name="teddy-bear" size={24} color="white" />
                </View>


            </View>
            <View style={styles.removeContainer}>
                <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveClient(item.id)}
                >
                    <Feather name="trash-2" size={30} color={theme.colors.error} />

                </TouchableOpacity>
            </View>

        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {selectedClients.length} {selectedClients.length === 1 ? 'cliente selecionado' : 'clientes selecionados'}
            </Text>

            <FlatList
                data={selectedClients}
                renderItem={renderClientItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Nenhum cliente selecionado</Text>
                    </View>
                }
            />
        </View>
    );
};

export default SelectedClientsScreen;