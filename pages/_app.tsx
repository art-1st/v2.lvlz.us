import { AppProps } from 'next/app';
import { Provider } from 'mobx-react';
import RootStore from '~/stores';
import { ThemeProvider } from 'styled-components';
import theme from '~/theme';

const firebaseConfig = {
  apiKey: 'AIzaSyBRZMU2ZJ73fwzTM6bFkVWjc6bvMP3gGKE',
  authDomain: 'lvlzus.firebaseapp.com',
  databaseURL: 'https://lvlzus.firebaseio.com',
  projectId: 'lvlzus',
  storageBucket: 'lvlzus.appspot.com',
  messagingSenderId: '16174730460',
  appId: '1:16174730460:web:51bc2cb27a1aecbabe7819',
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider {...RootStore}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
