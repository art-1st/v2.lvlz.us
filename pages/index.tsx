import Link from 'next/link';
import styled from 'styled-components';

const Home = () => {
  return (
    <Container>
      <h1>Index</h1>
      <div>
        <Link href="/calendar">
          <a>Calendar</a>
        </Link>
      </div>
    </Container>
  );
};

const Container = styled.main`
  display: block;
`;

export default Home;
