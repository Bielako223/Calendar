using Dapper;
using DataAccess.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace DataAccess.Data
{
    public class EventData : IEventData
    {
        private IConfiguration _config;

        public EventData(IConfiguration config)
        {
            _config = config;
        }

        public async Task<IEnumerable<EventModel>> GetEventForDay(DateTime Date, string Id)
        {

            using DbConnection connection = new SqlConnection(_config.GetConnectionString("Default"));
            var ret = await connection.QueryAsync<EventModel>("dbo.spEvent_Get", new { Day = Date.Date, UserId = Id }, commandType: CommandType.StoredProcedure);
            return ret.ToList();
        }
        public async Task<IEnumerable<EventModel>> GetEventForMonth(DateTime Date, string Id)
        {

            using DbConnection connection = new SqlConnection(_config.GetConnectionString("Default"));
            var ret = await connection.QueryAsync<EventModel>("dbo.spEvent_GetMonth", new { Day = Date.Date, UserId = Id }, commandType: CommandType.StoredProcedure);
            var sortlist = ret.ToList();
            sortlist.Sort((x, y) => DateTime.Compare(x.Dat, y.Dat));
            return sortlist;;
        }

        public async Task InsertEvent(EventModel model)
        {
            using DbConnection connection = new SqlConnection(_config.GetConnectionString("Default"));
            await connection.ExecuteAsync("dbo.spEvent_Insert", new { UserId = model.UserId, Note = model.Note, Dat = model.Dat }, commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateEvent(EventModel model)
        {
            using DbConnection connection = new SqlConnection(_config.GetConnectionString("Default"));
            await connection.ExecuteAsync("dbo.spEvent_Update", new { Id = model.Id, Note = model.Note, Done = model.Done }, commandType: CommandType.StoredProcedure);
        }

        public async Task ArchiveEvent(int Id)
        {
            using DbConnection connection = new SqlConnection(_config.GetConnectionString("Default"));
            await connection.ExecuteAsync("dbo.spEvent_Archive", new { Id = Id }, commandType: CommandType.StoredProcedure);
        }
    }
}
