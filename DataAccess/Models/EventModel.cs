using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class EventModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Note { get; set; }
        public DateTime Dat { get; set; }
        public Boolean Done { get; set; } = false;
        public Boolean Archived { get; set; } = false;
    }
}
