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
      useCreationPopup: true,
      useDetailPopup: true,
      template: {
        monthDayname: function (dayname) {
          return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
        },
      },
    });

    calendarRef.current.setCalendarColor('c-vlive', {
      color: '#e8e8e8',
      bgColor: '#585858',
      borderColor: '#54f7ff',
      dragBgColor: '#585858',
    });
    calendarRef.current.setCalendarColor('c-tv', {
      color: '#282828',
      bgColor: '#dc9656',
      borderColor: '#a1b56c',
      dragBgColor: '#dc9656',
    });
    calendarRef.current.setCalendarColor('c-radio', {
      color: '#a16946',
      bgColor: '#ab4642',
      borderColor: '#a1b56c',
      dragBgColor: '#ab4642',
    });

    store.registerCalendarRef(calendarRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!calendarRef.current) return;

    calendarRef.current.clear();
    calendarRef.current.createSchedules(schedules);
  }, [schedules]);

  return <div id="calendar"></div>;
};

export default TuiCalendar;
