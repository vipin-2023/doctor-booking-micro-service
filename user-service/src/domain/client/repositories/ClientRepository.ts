import {Client} from "../models/Client"

export interface ClientRepository {
    getAll(): Promise<Client[]>;
    create(name: string,email:string,password:string): Promise<Client>;
    getById(id: string): Promise<Client | null>;
    update(id: string,name: string,email:string,password:string): Promise<Client | null>;
    delete(id: string): Promise<boolean>;
  }



  