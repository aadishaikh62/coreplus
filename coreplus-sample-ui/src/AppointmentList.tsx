import { Appointment } from './types';

type AppointmentListProps = {
  appointments: Appointment[];
  onAppointmentClick: (appointmentId: number) => void;
};

function AppointmentList({ appointments, onAppointmentClick }: AppointmentListProps) {
  return (
    <div>
      <h2>Breakdown</h2>
      <table>
        <thead>
          <tr>
            <th>Cost</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id} onClick={() => onAppointmentClick(appointment.id)}>
              <td>${appointment.cost}</td>
              <td>${appointment.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentList;
