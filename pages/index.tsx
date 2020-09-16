import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Button } from 'antd';
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
      {!userStore.isAuthenticated ? (
        <p>Please Signin.</p>
      ) : (
        <p>Hello. {userStore.lovelinusData?.displayName}</p>
      )}
      {!userStore.isAuthenticated ? (
        <Button type="primary" onClick={() => userStore.signIn()}>
          Sign In
        </Button>
      ) : (
        <Button type="primary" danger onClick={() => userStore.signOut()}>
          Sign Out
        </Button>
      )}
      {recentSchedules.map(schedule => (
        <div key={schedule.id}>
          <span>{schedule.start}</span>
          <strong>{schedule.title}</strong>
        </div>
      ))}
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
`;

export default Home;
