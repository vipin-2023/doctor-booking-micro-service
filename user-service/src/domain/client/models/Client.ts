export interface Client {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    isDoctor: boolean;
    notification: any[];
    seennotification: any[];
  }