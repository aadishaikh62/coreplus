using Coreplus.Sample.Api.Services;
using Coreplus.Sample.Api.Types;

public record FinancialReportDto(int PractitionerId, DateTime StartDate, DateTime EndDate, IEnumerable<FinancialReportItem> ReportItems);

public record FinancialReportItem(string MonthYear, decimal Revenue, decimal Cost, decimal Profit);

public class FinancialReportService
{
    private readonly AppointmentService _appointmentService;

    public FinancialReportService(AppointmentService appointmentService)
    {
        _appointmentService = appointmentService;
    }

    public async Task<FinancialReportDto> GenerateReport(ReportCriteria criteria)
    {
        var appointments = await _appointmentService.GetAppointmentsByPractitionerAndDateRange(criteria.id, criteria.startDate, criteria.endDate);

        // Calculate financial report based on the filtered appointments
        var report = CalculateFinancialReport(appointments);

        return report;
    }

    // Implement your logic to calculate the financial report
    private FinancialReportDto CalculateFinancialReport(IEnumerable<Appointment> appointments)
    {
        var monthlyData = new Dictionary<string, (decimal Revenue, decimal Cost)>();

        foreach (var appointment in appointments)
        {
            var monthYearKey = appointment.date.ToString("yyyy-MM");

            if (!monthlyData.ContainsKey(monthYearKey))
            {
                monthlyData[monthYearKey] = (0, 0);
            }

            var (revenue, cost) = monthlyData[monthYearKey];
            monthlyData[monthYearKey] = (revenue + appointment.revenue, cost + appointment.cost);
        }

        var reportItems = monthlyData.Select(kv => new FinancialReportItem(
            MonthYear: kv.Key,
            Revenue: kv.Value.Revenue,
            Cost: kv.Value.Cost,
            Profit: kv.Value.Revenue - kv.Value.Cost));

        if (!reportItems.Any())
        {
            return null; // or create a special FinancialReportDto indicating no data available
        }

        var startDate = appointments.Min(a => a.date);
        var endDate = appointments.Max(a => a.date);

        return new FinancialReportDto(
            PractitionerId: appointments.FirstOrDefault()?.practitioner_id ?? 0,
            StartDate: startDate,
            EndDate: endDate,
            ReportItems: reportItems);
    }
}
