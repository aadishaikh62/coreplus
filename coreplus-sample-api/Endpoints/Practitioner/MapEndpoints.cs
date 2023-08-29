using Coreplus.Sample.Api.Endpoints.Appointment;
using Coreplus.Sample.Api.Endpoints.FinancialReport;

namespace Coreplus.Sample.Api.Endpoints.Practitioner;

public static class MapEndpoints
{
    public static RouteGroupBuilder MapPractitionerEndpoints(this RouteGroupBuilder group)
    {
        group.MapGetAllPractitioners();
        group.MapGetSupervisorPractitioners();
        group.MapGetPractitionerBreakdown();
        group.MapGetAppointmentDetails();
        return group;
    }
}