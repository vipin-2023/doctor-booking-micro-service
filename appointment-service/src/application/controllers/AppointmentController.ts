import { Request, Response } from 'express';
import { AppointmentService } from '../../domain/appointment/service/AppointmentService';
import {Validator}from "../validators/validator";
import {HashUtility} from "../utils/bycriptUtils";
import {ResponseUtils} from "../utils/jsonUtils";
import {TokenUtility} from "../utils/jwtUtils";
import {UUIDUtility}from "../utils/uuidUtils";
import {DateTimeUtils}from "../utils/dateTimeUtils";

export class AppointmentController {
  private AppointmentService: AppointmentService;

  constructor() {
    this.AppointmentService = new AppointmentService();
   
  }

  bookAppointment = async (req: Request, res: Response): Promise<void> => {
    try {

      const validator = new Validator(["userId","doctorId","doctorInfo","userInfo","date","status","time",]);
      const isValid = validator.validateRequestBody(req);
  
      if (!isValid) {
        res.status(400).json(ResponseUtils.error('Missing required fields'));
        return;
      }

      req.body.date = DateTimeUtils.convertDateToISOString(req.body.date);
      req.body.time = DateTimeUtils.convertTimeToISOString(req.body.time);
      req.body.status = "pending";

      const newAppointment = await this.AppointmentService.createAppointment(req.body)
      
      
    } catch (error) {
      res.status(500).json(ResponseUtils.error('An error occurred while fetching todos'));
    }
  }; 

}