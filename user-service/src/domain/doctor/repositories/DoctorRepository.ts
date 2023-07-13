import { Doctor } from '../models/Doctor';

export interface DoctorRepository {
  getAll(): Promise<Doctor[]>;
  findOne(field:Partial<Doctor>):Promise<Doctor | null>
  create(data: Partial<Doctor>): Promise<Doctor>;
  getById(id: string): Promise<Doctor | null>;
  getByUserId(Id: string): Promise<Doctor | null>;
  update(Id: string, updates: Partial<Doctor>): Promise<Doctor | null>;
  delete(Id: string): Promise<boolean>;  
}

