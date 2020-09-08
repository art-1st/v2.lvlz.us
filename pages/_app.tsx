import { AppProps } from 'next/app';
import { Provider } from 'mobx-react';
import { useEffect } from 'react';
import firebase from 'firebase/app';
import firebaseConfig from '~/config/firebase.config';
import RootStore from '~/stores';
import userStore from '~/stores/userStore';
import Container from '~/components/Layout/Container';

import 'mobx-react/batchingForReactDom';
import 'firebase/auth';
import 'moment/locale/ko';
import '~/styles/global.scss';
import 'antd/dist/antd.css';

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
      <Container>
        <Component {...pageProps} />
      </Container>
    </Provider>
  );
}

export default MyApp;
