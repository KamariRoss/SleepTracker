using System;

namespace SleepTracker.Models
{
    public class SleepCounter
    {
        public int Id { get; set; }
        public int QualityRating { get; set; }
        public DateTime TimeStart { get; set; }
        public DateTime? TimeEnd { get; set; }

        public double HoursSlept
        {
            get

            {
                //succesfully subtract dates
                // convert to hours
                // TimeSpan value = (TimeEnd - TimeStart);
                if (TimeEnd != null)
                {
                    TimeSpan timeSpan = TimeEnd.Value.Subtract(TimeStart);
                    var totalSleepMinutes = (timeSpan.Hours * 60) + (timeSpan.Minutes);
                    // var hoursMinutes = (totalSleepSeconds / 3600);   
                    var totalSleepHours = totalSleepMinutes / 60.0;
                    return totalSleepHours;
                }
                else
                { return 0; }

            }
        }
    }
}