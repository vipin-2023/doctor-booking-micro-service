import mongoose, { Document, Schema } from 'mongoose';
import {Client} from "../../../domain/client/models/Client"

export interface ClientDocument extends Client , Document {
  id:string,
}
  
const clientSchema = new Schema<ClientDocument>({
    id:{
      type:String,
      required:[true, "id is require"],
    },
    name: {
      type: String,
      required: [true, "name is require"],
    },
    email: {
      type: String,
      required: [true, "email is require"],
    },
    password: {
      type: String,
      required: [true, "password is require"],
    },
    role: { 
    type: String,
    enum: ['user', 'doctor', 'admin'],
    required: true },
    notification: {
      type: [String],
      default: [],
    },
    seennotification: {
      type: [String],
      default: [],
    },
  });

  export const ClientModel = mongoose.model<ClientDocument>("Clients", clientSchema);