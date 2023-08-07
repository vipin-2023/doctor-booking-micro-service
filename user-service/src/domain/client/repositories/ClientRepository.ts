import {Client} from "../models/Client"

export interface ClientRepository {
    getAll(): Promise<Client[]>;
    findOne(field:Partial<Client>): Promise<Client | null>;
    create(data: Partial<Client>): Promise<Client>;
    getById(id: string): Promise<Client | null>;
    update(id: string,updates:any): Promise<Client | null>;
    delete(id: string): Promise<boolean>;
  }



  