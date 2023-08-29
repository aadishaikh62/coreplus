namespace Coreplus.Sample.Api.Types;

public record Appointment(int id, DateTime date, string client_name, string appointment_type, int duration, decimal revenue, decimal cost, int practitioner_id);
