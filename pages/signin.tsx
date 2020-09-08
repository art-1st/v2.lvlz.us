import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { Button } from 'antd';
import useStores from '~/lib/hooks/useStores';
import { IUserStore } from '~/stores/userStore';

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
      <Button type="primary" onClick={() => userStore.signIn()}>
        signin
      </Button>
    </div>
  );
});

export default SignIn;
