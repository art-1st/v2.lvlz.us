import { useEffect, useRef } from 'react';
import Calendar from 'tui-calendar';
import ToastUICalendar, { ISchedule, ICalendarInfo, ITimezone } from 'tui-calendar';
import useStores from '~/lib/hooks/useStores';
import { IStore } from '~/stores/store';

import 'tui-code-snippet';

interface Props {
  calendars?: ICalendarInfo[];
  schedules: ISchedule[];
  timezones?: ITimezone[];
}

const TuiCalendar: React.FC<Props> = ({ schedules }) => {
  const { store } = useStores<{ store: IStore }>();
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

    store.registerCalendarRef(calendarRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!calendarRef.current) return;

    console.log(calendarRef.current, schedules);
    calendarRef.current.createSchedules(schedules);
  }, [schedules]);

  return <div id="calendar"></div>;
};

export default TuiCalendar;
