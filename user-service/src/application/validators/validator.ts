import { Request } from 'express';

export class Validator {
  private requiredFields: string[];

  constructor(requiredFields: string[]) {
    this.requiredFields = requiredFields;
  }

  public validateRequestBody(req: Request): boolean {
    for (const field of this.requiredFields) {
      if (!req.body[field]) {
        return false;
      }
    }
    return true;
  } 
  public validateRequestParams(req: Request): boolean {
    for (const field of this.requiredFields) {
      if (!req.params[field]) {
        return false;
      }
    }
    return true;
  }
}
