import { NextPage } from 'next';
import Link from 'next/link';
import { observer } from 'mobx-react';
import useStores from '~/lib/hooks/useStores';
import { IUserStore } from '~/stores/userStore';

import Container from '@components/Layout/Container';

const Home: NextPage = observer(() => {
  const { userStore } = useStores<{ userStore: IUserStore }>();

  return (
    <Container>
      <h1>Index</h1>
      <div>
        <Link href="/calendar">
          <a>Calendar</a>
        </Link>
        {userStore.isAuthenticated && <div>Hello. {userStore.userData?.displayName}</div>}
        <hr />
        {userStore.isLoading ? (
          <button disabled>Loading</button>
        ) : !userStore.isAuthenticated ? (
          <button onClick={() => userStore.signIn()}>SignIn</button>
        ) : (
          <button onClick={() => userStore.signOut()}>SignOut</button>
        )}
      </div>
    </Container>
  );
});

export default Home;
