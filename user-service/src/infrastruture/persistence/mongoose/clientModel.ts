import mongoose, { Document, Schema } from 'mongoose';
import {Client} from "../../../domain/client/models/Client"

export interface ClientDocument extends Client, Document {}
  
const clientSchema = new Schema<ClientDocument>({
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
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isDoctor: {
      type: Boolean,
      default: false,
    },
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