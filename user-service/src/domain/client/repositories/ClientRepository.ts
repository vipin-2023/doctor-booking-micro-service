import {Client} from "../models/Client"

export interface ClientRepository {
    getAll(): Promise<Client[]>;
    create(data: Partial<Client>): Promise<Client>;
    getById(id: string): Promise<Client | null>;
    update(id: string,updates:Partial<Client>): Promise<Client | null>;
    delete(id: string): Promise<boolean>;
  }



  