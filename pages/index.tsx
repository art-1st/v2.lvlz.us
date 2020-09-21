import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Card } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import useStores from '~/lib/hooks/useStores';
import { IUserStore } from '~/stores/userStore';
import { getRecentSchedules, IScheduleData } from '~/database/schedule';

const Home: NextPage = observer(() => {
  const { userStore } = useStores<{ userStore: IUserStore }>();
  const [recentSchedules, setRecentSchedules] = useState<IScheduleData[]>([]);

  useEffect(() => {
    getRecentSchedules(10).then(schedules => {
      setRecentSchedules(schedules);
    });
  }, []);

  if (userStore.isLoading) {
    return (
      <HomeContainer>
        <div className="loading-screen">
          <LoadingOutlined style={{ fontSize: 24 }} />
        </div>
      </HomeContainer>
    );
  }

  return (
    <HomeContainer>
      <div className="card-container">
        {recentSchedules.map(schedule => (
          <Card size="small" title={schedule.title} className="card" key={schedule.id}>
            <p>
              {new Date(schedule.start).toLocaleTimeString('ko', {
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              ~{' '}
              {new Date(schedule.end).toLocaleTimeString('ko', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            <p>{schedule.desc}</p>
          </Card>
        ))}
      </div>
    </HomeContainer>
  );
});

const HomeContainer = styled.div`
  padding: 16px;

  .loading-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 64px;
  }

  .card-container {
    .card {
      margin-top: 12px;
    }
  }
`;

export default Home;
