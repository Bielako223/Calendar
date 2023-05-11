using DataAccess.Data;
using DataAccess.Models;

namespace calendar.Api
{
    public static class EventApi
    {
        public static void ConfigureEventApi(this WebApplication app)
        {
            app.MapGet("/eventday", GetEventForDay);
            app.MapGet("/eventmonth", GetEventForMonth);
            app.MapPost("/event_insert", Insert);
            app.MapPut("/event_update", Update);
            app.MapDelete("/event_delete", Delete);
        }

        public static async Task<IResult> GetEventForDay(DateTime Dat, string Id, IEventData data)
        {
            try
            {

                //var result = DateTime.ParseExact(Dat, "yyyy-MM-dd", null);
                var ret = await data.GetEventForDay(Dat, Id);
                if (ret == null) return Results.NotFound();
                return Results.Ok(ret);
            }
            catch (Exception ex)
            {

                return Results.Problem(ex.Message);
            }
        }

        public static async Task<IResult> GetEventForMonth(DateTime Dat, string Id, IEventData data)
        {
            try
            {

                //var result = DateTime.ParseExact(Dat, "yyyy-MM-dd", null);
                var ret = await data.GetEventForMonth(Dat, Id);
                if (ret == null) return Results.NotFound();
                return Results.Ok(ret);
            }
            catch (Exception ex)
            {

                return Results.Problem(ex.Message);
            }
        }
        public static async Task<IResult> Insert(EventModel model, IEventData data)
        {
            try
            {
                await data.InsertEvent(model);
                return Results.Ok();
            }
            catch (Exception ex)
            {

                return Results.Problem(ex.Message);
            }
        }

        public static async Task<IResult> Update(EventModel model, IEventData data)
        {
            try
            {
                await data.UpdateEvent(model);
                return Results.Ok();
            }
            catch (Exception ex)
            {

                return Results.Problem(ex.Message);
            }
        }

        public static async Task<IResult> Delete(int id, IEventData data)
        {
            try
            {
                await data.ArchiveEvent(id);
                return Results.Ok();
            }
            catch (Exception ex)
            {

                return Results.Problem(ex.Message);
            }
        }
    }

}
