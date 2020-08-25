import { AppProps } from 'next/app';
import { Provider } from 'mobx-react';
import { useEffect } from 'react';
import firebase from 'firebase/app';
import firebaseConfig from '~/config/firebase.config';
import RootStore from '~/stores';
import userStore from '~/stores/userStore';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '~/theme';
import Container from '~/components/Layout/Container';

import 'mobx-react/batchingForReactDom';
import 'firebase/auth';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      firebase.auth().onAuthStateChanged(user => {
        userStore.auth(user);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Provider {...RootStore}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
