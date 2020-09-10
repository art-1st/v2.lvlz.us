import { NextPage } from 'next';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import styled from 'styled-components';

interface Props {
  // scheduleData: IScheduleData[];
}

const CalendarPage: NextPage<Props> = () => {
  return (
    <CalendarContainer>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
      ></FullCalendar>
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
