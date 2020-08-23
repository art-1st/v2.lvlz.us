import { useEffect } from 'react';
import { NextPage } from 'next';
import router from 'next/router';
import { observer } from 'mobx-react';
import useStores from '~/lib/hooks/useStores';
import { IUserStore } from '~/stores/userStore';
import { Button } from '@material-ui/core';

import Container from '@components/Layout/Container';

const User: NextPage = observer(() => {
  const { userStore } = useStores<{ userStore: IUserStore }>();

  useEffect(() => {
    console.log(router);
  }, []);

  const signOut = async () => {
    await userStore.signOut();
    router.push('/');
  };

  return (
    <Container>
      <div>
        <Button variant="contained" color="secondary" onClick={() => signOut()}>
          signout
        </Button>
      </div>
    </Container>
  );
});

export default User;
