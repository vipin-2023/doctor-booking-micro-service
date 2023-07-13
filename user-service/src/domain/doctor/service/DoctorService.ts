import { Doctor } from '../models/Doctor';
import { DoctorRepositoryImpl } from '../../../infrastruture/persistence/mongoose/doctorRepo/doctorRepositoryImpl';
import { DoctorRepository } from '../repositories/DoctorRepository';


export class DoctorService {
    private repository: DoctorRepository;
  
    constructor() {
      this.repository = new DoctorRepositoryImpl();
    }
  
    getAllDoctors = async (): Promise<Doctor[]> => {
      const Doctors = await this.repository.getAll();
      return Doctors;
    };
    findOne = async (field:Partial<Doctor>): Promise<Doctor | null> => {
      const Doctors = await this.repository.findOne(field);
      return Doctors;
    };
  
    createDoctor = async (data: Partial<Doctor>): Promise<Doctor> => {
      const Doctor = await this.repository.create(data);
      return Doctor;
    };
    
    getById = async (id: string): Promise<Doctor | null> => {
        const Doctor = await this.repository.getById(id);
        return Doctor;
      };
    getByDoctorId = async (userId: string): Promise<Doctor | null> => {
      const Doctor = await this.repository.getById(userId);
      return Doctor;
    };
  
    updateDoctor = async (id: string, updates: Partial<Doctor>): Promise<Doctor | null> => {
      const Doctor = await this.repository.update(id, updates);
      return Doctor;
    };
  
    deleteDoctor = async (id: string): Promise<boolean> => {
      return await this.repository.delete(id);
    };
}
  
  