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
      </div>
    </Container>
  );
});

export default Home;
