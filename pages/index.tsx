import { NextPage } from 'next';
import { observer } from 'mobx-react';
import useStores from '~/lib/hooks/useStores';
import { IUserStore } from '~/stores/userStore';
import styled from 'styled-components';

const Home: NextPage = observer(() => {
  const { userStore } = useStores<{ userStore: IUserStore }>();

  return (
    <HomeContainer>
      home...
      {userStore.isAuthenticated && <div>Hello. {userStore.lovelinusData?.displayName}</div>}
    </HomeContainer>
  );
});

const HomeContainer = styled.div`
  padding: 16px;
`;

export default Home;
