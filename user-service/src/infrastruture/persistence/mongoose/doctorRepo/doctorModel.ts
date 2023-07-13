import mongoose, { Document, Schema } from 'mongoose';
import {Doctor} from "../../../../domain/doctor/models/Doctor"

export interface DoctorDocument extends Doctor, Document {}

const doctorSchema = new Schema<DoctorDocument>(
    {
      userId: {
        type: String,
      },
      firstName: {
        type: String,
        required: [true, "first name is required"],
      },
      lastName: {
        type: String,
        required: [true, "last name is required"],
      },
      phone: {
        type: String,
        required: [true, "phone no is required"],
      },
      email: {
        type: String,
        required: [true, "email is required"],
      },
      website: {
        type: String,
      },
      address: {
        type: String,
        required: [true, "address is required"],
      },
      specialization: {
        type: String,
        required: [true, "specialization is require"],
      },
      experience: {
        type: String,
        required: [true, "experience is required"],
      },
      feesPerConsultation: {
        type: Number,
        required: [true, "fee is required"],
      },
      status: {
        type: String,
        default: "pending",
      },
      timings: {
        type: Object,
        required: [true, "wrok timing is required"],
      },
    },
    { timestamps: true }
  );
  
  export const DoctorModel = mongoose.model<DoctorDocument>("Doctors", doctorSchema);
 