import {Appointment} from "../models/Appointment"

export interface AppointmentRepository {
    getAll(): Promise<Appointment[]>;
    findOne(field:Partial<Appointment>): Promise<Appointment | null>;
    create(data: Partial<Appointment>): Promise<Appointment>;
    getById(id: string): Promise<Appointment | null>;
    update(id: string,updates:Partial<Appointment>): Promise<Appointment | null>;
    delete(id: string): Promise<boolean>;
}

  