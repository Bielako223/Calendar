using DataAccess.Models;

namespace DataAccess.Data
{
    public interface IToDoData
    {
        Task ArchiveToDo(int Id);
        Task<IEnumerable<ToDoModel>> GetToDo(DateTime Date, string Id);
        Task InsertToDo(ToDoModel model);
        Task UpdateToDo(ToDoModel model);
    }
}