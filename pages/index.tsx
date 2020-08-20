import Link from 'next/link';
import firebase from 'firebase/app';
import { useEffect } from 'react';
import styled from 'styled-components';

import 'firebase/auth';

const Home = () => {
  useEffect(() => {
    console.log('home');
  }, []);

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        console.log(result);
      });
  };

  return (
    <Container>
      <h1>Index</h1>
      <div>
        <Link href="/calendar">
          <a>Calendar</a>
        </Link>
        <hr />
        <button onClick={() => login()}>Login</button>
      </div>
    </Container>
  );
};

const Container = styled.main`
  display: block;
`;

export default Home;
