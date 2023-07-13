import { Doctor } from "../../../../domain/doctor/models/Doctor";
import { DoctorRepository } from "../../../../domain/doctor/repositories/DoctorRepository";
import { DoctorModel } from "./doctorModel";


export class DoctorRepositoryImpl implements DoctorRepository {
    getAll=async(): Promise<Doctor[]>=> {
        return await DoctorModel.find();
    }
    findOne= async(field: Partial<Doctor>): Promise<Doctor |null>=> {
        return await DoctorModel.findOne(field);
    }
    create= async(data: Partial<Doctor>): Promise<Doctor>=> {
        return await DoctorModel.create(data)
    }
    getById= async(id: string): Promise<Doctor | null>=> {
        return await DoctorModel.findById(id);
    }
    getByUserId= async( userId: string): Promise<Doctor | null> =>{
        return await DoctorModel.findById(userId);
    }
    update= async(id: string, updates: Partial<Doctor>): Promise<Doctor | null>=>{
        return await DoctorModel.findByIdAndUpdate(id,updates,{new:true});
    }
    delete = async(id: string): Promise<boolean>=> {
        const isdeletedClient = await DoctorModel.findByIdAndDelete(id);
        return !!isdeletedClient;    
    }
}