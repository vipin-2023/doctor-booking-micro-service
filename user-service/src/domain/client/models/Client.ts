 export interface Client {
    id:string,
    name: string;
    email: string;
    password: string;
    role: 'user' | 'doctor' | 'admin';
    notification: any[];
    seennotification: any[];
  }