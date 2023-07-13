import { Client } from "../../../../domain/client/models/Client";
import { ClientRepository } from "../../../../domain/client/repositories/ClientRepository";
import { ClientModel } from "./clientModel";

export class ClientRepositoryImpl implements ClientRepository{

    getAll=async(): Promise<Client[]>=> {
        return await ClientModel.find();
    }
    findOne= async(field: Partial<Client>): Promise<Client |null>=> {
        return await ClientModel.findOne(field);
    }
    create= async(data: Partial<Client>): Promise<Client>=> {
        return await ClientModel.create(data)
    }
    getById= async(id: string): Promise<Client | null>=> {
        return await ClientModel.findById(id);
    }
    update= async(id: string, updates: Partial<Client>): Promise<Client | null>=>{
        return await ClientModel.findByIdAndUpdate(id,updates,{new:true});
    }
    delete = async(id: string): Promise<boolean>=> {
        const isdeletedClient = await ClientModel.findByIdAndDelete(id);
        return !!isdeletedClient;    
    }
}