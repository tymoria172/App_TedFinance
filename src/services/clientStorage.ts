import { Client } from '@models/Client';
import { api } from './api';

export interface ApiResponse {
  clients: Client[];
  totalPages: number;
  totalClients: number;
}

export const getClientsFromApi = async (
  page: number,
  limit: number,
  name?: string
): Promise<{
  clients: Client[];
  totalPages: number;
  totalClients?: number;
}> => {
  try {
    const params = {
      page,
      limit,
      ...(name && { name }),
    };

    const response = await api.get('/users', { params });
    console.log('response ', response.data)
    return {
      clients: response.data.clients || [],
      totalPages: response.data.totalPages || 1,
      totalClients: response.data.totalClients,
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
      error.message ||
      'Erro ao buscar clientes'
    );
  }
};

export const createClient = async (clientData: {
  name: string;
  salary: number;
  companyValuation: number;
}): Promise<void> => {
  try {
    const response = await api.post('/users', clientData);

    return response.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
      error.message ||
      'Erro ao criar cliente'
    );
  }
};

export const deleteClient = async (id: string): Promise<void> => {
  try {
    const response = await api.delete(`/users/${id}`);
    console.log(response.data, 'Delete ususario <<<<<<<')
    return response.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
      error.message ||
      'Erro ao deletar cliente'
    );
  }
};

export const updateClient = async (
  id: string,
  clientData: {
    name: string;
    salary: number;
    companyValuation: number;
  }
): Promise<void> => {
  try {
    let res = await api.patch(`/users/${id}`, clientData);
    console.log('Atualizando usuario >>>>', res.data)
    return res.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
      error.message ||
      'Erro ao atualizar cliente'
    );
  }
};
