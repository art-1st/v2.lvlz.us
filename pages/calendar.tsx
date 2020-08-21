import { NextPage } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { ISchedule } from 'tui-calendar';

import Container from '@components/Layout/Container';

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
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
    </Container>
  );
};

export default CalendarPage;
