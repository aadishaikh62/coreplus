using Coreplus.Sample.Api.Services;

namespace Coreplus.Sample.Api.Endpoints.Practitioner
{
    public static class GetPractitionerBreakdown
    {
        public static RouteGroupBuilder MapGetPractitionerBreakdown(this RouteGroupBuilder group)
        {
            group.MapGet("/{id}/breakdown/{monthYear}", async (AppointmentService appointmentService, long id, string monthYear) =>
            {
                var breakdownData = await appointmentService.GetPractitionerBreakdown(id, monthYear);
                return Results.Ok(breakdownData);
            });

            return group;
        }
    }

}
