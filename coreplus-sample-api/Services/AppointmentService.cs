using Coreplus.Sample.Api.Types;
using Newtonsoft.Json;
using System.Globalization;
using System.Text.Json;

namespace Coreplus.Sample.Api.Services
{
    public record PractitionerBreakdownDto(long id, decimal revenue, decimal cost);

    public class AppointmentService
    {
        public async Task<IEnumerable<Appointment>> GetAppointments()
        {
            var jsonText = await File.ReadAllTextAsync(@"./Data/appointments.json");
            var appointments = JsonConvert.DeserializeObject<Appointment[]>(jsonText);
            return appointments;
        }

        public async Task<IEnumerable<Appointment>> GetAppointmentsByPractitionerAndDateRange(int practitionerId, DateTime startDate, DateTime endDate)
        {
            var appointments = await GetAppointments();
            var filteredAppointments = appointments
                .Where(appointment =>
                    appointment.practitioner_id == practitionerId &&
                    appointment.date >= startDate && appointment.date <= endDate)
                .ToList();
            return filteredAppointments;
        }

        public async Task<IEnumerable<PractitionerBreakdownDto>> GetPractitionerBreakdown(long practitionerId, string monthYear)
        {
            if (string.IsNullOrEmpty(monthYear) || !DateTime.TryParseExact(monthYear, "yyyy-MM", CultureInfo.InvariantCulture, DateTimeStyles.None, out var selectedDate))
            {
                throw new Exception("Invalid monthYear parameter");
            }

            // Fetch and return breakdown data for the specified practitioner and month/year from appointments.json
            var appointments = await GetAppointments();
            var breakdownData = appointments
                .Where(a => a.practitioner_id == practitionerId &&
                            a.date.Year == selectedDate.Year && a.date.Month == selectedDate.Month)
                .Select(a => new PractitionerBreakdownDto(a.id, a.revenue, a.cost));

            return breakdownData;
        }

        public async Task<Appointment> GetAppointmentDetails(long appointmentId)
        {
            // Fetch and return appointment details for the specified appointment from appointments.json
            var appointments = await GetAppointments();
            var appointment = appointments.FirstOrDefault(a => a.id == appointmentId);
            return appointment;
        }
    }
}
