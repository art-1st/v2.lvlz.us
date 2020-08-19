import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { ISchedule } from 'tui-calendar';

const TuiCalendar = dynamic(() => import('../components/TuiCalendar'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const CalendarPage: NextPage = () => {
  const [schedules, setSchedules] = useState<ISchedule[]>([]);

  useEffect(() => {
    setSchedules([
      {
        id: '1',
        calendarId: '0',
        title: 'Test Schedule :)',
        category: 'time',
        dueDateClass: '',
        start: new Date().toISOString(),
        end: new Date().toISOString(),
      },
    ]);
  }, []);

  return (
    <Container>
      <TuiCalendar schedules={schedules} />
    </Container>
  );
};

const Container = styled.main`
  display: block;
`;

export default CalendarPage;
