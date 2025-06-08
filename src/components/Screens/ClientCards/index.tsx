import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Client } from '@models/Client';
import styles from './styles';
import { theme } from '@themes/theme';

interface ClientCardProps {
  client: Client;
  isSelected: boolean;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

// Utilitários fora do componente
const formatCurrency = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('pt-BR');

const ClientCard: React.FC<ClientCardProps> = React.memo(
  ({ client, isSelected, onPress, onEdit, onDelete }) => {
    const [pressed, setPressed] = useState(false);

    const handlePress = useCallback(() => {
      onPress();
    }, [onPress]);

    const generateColor = (id: string) => {
      const colors = [
        theme.colors.primary,
        theme.colors.secondary,
        '#FFB300',
        '#4CAF50',
        '#E91E63',
        '#3F51B5',
      ];

      // Verifica se é string antes de usar spread
      const safeId = typeof id === 'string' ? id : String(id ?? '');

      const index = [...safeId].reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;

      return colors[index];
    };

    const avatarColor = generateColor(client.id);

    return (
      <Pressable
        onPress={handlePress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={[
          styles.card,
          isSelected && styles.selectedCard,
          pressed && styles.pressedCard,
        ]}
      >
        <View style={[styles.avatarContainer, { backgroundColor: avatarColor }]}>
          <MaterialCommunityIcons name="teddy-bear" size={24} color="white" />
        </View>

        <View style={styles.content} pointerEvents="box-none">
          <Text style={styles.name}>{client.name}</Text>
          <Text style={styles.idText}>ID: {client.id}</Text>

          <View style={styles.detailsContainer} pointerEvents="box-none">
            <Text style={styles.text}>
              <Text style={styles.label}>Salário:</Text> {formatCurrency(client.salary)}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.label}>Valuation:</Text> {formatCurrency(client.companyValuation)}
            </Text>
            <Text style={styles.dateText}>
              Criado em: {formatDate(client.createdAt)}
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={onEdit}
            style={styles.iconButton}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <Feather name="edit-2" size={20} color={theme.colors.primaryLight} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onDelete}
            style={styles.iconButton}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <Feather name="trash-2" size={20} color={theme.colors.error} />
          </TouchableOpacity>
        </View>
      </Pressable>
    );
  },
  (prev, next) => {
    return (
      prev.isSelected === next.isSelected &&
      JSON.stringify(prev.client) === JSON.stringify(next.client)
    );
  }
);

export default ClientCard;
