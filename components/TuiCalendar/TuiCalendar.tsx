import { useEffect, useRef } from 'react';
import Calendar from 'tui-calendar';
import ToastUICalendar, { ISchedule, ICalendarInfo, ITimezone } from 'tui-calendar';

import 'tui-code-snippet';

interface Props {
  calendars?: ICalendarInfo[];
  schedules?: ISchedule[];
  timezones?: ITimezone[];
}

const TuiCalendar: React.FC<Props> = ({ schedules }) => {
  const calendarRef = useRef<Calendar>();

  useEffect(() => {
    calendarRef.current = new ToastUICalendar('#calendar', {
      defaultView: 'month',
      taskView: true,
      template: {
        monthDayname: function (dayname) {
          return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
        },
      },
    });
  }, []);

  useEffect(() => {
    if (!calendarRef.current) return;

    calendarRef.current.createSchedules(schedules ?? []);
  }, [schedules]);

  return <div id="calendar"></div>;
};

export default TuiCalendar;
