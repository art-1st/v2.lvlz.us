import { NextPage } from 'next';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import useStores from '~/lib/hooks/useStores';
import { IUserStore } from '~/stores/userStore';

const Home: NextPage = observer(() => {
  const { userStore } = useStores<{ userStore: IUserStore }>();

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
      {userStore.isAuthenticated && <div>Hello. {userStore.lovelinusData?.displayName}</div>}
      {!userStore.isAuthenticated ? (
        <Button type="primary" onClick={() => userStore.signIn()}>
          Sign In
        </Button>
      ) : (
        <Button type="primary" danger onClick={() => userStore.signOut()}>
          Sign Out
        </Button>
      )}
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
