import { AppProps } from 'next/app';
import { Provider } from 'mobx-react';
import RootStore from '~/stores';
import { ThemeProvider } from 'styled-components';
import theme from '~/theme';

import 'mobx-react/batchingForReactDom';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

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
