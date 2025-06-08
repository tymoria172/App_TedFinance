import React, { useEffect, useState, useCallback, useRef, } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, RefreshControl, SafeAreaView, LayoutAnimation } from 'react-native';
import { useUser } from '@context/UserContext';
import { useClients } from '@context/ClientContext';
import { Client } from '@models/Client';
import { createClient, deleteClient, getClientsFromApi, updateClient } from '@services/clientStorage';
import BottomSheet from '@gorhom/bottom-sheet';
import ClientCard from '@components/Screens/ClientCards';
import { Pagination } from '@components/Screens/Pagination';
import CreateClientDrawer from '@components/Screens/CreateClientDrawer';
import UpdateClientDrawer from '@components/Screens/UpdateClientDrawer';
import { styles } from './styles';
import { theme } from '@themes/theme';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from '@expo/vector-icons/AntDesign';


const ClientsScreen: React.FC = () => {
  const { name } = useUser();
  const {
    selectedClients,
    saveSelectedClients,
    clearSelectedClients,
    toggleClientSelection,
    isClientSelected
  } = useClients();

  // Estados locais
  const [clients, setClients] = useState<Client[]>([]);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalClients, setTotalClients] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAllClientsMessage, setShowAllClientsMessage] = useState(false);

  const createDrawerRef = useRef<BottomSheet>(null);
  const updateDrawerRef = useRef<BottomSheet>(null);

  // Funções de seleção - agora usando diretamente do contexto
  const handleToggleClientSelection = useCallback((client: Client) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    toggleClientSelection(client);
  }, [toggleClientSelection]);

  const handleClearSelection = useCallback(() => {
    clearSelectedClients();
  }, [clearSelectedClients]);

  const handleSaveSelection = useCallback(() => {
    Alert.alert('Sucesso', 'Seleção salva no contexto!');
    // Não precisa mais chamar saveSelectedClients aqui pois já está sendo atualizado
    // diretamente pelo toggleClientSelection
  }, []);

  // Carregamento de clientes (mantido igual)
  const loadClients = useCallback(async (isRefreshing = false) => {
    try {
      isRefreshing ? setRefreshing(true) : setLoading(true);
      setError(null);
      setShowAllClientsMessage(false);

      const data = await getClientsFromApi(
        isRefreshing ? 1 : page,
        10,
        name
      );

      const filteredClients = data.clients.filter(client =>
        client.name.toLowerCase().includes(name.toLowerCase())
      );

      const hasFilter = name && name.trim().length > 0;
      const noFilteredClients = hasFilter && filteredClients.length === 0;

      if (noFilteredClients) {
        setClients(data.clients);
        setTotalClients(data.clients.length);
        setShowAllClientsMessage(true);
      } else {
        setClients(filteredClients);
        setTotalClients(filteredClients.length);
      }

      setTotalPages(data.totalPages);
      if (isRefreshing) setPage(1);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar clientes');
      Alert.alert('Erro', 'Não foi possível carregar os clientes');
    } finally {
      isRefreshing ? setRefreshing(false) : setLoading(false);
    }
  }, [page, name]);

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  // Ações da UI (mantidas iguais, exceto onde usam seleção)
  const handleRefresh = () => {
    loadClients(true);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleCreateClient = () => {
    createDrawerRef.current?.expand();
  };

  const handleOpenEditDrawer = (client: Client) => {
    setEditingClient(client);
    updateDrawerRef.current?.expand();
  };

  const handleSubmitClient = async (clientData: {
    name: string;
    salary: number;
    companyValuation: number;
  }) => {
    try {
      await createClient(clientData);
      loadClients();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar o cliente');
    }
  };

  const handleSubmitUpdate = async (clientData: {
    id: string;
    name: string;
    salary: number;
    companyValuation: number;
  }) => {
    try {
      await updateClient(clientData.id, clientData);
      loadClients();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o cliente');
    }
  };

  const handleDeleteClient = async (id: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este cliente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteClient(id);
              loadClients();
              // Verifica se o cliente está selecionado e remove se estiver
              if (isClientSelected(id)) {
                const clientToRemove = clients.find(c => c.id === id);
                if (clientToRemove) {
                  toggleClientSelection(clientToRemove);
                }
              }
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o cliente');
            }
          },
        },
      ]
    );
  };

  // Renderização otimizada
  const renderClientCard = ({ item }: { item: Client }) => (
    <ClientCard
      key={item.id}
      client={item}
      isSelected={isClientSelected(item.id)}
      onPress={() => handleToggleClientSelection(item)}
      onEdit={() => handleOpenEditDrawer(item)}
      onDelete={() => handleDeleteClient(item.id)}
    />
  );

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: theme.colors.background,
    }} >

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {totalClients} {totalClients === 1 ? 'cliente' : 'clientes'}
            {selectedClients.length > 0 && (
              <Text style={styles.selectedCount}> | {selectedClients.length} selecionados</Text>
            )}
          </Text>

          {selectedClients.length > 0 && (
            <View style={styles.selectionActions}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveSelection}
              >
                <Text style={styles.buttonText}>Salvar Seleção</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleClearSelection}
              >
                <Text style={styles.buttonText}>Limpar</Text>
              </TouchableOpacity>
            </View>
          )}

          {showAllClientsMessage && (
            <Text style={styles.warningText}>
              Não encontramos clientes com o nome "{name}". Mostrando todos os clientes.
            </Text>
          )}

          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>

        {loading && !refreshing ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#3A75F1" />
          </View>
        ) : (
          <FlatList
            data={clients}
            keyExtractor={(item) => item.id}
            renderItem={renderClientCard}
            extraData={selectedClients} // Agora observa selectedClients do contexto
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  {name ? 'Nenhum cliente encontrado' : 'Digite um nome para pesquisar'}
                </Text>
              </View>
            }
            contentContainerStyle={clients.length === 0 ? styles.emptyListContent : styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={['#3A75F1']}
              />
            }
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            removeClippedSubviews={true}
          />
        )}

        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateClient}
          activeOpacity={0.8}
        >
           <AntDesign name="adduser" size={24} color="white" />
          <Text style={styles.createButtonText}>Criar cliente</Text>
         
        </TouchableOpacity>

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}

        <CreateClientDrawer
          ref={createDrawerRef}
          onSubmit={handleSubmitClient}
        />

        <UpdateClientDrawer
          ref={updateDrawerRef}
          userId={editingClient?.id || ''}
          onSubmit={handleSubmitUpdate}
          initialData={editingClient}
        />
      </View>
    </SafeAreaView>
  );
};

export default ClientsScreen;