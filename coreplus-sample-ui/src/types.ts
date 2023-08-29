export type Practitioner = {
    id: number;
    name: string;
    appointments: Appointment[];
  };
  
  export type FinancialReportDto = {
    practitionerId: number;
    startDate: string;
    endDate: string;
    reportItems: FinancialReportItem[];
  };
  
  export type FinancialReportItem = {
    monthYear: string;
    revenue: number;
    cost: number;
    profit: number;
  };
  
  export type Appointment = {
    id: number;
    date: string;
    client_name: string;
    appointment_type: string;
    duration: number;
    revenue: number;
    cost: number;
    practitioner_id: number;
  };
  
  