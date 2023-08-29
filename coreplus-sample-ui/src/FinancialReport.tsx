import React from 'react';
import { FinancialReportDto } from './types';

type FinancialReportProps = {
  financialReport: FinancialReportDto;
  onItemClick: (monthYear: string) => void;
};

const FinancialReport: React.FC<FinancialReportProps> = ({ financialReport, onItemClick }) => {
  if (!financialReport) {
    return <div>Select a practitioner and generate a report.</div>;
  }

  return (
    <div>
      <h2>Financial Report</h2>
      <p>Practitioner ID: {financialReport.practitionerId}</p>
      <p>Start Date: {financialReport.startDate}</p>
      <p>End Date: {financialReport.endDate}</p>
      <table>
        <thead>
          <tr>
            <th>Month/Year</th>
            <th>Revenue</th>
            <th>Cost</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {financialReport.reportItems.map((item, index) => (
            <tr key={index} onClick={() => onItemClick(item.monthYear)}>
              <td>{item.monthYear}</td>
              <td>{item.revenue}</td>
              <td>{item.cost}</td>
              <td>{item.profit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialReport;
