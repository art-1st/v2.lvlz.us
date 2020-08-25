import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import useStores from '~/lib/hooks/useStores';
import { IUserStore } from '~/stores/userStore';
import { Button } from '@material-ui/core';

const SignIn: NextPage = observer(() => {
  const router = useRouter();
  const { userStore } = useStores<{ userStore: IUserStore }>();
  const { isAuthenticated, isLoading } = userStore;

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) router.replace('/');
  }, [router, isAuthenticated, isLoading]);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => userStore.signIn()}>
        sign in with google
      </Button>
    </div>
  );
});

export default SignIn;
