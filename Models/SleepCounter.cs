using System;

namespace SleepTracker.Models
{
    public class SleepCounter
    {
        public int Id { get; set; }
        public int QualityRating { get; set; }
        public int TimeStart { get; set; }
        public int TimeEnd { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
    }
}