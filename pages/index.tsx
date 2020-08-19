import { observer } from 'mobx-react';
import styled from 'styled-components';

import 'mobx-react/batchingForReactDom';

const Home = observer(() => {
  return <Container>Hello</Container>;
});

const Container = styled.main`
  display: block;
`;

export default Home;
