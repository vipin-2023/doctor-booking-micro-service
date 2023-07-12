interface ResponseData {
    message: string;
    success: boolean;
    data?: any;
  }
  
  export class ResponseUtils {
    public static success(message: string, data?: any): ResponseData {
      return {
        message:message,
        success: true,
        data:data,
      };
    }
  
    public static error(message: string): ResponseData {
      return {
        message :message,
        success: false,
      };
    }
  }
  