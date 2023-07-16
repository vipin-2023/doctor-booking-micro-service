import mongoose, { Document, Schema } from "mongoose";
import { Appointment } from "../../../domain/appointment/models/Appointment";

export interface AppointmentDocument extends Appointment, Document {
  id: string;
}

const appointmentSchema = new Schema<AppointmentDocument>(
  {
    userId: {
      type: String,
      required: true,
    },
    doctorId: {
      type: String,
      required: true,
    },
    doctorInfo: {
      type: String,
      required: true,
    },
    userInfo: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const AppointmentModel = mongoose.model<AppointmentDocument>(
  "Appointment",
  appointmentSchema
);
