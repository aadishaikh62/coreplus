using Coreplus.Sample.Api.Services;
using Coreplus.Sample.Api.Types;

namespace Coreplus.Sample.Api.Endpoints.FinancialReport
{
    public static class Generate
    {
        public static RouteGroupBuilder MapGenerateReport(this RouteGroupBuilder group)
        {
            group.MapPost("/generate", async (FinancialReportService reportService, ReportCriteria criteria) =>
            {
                var report = await reportService.GenerateReport(criteria);
                return Results.Ok(report);
            });

            return group;
        }
    }
}
