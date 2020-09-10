import { NextPage, NextPageContext } from 'next';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { getSchedule, IScheduleData } from '~/database/schedule';

const FullCalendar = dynamic(() => import('~/components/FullCalendar'), {
  ssr: true,
  loading: () => <div>Loading</div>,
});

interface Props {
  scheduleData: IScheduleData[];
}

const CalendarPage: NextPage<Props> = ({ scheduleData }) => {
  return (
    <CalendarContainer>
      <FullCalendar></FullCalendar>
    </CalendarContainer>
  );
};

interface Context extends NextPageContext {}

CalendarPage.getInitialProps = async (ctx: Context): Promise<Props> => {
  const scheduleData = await getSchedule('2020-08-30T00:00:00.000Z', '2020-10-10T00:00:00.000Z');

  return { scheduleData };
};

const CalendarContainer = styled.div`
  padding: 16px;
`;

export default CalendarPage;
