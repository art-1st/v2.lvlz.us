import { NextPage } from 'next';
import { useRef, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import styled from 'styled-components';
import { getSchedule, IScheduleData } from '~/database/schedule';

interface Props {}

const CalendarPage: NextPage<Props> = () => {
  const fcRef = useRef<FullCalendar>(null);
  const [schedules, setSchedules] = useState<IScheduleData[]>([]);

  useEffect(() => {
    const API = fcRef.current!.getApi();
    const startAt = API.view.activeStart.toISOString();
    const endAt = API.view.activeEnd.toISOString();

    onChangeDateRange(startAt, endAt);

    API.on('datesSet', d => {
      onChangeDateRange(d.start.toISOString(), d.end.toISOString());
    });
  }, []);

  const onChangeDateRange = async (startAt: string, endAt: string) => {
    const schedules = await getSchedule(startAt, endAt);

    setSchedules(prevSchedules => {
      return [...prevSchedules, ...schedules];
    });
  };

  return (
    <CalendarContainer>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        ref={fcRef}
        events={schedules as any}
      />
    </CalendarContainer>
  );
};

// interface Context extends NextPageContext {}

// CalendarPage.getInitialProps = async (ctx: Context): Promise<Props> => {
//   const scheduleData = await getSchedule('2020-08-30T00:00:00.000Z', '2020-10-10T00:00:00.000Z');

//   return { scheduleData };
// };

const CalendarContainer = styled.div`
  padding: 16px;
`;

export default CalendarPage;
