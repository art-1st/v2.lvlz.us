import Header from '@components/Layout/Header';

const Container: React.FC = ({ children }) => {
  return (
    <>
      <Header key="header" />
      <main key="content">{children}</main>
    </>
  );
};

export default Container;
