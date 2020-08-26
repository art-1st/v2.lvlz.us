import { NextPage } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getSchedule } from '~/database/schedule';
import useStores from '~/lib/hooks/useStores';
import { IStore } from '~/stores/store';
import { IUserStore } from '~/stores/userStore';
import Calendar, { ISchedule } from 'tui-calendar';
import { convertScheduleToTuiSchedule } from '~/utils/schedule';

const TuiCalendar = dynamic(() => import('../components/TuiCalendar'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
  },
  header: {
    display: 'block',
    margin: '24px 0',
  },
  calendarArea: {
    margin: `-${theme.spacing(3)}px`,
  },
}));

const CalendarPage: NextPage = observer(() => {
  const { store, userStore } = useStores<{ store: IStore; userStore: IUserStore }>();
  const [dateRange, setDateRange] = useState<{ start: string; end: string } | null>(null);
  const [scheduleData, setScheduleData] = useState<ISchedule[]>([]);
  const classes = useStyles();
  const calendarRef = useRef<Calendar | null>(null);

  const { initialized } = userStore;

  useEffect(() => {
    calendarRef.current = store.calendarRef;
  }, [store.calendarRef]);

  useEffect(() => {
    if (initialized && calendarRef.current) {
      const rangeStart = calendarRef.current.getDateRangeStart().toDate().toISOString();
      const rangeEnd = calendarRef.current.getDateRangeEnd().toDate().toISOString();
      setDateRange({
        start: rangeStart,
        end: rangeEnd,
      });

      getSchedule(rangeStart!, rangeEnd!).then(data => {
        setScheduleData(convertScheduleToTuiSchedule(data));
      });
    }
  }, [initialized]);

  useEffect(() => {
    if (!dateRange) return;

    getSchedule(dateRange.start, dateRange.end).then(data => {
      setScheduleData(convertScheduleToTuiSchedule(data));
    });
  }, [dateRange]);

  const prevMonth = () => {
    if (!calendarRef.current) return;

    calendarRef.current.prev();
    const rangeStart = calendarRef.current.getDateRangeStart().toDate().toISOString();
    const rangeEnd = calendarRef.current.getDateRangeEnd().toDate().toISOString();
    setDateRange({
      start: rangeStart,
      end: rangeEnd,
    });
  };

  const nextMonth = () => {
    if (!calendarRef.current) return;

    calendarRef.current.next();
    const rangeStart = calendarRef.current.getDateRangeStart().toDate().toISOString();
    const rangeEnd = calendarRef.current.getDateRangeEnd().toDate().toISOString();
    setDateRange({
      start: rangeStart,
      end: rangeEnd,
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Button onClick={() => prevMonth()}>Prev</Button>
        <Button onClick={() => nextMonth()}>Next</Button>
      </div>
      <div className={classes.calendarArea}>
        <TuiCalendar schedules={scheduleData} />
      </div>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
    </div>
  );
});

export default CalendarPage;
