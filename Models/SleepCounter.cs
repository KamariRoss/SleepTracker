using System;

namespace SleepTracker.Models
{
    public class SleepCounter
    {
        public int Id { get; set; }
        public int QualityRating { get; set; }
        public DateTime TimeStart { get; set; }
        public DateTime? TimeEnd { get; set; }

        public int HoursSlept
        {
            get
            {
                // TODO: Make this a formula
                //       that involves TimeEnd and TimeStart
                return 42;
            }
        }
    }
}