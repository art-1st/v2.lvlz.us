import { NextPage } from 'next';
import { useRef, useEffect, useState, useCallback } from 'react';
import FullCalendar, { EventClickArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import koLocale from '@fullcalendar/core/locales/ko';
import styled from 'styled-components';
import { getSchedules, IScheduleData } from '~/database/schedule';
import useStores from '~/lib/hooks/useStores';
import { IStore } from '~/stores/store';
import { uniqBy } from 'lodash';
import { Drawer } from 'antd';

interface Props {}

const CalendarPage: NextPage<Props> = () => {
  const { store } = useStores<{ store: IStore }>();
  const fcRef = useRef<FullCalendar>(null);
  const [schedules, setSchedules] = useState<IScheduleData[]>([]);
  const [drawerSchedule, setDrawerSchedule] = useState<EventClickArg | null>(null);

  const onChangeDateRange = useCallback(
    async (start: Date, end: Date) => {
      const newSchedules = await getSchedules(start.toISOString(), end.toISOString());
      setSchedules(prevSchedules => uniqBy([...prevSchedules, ...newSchedules], 'id'));
      store.setLoadedDate(start, end);
    },
    [store],
  );

  useEffect(() => {
    const API = fcRef.current!.getApi();
    const start = API.view.activeStart;
    const end = API.view.activeEnd;

    onChangeDateRange(start, end);

    API.on('datesSet', d => {
      if (store.loadedStartDate > d.start || store.loadedEndDate < d.end) {
        onChangeDateRange(d.start, d.end);
      }
    });

    API.on('eventClick', e => {
      setDrawerSchedule(e);
    });
  }, [onChangeDateRange, store]);

  const closeScheduleDrawer = () => {
    setDrawerSchedule(null);
  };

  return (
    <CalendarContainer>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        ref={fcRef}
        events={schedules as any}
        height="auto"
        locale={koLocale}
      />
      <Drawer
        title={drawerSchedule?.event.title}
        placement="bottom"
        closable={true}
        onClose={closeScheduleDrawer}
        visible={!!drawerSchedule}
        style={{ position: 'absolute' }}
      >
        {drawerSchedule?.event.extendedProps.desc}
      </Drawer>
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
