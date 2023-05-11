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
    public  class ToDoData : IToDoData
    {
        private IConfiguration _config;

        public ToDoData(IConfiguration config)
        {
            _config = config;
        }

        public async Task<IEnumerable<ToDoModel>> GetToDo(DateTime Date, string Id)
        {
            
            using DbConnection connection = new SqlConnection(_config.GetConnectionString("Default"));
            var ret = await connection.QueryAsync<ToDoModel>("dbo.spToDo_Get", new {Day=Date.Date, UserId=Id}, commandType: CommandType.StoredProcedure);
            var sortlist = ret.ToList();
            sortlist.Sort((x, y)=> DateTime.Compare(x.Dat, y.Dat));
            return sortlist;
        }

        public async Task InsertToDo(ToDoModel model)
        {
            using DbConnection connection = new SqlConnection(_config.GetConnectionString("Default"));
            await connection.ExecuteAsync("dbo.spToDo_Insert", new { UserId = model.UserId, Note = model.Note, Dat = model.Dat }, commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateToDo(ToDoModel model)
        {
            using DbConnection connection = new SqlConnection(_config.GetConnectionString("Default"));
            await connection.ExecuteAsync("dbo.spToDo_Update", new { Id = model.Id, Note = model.Note, Dat = model.Dat, Done = model.Done }, commandType: CommandType.StoredProcedure);
        }

        public async Task ArchiveToDo(int Id)
        {
            using DbConnection connection = new SqlConnection(_config.GetConnectionString("Default"));
            await connection.ExecuteAsync("dbo.spToDo_Archive", new { Id = Id }, commandType: CommandType.StoredProcedure);
        }
    }
}
