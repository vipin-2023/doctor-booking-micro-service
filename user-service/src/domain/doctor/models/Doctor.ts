export interface Doctor {
    userId: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    website?: string;
    address: string;
    specialization: string;
    experience: string;
    feesPerConsultation: number;
    status: string;
    timings: { [day: string]: { startTime: string; endTime: string } };
  }