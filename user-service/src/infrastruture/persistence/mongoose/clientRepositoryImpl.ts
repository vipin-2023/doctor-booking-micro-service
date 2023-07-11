import { Client } from "../../../domain/client/models/Client";
import { ClientRepository } from "../../../domain/client/repositories/ClientRepository";
import { ClientModel } from "./clientModel";

export class ClientRepositoryImpl implements ClientRepository{

    getAll=async(): Promise<Client[]>=> {
        return await ClientModel.find();
    }
    create= async(name: string, email: string, password: string): Promise<Client>=> {
        return await ClientModel.create({name,email,password})
    }
    getById= async(id: string): Promise<Client | null>=> {
        return await ClientModel.findById(id);
    }
    update= async(id: string, name: string, email: string, password: string): Promise<Client | null>=> {
        return await ClientModel.findByIdAndUpdate(id,{name,email,password},{new:true});
    }
    delete = async(id: string): Promise<boolean>=> {
        const isdeletedClient = await ClientModel.findByIdAndDelete(id);
        return !!isdeletedClient;
        
    }
}