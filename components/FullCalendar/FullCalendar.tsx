import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useRef, useEffect } from 'react';

const FullCalendar: React.FC = () => {
  const calendarRoot = useRef(null);

  useEffect(() => {
    const calendar = new Calendar(calendarRoot.current!, {
      plugins: [dayGridPlugin],
    });

    calendar.render();
  }, []);

  return <div ref={calendarRoot}></div>;
};

export default FullCalendar;
