import { Request, Response } from 'express';
import { ClientService } from '../../domain/client/service/ClientService';
import {Validator}from "../validators/validator";
import {HashUtility} from "../utils/bycriptUtils";
import {ResponseUtils} from "../utils/jsonUtils";
import {TokenUtility} from "../utils/jwtUtils";
import {UUIDUtility}from "../utils/uuidUtils";

export class UserController {
  private clientService: ClientService;
  constructor() {
    this.clientService = new ClientService();
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
  

}