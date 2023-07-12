interface ResponseData {
    message: string;
    success: boolean;
    data?: any;
    token?:string
  }
  
  export class ResponseUtils {
    public static success(message: string, data?: any,token?:string): ResponseData {
      return {
        message:message,
        success: true,
        data:data,
        token:token
      };
    }
  
    public static error(message: string): ResponseData {
      return {
        message :message,
        success: false,
      };
    }
  }
  