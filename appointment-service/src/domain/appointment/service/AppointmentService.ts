import { Appointment } from '../models/Appointment';
import { AppointmentRepositoryImpl } from '../../../infrastruture/persistence/mongoose/appointmentRepositoryImpl';
import { AppointmentRepository } from '../repositories/AppointmentRepository';

export class AppointmentService {
  private repository: AppointmentRepository;

  constructor() {
    this.repository = new AppointmentRepositoryImpl();
  }

  getAllAppointments = async (): Promise<Appointment[]> => {
    const appointments = await this.repository.getAll();
    return appointments;
  };
  findOne = async (field:Partial<Appointment>): Promise<Appointment | null> => {
    const appointments = await this.repository.findOne(field);
    return appointments;
  };

  createAppointment = async (data: Partial<Appointment>): Promise<Appointment> => {
    const appointments = await this.repository.create(data);
    return appointments;
  };

  getByAppointmentId = async (id: string): Promise<Appointment | null> => {
    const appointment = await this.repository.getById(id);
    return appointment;
  };

  updateAppointment = async (id: string, updates: Partial<Appointment>): Promise<Appointment | null> => {
    const appointment = await this.repository.update(id, updates);
    return appointment;
  };

  deleteAppointment = async (id: string): Promise<boolean> => {
    return await this.repository.delete(id);
  };
}

