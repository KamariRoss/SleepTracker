using System;

namespace SleepTracker.Models
{
    public class SleepCounter
    {
        public int Id { get; set; }
        public int QualityRating { get; set; }
        public DateTime TimeStart { get; set; }
        public DateTime TimeEnd { get; set; }

        public double HoursSlept
        {
            get

            {
                //succesfully subtract dates
                // convert to hours
                // TimeSpan value = (TimeEnd - TimeStart);
                TimeSpan value = TimeEnd.Subtract(TimeStart);
                var sleepTime = value.Hours + value.Minutes * 0.01;

                return sleepTime;

            }
        }
    }
}