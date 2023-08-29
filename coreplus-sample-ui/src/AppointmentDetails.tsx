import React from 'react';
import { Appointment } from './types';

type AppointmentDetailsProps = {
  appointment: Appointment;
};

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({ appointment }) => {
  return (
    <div>
      <h2>Appointment Details</h2>
      <p>Date: {appointment.date}</p>
      <p>Client: {appointment.client_name}</p>
      <p>Appointment Type: {appointment.appointment_type}</p>
      <p>Duration: {appointment.duration} minutes</p>
      <p>Revenue: ${appointment.revenue.toFixed(2)}</p>
      <p>Cost: ${appointment.cost.toFixed(2)}</p>
      {/* Display other appointment details */}
    </div>
  );
};

export default AppointmentDetails;
