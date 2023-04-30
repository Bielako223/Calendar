﻿using DataAccess.Models;

namespace DataAccess.Data
{
    public interface IEventData
    {
        Task ArchiveEvent(int Id);
        Task<IEnumerable<EventModel>> GetEventForDay(DateTime Date, int Id);
        Task<IEnumerable<EventModel>> GetEventForMonth(DateTime Date, int Id);
        Task InsertEvent(EventModel model);
        Task UpdateEvent(EventModel model);
    }
}