import { Request, Response } from 'express';
import { AppointmentService } from '../../domain/appointment/service/AppointmentService';
import {Validator}from "../validators/validator";
import {HashUtility} from "../utils/bycriptUtils";
import {ResponseUtils} from "../utils/jsonUtils";
import {TokenUtility} from "../utils/jwtUtils";
import {UUIDUtility}from "../utils/uuidUtils";


export class AppointmentController {
  private AppointmentService: AppointmentService;

  constructor() {
    this.AppointmentService = new AppointmentService();
   
  }

  bookAppointmnet = async (req: Request, res: Response): Promise<void> => {
    try {
     
    } catch (error) {
      res.status(500).json(ResponseUtils.error('An error occurred while fetching todos'));
    }
  }; 

}