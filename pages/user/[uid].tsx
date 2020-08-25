import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import useStores from '~/lib/hooks/useStores';
import { IUserStore } from '~/stores/userStore';
import { Button } from '@material-ui/core';

const User: NextPage = observer(() => {
  const router = useRouter();
  const { userStore } = useStores<{ userStore: IUserStore }>();

  const signOut = async () => {
    await userStore.signOut();
    router.push('/');
  };

  return (
    <div>
      <div>
        <Button variant="contained" color="secondary" onClick={() => signOut()}>
          signout
        </Button>
      </div>
    </div>
  );
});

export default User;
