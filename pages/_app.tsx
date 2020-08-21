import { AppProps } from 'next/app';
import { Provider } from 'mobx-react';
import { useEffect } from 'react';
import firebase from 'firebase/app';
import firebaseConfig from '~/config/firebase.config';
import RootStore from '~/stores';
import userStore from '~/stores/userStore';
import { ThemeProvider } from 'styled-components';
import theme from '~/theme';

import 'firebase/auth';
import 'mobx-react/batchingForReactDom';
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
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
