import { Client } from '../models/Client';
import { ClientRepositoryImpl } from '../../../infrastruture/persistence/mongoose/clientRepositoryImpl';
import { ClientRepository } from '../repositories/ClientRepository';

export class ClientService {
  private repository: ClientRepository;

  constructor() {
    this.repository = new ClientRepositoryImpl();
  }

  getAllClients = async (): Promise<Client[]> => {
    const clients = await this.repository.getAll();
    return clients;
  };

  createClient = async (data: Partial<Client>): Promise<Client> => {
    const client = await this.repository.create(data);
    return client;
  };

  getByClientId = async (id: string): Promise<Client | null> => {
    const client = await this.repository.getById(id);
    return client;
  };

  updateClient = async (id: string, updates: Partial<Client>): Promise<Client | null> => {
    const client = await this.repository.update(id, updates);
    return client;
  };

  deleteClient = async (id: string): Promise<boolean> => {
    return await this.repository.delete(id);
  };
}

