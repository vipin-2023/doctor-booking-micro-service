import { Request, Response } from 'express';
import { ClientService } from '../../domain/client/service/ClientService';
import {DoctorService} from "../../domain/doctor/service/DoctorService"
import {Validator}from "../validators/validator";
import {HashUtility} from "../utils/bycriptUtils";
import {ResponseUtils} from "../utils/jsonUtils";
import {TokenUtility} from "../utils/jwtUtils";
import {UUIDUtility}from "../utils/uuidUtils";
import KafkaProducer from "../../infrastruture/messaging/kafka/kafkaProducer";
import KafkaTopics from "../../infrastruture/messaging/kafka/kafkaTopics";

export class UserController {
  private clientService: ClientService;
  private doctorService:DoctorService;
  constructor() {
    this.clientService = new ClientService();
    this.doctorService= new DoctorService();
  }

  registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const validator = new Validator(['username', 'email', 'password']);
      const isValid = validator.validateRequestBody(req);
  
      if (!isValid) {
        res.status(400).json(ResponseUtils.error('Missing required fields'));
        return;
      }
  
      const exisitingUser = await this.clientService.findOne({ email: req.body.email });
  
      if (!exisitingUser) {
        res.status(200).json(ResponseUtils.error('User Already Exist'));
        return;
      }
  
      const hashedPassword = await HashUtility.hashPassword(req.body.password);
      req.body.password = hashedPassword;
      req.body._id = UUIDUtility.generateUUID();
  
      const newUser = await this.clientService.createClient(req.body);
      if(newUser){
        try {
          const producer = new KafkaProducer(newUser, KafkaTopics.UserCreated);
          producer.run().catch(console.error);
        } catch (e) {
          res.status(500).json(ResponseUtils.error('An error occurred while producing kafka topic'));
        }
      }
      
      res.status(201).json(ResponseUtils.success('Register Successfully', newUser));
    } catch (error) {
      res.status(500).json(ResponseUtils.error('An error occurred while fetching todos'));
    }
  };

  logInUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const validator = new Validator(['email', 'password']);
      const isValid = validator.validateRequestBody(req);
  
      if (!isValid) {
        res.status(400).json(ResponseUtils.error('Missing required fields'));
        return;
      }
  
      const User = await this.clientService.findOne({ email: req.body.email });
  
      if (!User) {
        res.status(404).json(ResponseUtils.error("User not found"));
        return;
      }
  
      const isMatch = await HashUtility.comparePasswords(req.body.password,User.password);
      
      if(!isMatch){
        res.status(404).json(ResponseUtils.error("Invlid EMail or Password"))
      }
      const  {password,...user} =User
      const token = TokenUtility.signToken({ _id: User.id,role: User.role});  
  
      res.status(200).json(ResponseUtils.success('Login Success', {user},token));
    } catch (error) {
      res.status(500).json(ResponseUtils.error('An error occurred while log in'));
    }
  };

  getAllUser = async (req: Request, res: Response): Promise<void> => {
    try {  
      const Users = await this.clientService.getAllClients();
  
      if (!Users) {
        res.status(404).json(ResponseUtils.error("Users not found"));
        return;
      }  
    
      res.status(200).json(ResponseUtils.success('fetching users Success', Users));
    } catch (error) {
      res.status(500).json(ResponseUtils.error('An error occurred while fetching uses'));
    }
  };

  getAllDoctors = async (req: Request, res: Response): Promise<void> => {
    try {  
      const Doctors = await this.doctorService.getAllDoctors();
  
      if (!Doctors) {
        res.status(404).json(ResponseUtils.error("Doctors not found"));
        return;
      }  
    
      res.status(200).json(ResponseUtils.success('fetching Doctors Success', Doctors));
    } catch (error) {
      res.status(500).json(ResponseUtils.error('An error occurred while fetching Doctors'));
    }
  };

  updateClient = async (req: Request, res: Response): Promise<void> => {
    try { 
      const validator = new Validator(['id']);
      const isValid = validator.validateRequestParams(req);
  
      if (!isValid) {
        res.status(400).json(ResponseUtils.error('Missing required params'));
        return;
      } 
      const User = await this.clientService.updateClient(req.body.id,req.body);
  
      if (!User) {
        res.status(404).json(ResponseUtils.error("User not found"));
        return;
      }  
    
      res.status(200).json(ResponseUtils.success('User Update Success', User));
    } catch (error) {
      res.status(500).json(ResponseUtils.error('An error occurred while updating user'));
    }
  };

  updateDoctor = async (req: Request, res: Response): Promise<void> => {
    try { 
      const validator = new Validator(['id']);
      const isValid = validator.validateRequestParams(req);
  
      if (!isValid) {
        res.status(400).json(ResponseUtils.error('Missing required params'));
        return;
      } 
      const User = await this.doctorService.updateDoctor(req.body.id,req.body);
      if (!User) {
        res.status(404).json(ResponseUtils.error("User not found"));
        return;
      }  
    
      res.status(200).json(ResponseUtils.success('User Update Success', User));
    } catch (error) {
      res.status(500).json(ResponseUtils.error('An error occurred while updating user'));
    }
  };
  dictorStatusControl =async (req: Request, res: Response): Promise<void> => {
    try { 
      const validator = new Validator(["doctorId", "status"]);
      const isValid = validator.validateRequestParams(req);
  
      if (!isValid) {
        res.status(400).json(ResponseUtils.error('Missing required fileds'));
        return;
      } 
      const doctor = await this.doctorService.updateDoctor(req.body.doctorId,req.body.status);
      if (!doctor) {
        res.status(404).json(ResponseUtils.error("Doctor not found"));
        return;
      } 
      const user = await this.clientService.getByClientId(req.body.id);
      if (!user) {
        res.status(404).json(ResponseUtils.error("User not found"));
        return;
      }
      user.notification.push({
        type: "doctor-account-status-updated",
        message: `Your Doctor Account Request Has ${req.body.status} `,
        onClickPath: "/notification",
      });

      user.role = req.body.status === "approved" ? "doctor" : "user";
      await this.clientService.updateClient(req.body.id,user);

    }catch (error) {
      res.status(500).json(ResponseUtils.error('An error occurred while updating status'));
    }
  }
  

}