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
import { IUserStore } from '~/stores/userStore';
import { uniqBy } from 'lodash';
import { Button, Drawer } from 'antd';

interface Props {}

const CalendarPage: NextPage<Props> = () => {
  const { store, userStore } = useStores<{ store: IStore; userStore: IUserStore }>();
  const fcRef = useRef<FullCalendar>(null);
  const [schedules, setSchedules] = useState<IScheduleData[]>([]);
  const [drawerSchedule, setDrawerSchedule] = useState<EventClickArg | null>(null);
  const [isEdit, setEdit] = useState(false);

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
    setEdit(false);
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
      <DrawerContainer
        title={drawerSchedule?.event.title}
        placement="bottom"
        closable={true}
        onClose={closeScheduleDrawer}
        visible={!!drawerSchedule}
        style={{ position: 'absolute' }}
        footer={
          userStore.isAdmin ? (
            <div>
              <Button type="primary">스케줄 수정</Button>
              <Button type="dashed" danger>
                스케줄 삭제
              </Button>
            </div>
          ) : undefined
        }
      >
        {userStore.isAdmin && <div>admin</div>}
        {!isEdit ? <div>{drawerSchedule?.event.extendedProps.desc}</div> : <div>dd</div>}
      </DrawerContainer>
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

const DrawerContainer = styled(Drawer)`
  .ant-drawer-header {
    padding-right: 48px;
    word-break: keep-all;
  }

  .btn-edit {
    display: inline-block;
    margin-left: 6px;
  }

  button + button {
    margin-left: 6px;
  }
`;

export default CalendarPage;
