using Coreplus.Sample.Api.Endpoints.Appointment;
using Coreplus.Sample.Api.Endpoints.Practitioner;

namespace Coreplus.Sample.Api.Endpoints.FinancialReport
{
    public static class Map
    {
        public static RouteGroupBuilder MapReportEndpoints(this RouteGroupBuilder group)
        {
            group.MapGenerateReport();
            return group;
        }
    }
}
