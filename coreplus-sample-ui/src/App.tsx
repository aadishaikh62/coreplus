import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from './axiosConfig';
import './App.css';
import PractitionerList from './PractitionerList';
import FinancialReport from './FinancialReport';
import AppointmentList from './AppointmentList';
import AppointmentDetails from './AppointmentDetails';
import { Practitioner, Appointment, FinancialReportDto } from './types';

function App() {
  const [supervisorPractitioners, setSupervisorPractitioners] = useState<Practitioner[]>([]);
  const [otherPractitioners, setOtherPractitioners] = useState<Practitioner[]>([]);
  const [selectedPractitioner, setSelectedPractitioner] = useState<Practitioner | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [financialReport, setFinancialReport] = useState<FinancialReportDto | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  useEffect(() => {
    async function fetchPractitioners() {
      try {
        const supervisorResponse = await axios.get('practitioners/supervisors');
        setSupervisorPractitioners(supervisorResponse.data);

        const otherResponse = await axios.get('practitioners');
        setOtherPractitioners(otherResponse.data);
      } catch (error) {
        console.error('Error fetching practitioners:', error);
      }
    }

    fetchPractitioners();
  }, []);

  useEffect(() => {
    // Fetch financial report and breakdown data when a practitioner is selected
    if (selectedPractitioner && selectedStartDate && selectedEndDate) {
      fetchFinancialReport(selectedPractitioner.id);
      setAppointments([]);
      setSelectedAppointment(null);
    }
  }, [selectedPractitioner, selectedStartDate, selectedEndDate]);

  const fetchFinancialReport = async (practitionerId: number) => {
    try {
      const response = await axios.post(`/report/generate`, {
        id: practitionerId,
        startDate: selectedStartDate?.toISOString(),
        endDate: selectedEndDate?.toISOString(),
      });
      // Only set the financial report if there are report items available
      if (response.data && response.data.reportItems.length > 0) {
        setFinancialReport(response.data);
      } else {
        setFinancialReport(null);
      }
    } catch (error) {
      console.error('Error fetching financial report:', error);
    }
  };

  const handleReportItemClick = async (monthYear: string) => {
    if (selectedPractitioner) {
      try {
        const breakdownResponse = await axios.get(`/practitioners/${selectedPractitioner.id}/breakdown/${monthYear}`);
        setAppointments(breakdownResponse.data);
      } catch (error) {
        console.error('Error fetching practitioner breakdown:', error);
      }
    }
  };

  const handleAppointmentClick = async (appointmentId: number) => {
    try {
      const appointmentResponse = await axios.get(`/practitioners/${appointmentId}/details`);
      setSelectedAppointment(appointmentResponse.data);
    } catch (error) {
      console.error('Error fetching appointment details:', error);
    }
  };

  return (
    <div className="h-screen w-full appshell">
      <div className="supervisors">
        <PractitionerList
          supervisorPractitioners={supervisorPractitioners}
          otherPractitioners={otherPractitioners}
          onPractitionerClick={setSelectedPractitioner}
        />
        <div>
          <h2>Select Date Range:</h2>
          <DatePicker
            selected={selectedStartDate}
            onChange={(date: Date | null) => setSelectedStartDate(date)}
            dateFormat="MM/dd/yyyy"
            placeholderText="Start Date"
          />
          <DatePicker
            selected={selectedEndDate}
            onChange={(date: Date | null) => setSelectedEndDate(date)}
            dateFormat="MM/dd/yyyy"
            placeholderText="End Date"
          />
        </div>
      </div>
      <div className="pracinfo">
        {financialReport && (
          <FinancialReport financialReport={financialReport} onItemClick={handleReportItemClick} />
        )}
        {appointments.length > 0 && (
          <AppointmentList appointments={appointments} onAppointmentClick={handleAppointmentClick} />
        )}
        {selectedAppointment && (
          <AppointmentDetails appointment={selectedAppointment} />
        )}
      </div>
    </div>
  );
}

export default App;
