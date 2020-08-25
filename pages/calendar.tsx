import { NextPage } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { ISchedule } from 'tui-calendar';
import { makeStyles } from '@material-ui/core/styles';

const TuiCalendar = dynamic(() => import('../components/TuiCalendar'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
  },
  calendarArea: {
    margin: `-${theme.spacing(3)}px`,
  },
}));

const CalendarPage: NextPage = () => {
  const [schedules, setSchedules] = useState<ISchedule[]>([]);
  const classes = useStyles();

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
    <div className={classes.root}>
      <div className={classes.calendarArea}>
        <TuiCalendar schedules={schedules} />
      </div>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
    </div>
  );
};

export default CalendarPage;
