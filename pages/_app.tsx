import { AppProps } from 'next/app';
import { Provider } from 'mobx-react';
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
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.auth().onAuthStateChanged(user => {
    userStore.auth(user);
  });
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider {...RootStore}>
      <Container>
        <Component {...pageProps} />
      </Container>
    </Provider>
  );
}

export default MyApp;
