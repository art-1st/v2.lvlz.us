import { NextPage } from 'next';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import useStores from '~/lib/hooks/useStores';
import { IUserStore } from '~/stores/userStore';

const SignIn: NextPage = observer(() => {
  const { userStore } = useStores<{ userStore: IUserStore }>();
  const { lovelinusData, isAuthenticated, isLoading } = userStore;

  if (isLoading) {
    return (
      <MyContainer>
        <div className="loading-screen">
          <LoadingOutlined style={{ fontSize: 24 }} />
        </div>
      </MyContainer>
    );
  }

  return (
    <MyContainer>
      {!isAuthenticated ? <p>Please Signin.</p> : <p>Hello. {lovelinusData?.displayName}</p>}
      {!isAuthenticated ? (
        <Button type="primary" onClick={() => userStore.signIn()}>
          Sign In
        </Button>
      ) : (
        <Button type="primary" danger onClick={() => userStore.signOut()}>
          Sign Out
        </Button>
      )}
    </MyContainer>
  );
});

const MyContainer = styled.div`
  padding: 16px;

  .loading-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 64px;
  }
`;

export default SignIn;
