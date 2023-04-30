using DataAccess.Data;
using DataAccess.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.SqlServer.Server;
using System.Globalization;

namespace calendar.Api
{
    public static class ToDoApi
    {
        public static void ConfigureToDoApi(this WebApplication app)
        {
            app.MapGet("/todo", GetToDo);
            app.MapPut("/todo", Insert);
            app.MapPost("/todo", Update);
            app.MapDelete("/todo", Delete);
        }

        public static async Task<IResult> GetToDo(DateTime Dat,int Id, IToDoData data)
        {
            try
            {
               
                //var result = DateTime.ParseExact(Dat, "yyyy-MM-dd", null);
                var ret = await data.GetToDo(Dat, Id);
                if (ret == null) return Results.NotFound();
                return Results.Ok(ret);
            }
            catch (Exception ex)
            {

                return Results.Problem(ex.Message);
            }
        }
        public static async Task<IResult> Insert(ToDoModel model, IToDoData data)
        {
            try
            {
                await data.InsertToDo(model);
                return Results.Ok();
            }
            catch (Exception ex)
            {

                return Results.Problem(ex.Message);
            }
        }

        public static async Task<IResult> Update(ToDoModel model, IToDoData data)
        {
            try
            {
                await data.UpdateToDo(model);
                return Results.Ok();
            }
            catch (Exception ex)
            {

                return Results.Problem(ex.Message);
            }
        }

        public static async Task<IResult> Delete(int id, IToDoData data)
        {
            try
            {
                await data.ArchiveToDo(id);
                return Results.Ok();
            }
            catch (Exception ex)
            {

                return Results.Problem(ex.Message);
            }
        }
    }
}
