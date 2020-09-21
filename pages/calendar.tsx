import { NextPage } from 'next';
import { useRef, useEffect, useState, useCallback } from 'react';
import FullCalendar, { EventClickArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import koLocale from '@fullcalendar/core/locales/ko';
import moment from 'moment';
import styled from 'styled-components';
import { getSchedules, IScheduleData } from '~/database/schedule';
import useStores from '~/lib/hooks/useStores';
import { IStore } from '~/stores/store';
import { IUserStore } from '~/stores/userStore';
import { uniqBy } from 'lodash';
import { Button, Drawer, Form, Input, DatePicker } from 'antd';
import Title from 'antd/lib/typography/Title';
import { FieldTimeOutlined, LineOutlined } from '@ant-design/icons';
import { scMixinScreenReaderOnly } from '~/styles/mixins';

const { RangePicker } = DatePicker;

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
        title={
          <div className="title-area">
            <Title level={5}>{drawerSchedule?.event.title}</Title>
            <dl className="time-box">
              <div className="time-item">
                <dt>시작시간</dt>
                <dd>
                  <i className="icon">
                    <FieldTimeOutlined />
                  </i>
                  <span className="text">
                    {drawerSchedule?.event.start?.toLocaleTimeString('ko', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </dd>
              </div>
              <div className="line">
                <LineOutlined style={{ fontSize: 12 }} />
              </div>
              <div className="time-item">
                <dt>종료시간</dt>
                <dd>
                  <span className="text">
                    {drawerSchedule?.event.end?.toLocaleTimeString('ko', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        }
        placement="bottom"
        closable={true}
        onClose={closeScheduleDrawer}
        visible={!!drawerSchedule}
        style={{ position: 'absolute' }}
        height={!isEdit ? '256px' : '75vh'}
        footer={
          userStore.isAdmin ? (
            <div className="footer-action-area">
              <div className="left">
                <Button type="primary" danger>
                  스케줄 삭제
                </Button>
              </div>
              <div className="right">
                {!isEdit ? (
                  <Button type="primary" onClick={() => setEdit(true)}>
                    수정
                  </Button>
                ) : (
                  <>
                    <Button type="primary" ghost onClick={() => setEdit(false)}>
                      수정 취소
                    </Button>
                    <Button type="primary">저장</Button>
                  </>
                )}
              </div>
            </div>
          ) : undefined
        }
      >
        {!isEdit ? (
          <div>{drawerSchedule?.event.extendedProps.desc}</div>
        ) : (
          <div>
            <Form name="schedule-edit-form" layout="vertical">
              <Form.Item label="스케줄 명">
                <Input defaultValue={drawerSchedule?.event.title} />
              </Form.Item>
              <Form.Item label="시작시간">
                <RangePicker
                  mode={['time', 'time']}
                  showTime
                  defaultValue={[
                    moment(drawerSchedule?.event.start),
                    moment(drawerSchedule?.event.end),
                  ]}
                ></RangePicker>
              </Form.Item>
              <Form.Item label="설명">
                <Input defaultValue={drawerSchedule?.event.extendedProps.desc} />
              </Form.Item>
              <Form.Item label="Class">
                <Input defaultValue={drawerSchedule?.event.classNames} />
              </Form.Item>
              <Form.Item label="장소">
                <Input defaultValue={drawerSchedule?.event.extendedProps.place} />
              </Form.Item>
              <Form.Item label="주소">
                <Input defaultValue={drawerSchedule?.event.extendedProps.address} />
              </Form.Item>
              <Form.Item label="출연">
                <Input defaultValue={drawerSchedule?.event.extendedProps.attend} />
              </Form.Item>
              <Form.Item label="링크">
                <Input defaultValue={drawerSchedule?.event.extendedProps.link} />
              </Form.Item>
              <Form.Item label="영상">
                <Input defaultValue={drawerSchedule?.event.extendedProps.media} />
              </Form.Item>
            </Form>
          </div>
        )}
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

  .title-area {
  }

  .time-box {
    margin: 4px 0 0;
    font-size: 14px;
  }

  .time-item {
    display: inline-block;
    line-height: 1.3;

    dt {
      ${scMixinScreenReaderOnly};
    }

    dd {
      display: inline-block;
      margin: 0;
      font-size: 13px;
      font-weight: 400;
    }

    .icon {
      opacity: 0.4;

      & + .text {
        margin-left: 6px;
      }
    }

    .text {
      display: inline-block;
      color: #555;
    }
  }

  .line {
    display: inline-block;
    position: relative;
    top: -1px;
    margin: 0 6px;
  }

  .btn-edit {
    display: inline-block;
    margin-left: 6px;
  }

  .ant-drawer-footer {
  }

  .footer-action-area {
    .left {
      float: left;
    }

    .right {
      float: right;
    }
  }

  button + button {
    margin-left: 6px;
  }
`;

export default CalendarPage;
