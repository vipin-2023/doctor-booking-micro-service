import { Appointment } from "../../../domain/appointment/models/Appointment";
import { AppointmentRepository } from "../../../domain/appointment/repositories/ClientRepository";
import { AppointmentModel } from "./appointmentModel";

export class AppointmentRepositoryImpl implements AppointmentRepository{

    getAll=async(): Promise<Appointment[]>=> {
        return await AppointmentModel.find();
    }
    findOne= async(field: Partial<Appointment>): Promise<Appointment |null>=> {
        return await AppointmentModel.findOne(field);
    }
    create= async(data: Partial<Appointment>): Promise<Appointment>=> {
        return await AppointmentModel.create(data)
    }
    getById= async(id: string): Promise<Appointment | null>=> {
        return await AppointmentModel.findById(id);
    }
    update= async(id: string, updates: Partial<Appointment>): Promise<Appointment | null>=>{
        return await AppointmentModel.findByIdAndUpdate(id,updates,{new:true});
    }
    delete = async(id: string): Promise<boolean>=> {
        const isdeletedAppointment = await AppointmentModel.findByIdAndDelete(id);
        return !!isdeletedAppointment;    
    }
}