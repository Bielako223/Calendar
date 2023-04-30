

using calendar.Api;
using DataAccess.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<IToDoData, ToDoData>();
builder.Services.AddSingleton<IEventData, EventData>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.ConfigureToDoApi();
app.ConfigureEventApi();
app.Run();