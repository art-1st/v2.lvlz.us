import { NextPage } from 'next';
import router from 'next/router';
import useStores from '~/lib/hooks/useStores';
import { IUserStore } from '~/stores/userStore';
import { Button } from '@material-ui/core';

import Container from '@components/Layout/Container';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

const SignIn: NextPage = observer(() => {
  const { userStore } = useStores<{ userStore: IUserStore }>();
  const { isAuthenticated, isLoading } = userStore;

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) router.replace('/');
  }, [isAuthenticated, isLoading]);

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={() => userStore.signIn()}>
        sign in with google
      </Button>
    </Container>
  );
});

export default SignIn;
