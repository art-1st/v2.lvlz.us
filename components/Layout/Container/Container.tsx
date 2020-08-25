import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { observer } from 'mobx-react';
import useStores from '~/lib/hooks/useStores';
import { IUserStore } from '~/stores/userStore';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CssBaseline,
  Hidden,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import AccountIcon from '@material-ui/icons/AccountBox';
import ViewListIcon from '@material-ui/icons/ViewList';
import EventNoteIcon from '@material-ui/icons/EventNote';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    overflow: 'hidden',
    width: 32,
    height: 32,
    borderRadius: '50%',
  },
  avatarImg: {
    display: 'block',
    width: '100%',
    height: '100%',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerLink: {
    color: 'inherit',
    textDecoration: 'none',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Container: React.FC = observer(({ children }) => {
  const { userStore } = useStores<{ userStore: IUserStore }>();
  const router = useRouter();
  const classes = useStyles();
  const { isLoading, isAuthenticated, userData } = userStore;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Toolbar />
      <Divider />
      <div className={classes.drawerContainer}>
        <List>
          <Link href="/">
            <a className={classes.drawerLink}>
              <ListItem
                button
                selected={router.pathname === '/'}
                onClick={() => handleDrawerToggle()}
              >
                <ListItemIcon>
                  <ViewListIcon />
                </ListItemIcon>
                <ListItemText primary={'오늘'} />
              </ListItem>
            </a>
          </Link>
        </List>
        <Divider />
        <List>
          <Link href="/calendar">
            <a className={classes.drawerLink}>
              <ListItem
                button
                selected={router.pathname === '/calendar'}
                onClick={() => handleDrawerToggle()}
              >
                <ListItemIcon>
                  <EventNoteIcon />
                </ListItemIcon>
                <ListItemText primary={'스케줄'} />
              </ListItem>
            </a>
          </Link>
        </List>
      </div>
    </>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={() => handleDrawerToggle()}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap>
            LOVELYZIN.US
          </Typography>
          {!isLoading &&
            (isAuthenticated ? (
              <a
                href="#"
                role="button"
                className={classes.avatar}
                onClick={e => {
                  e.preventDefault();
                  router.push(`/user/${userData!.uid}`);
                }}
              >
                <img
                  src={userData?.photoURL ?? undefined}
                  alt={userData?.displayName ?? undefined}
                  className={classes.avatarImg}
                  referrerPolicy="no-referrer"
                />
              </a>
            ) : (
              <IconButton edge="start" color="inherit" onClick={() => router.push('signin')}>
                <AccountIcon />
              </IconButton>
            ))}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            className={classes.drawer}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <Toolbar />
        {children}
      </main>
    </div>
  );
});

export default Container;
