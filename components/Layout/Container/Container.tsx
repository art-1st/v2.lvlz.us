import router from 'next/router';
import { observer } from 'mobx-react';
import useStores from '~/lib/hooks/useStores';
import { IUserStore } from '~/stores/userStore';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountIcon from '@material-ui/icons/AccountBox';
import { useCallback } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    paddingTop: 64,
  },
}));

const Container: React.FC = observer(({ children }) => {
  const { userStore } = useStores<{ userStore: IUserStore }>();
  const classes = useStyles();
  const { isAuthenticated, userData } = userStore;

  const handleClickAccount = useCallback(() => {
    if (isAuthenticated) {
      router.push(`/user/[uid]`, `/user/@${userData?.uid}`);
    } else {
      router.push('/signin');
    }
  }, [isAuthenticated, userData]);

  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            LOVELYZIN.US
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => handleClickAccount()}
            disabled={userStore.isLoading}
          >
            <AccountIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main className={classes.container}>{children}</main>
    </>
  );
});

export default Container;
