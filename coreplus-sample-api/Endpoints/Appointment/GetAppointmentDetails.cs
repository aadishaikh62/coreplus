using Coreplus.Sample.Api.Services;

namespace Coreplus.Sample.Api.Endpoints.Appointment
{
    public static class GetAppointmentDetails
    {
        public static RouteGroupBuilder MapGetAppointmentDetails(this RouteGroupBuilder group)
        {
            group.MapGet("/{id}/details", async (AppointmentService appointmentService, long id) =>
            {
                var appointmentDetails = await appointmentService.GetAppointmentDetails(id);
                return Results.Ok(appointmentDetails);
            });

            return group;
        }
    }

}
