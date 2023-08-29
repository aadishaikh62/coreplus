using Coreplus.Sample.Api;
using Coreplus.Sample.Api.Endpoints.FinancialReport;
using Coreplus.Sample.Api.Endpoints.Practitioner;
using Coreplus.Sample.Api.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<PractitionerService>();
builder.Services.AddSingleton<AppointmentService>();
builder.Services.AddSingleton<FinancialReportService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:5173") // Update with your frontend's URL
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

var app = builder.Build();

var practitionerEndpoints = app.MapGroup("/practitioners");
practitionerEndpoints.MapPractitionerEndpoints();

var reportEndpoints = app.MapGroup("/report");
reportEndpoints.MapReportEndpoints();

app.UseCors("AllowSpecificOrigin"); // Apply CORS policy

app.Run();
