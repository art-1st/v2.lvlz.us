import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout, Menu, Typography } from 'antd';
import styled from 'styled-components';

const { Header: AntdHeader, Content: AntdContent, Footer: AntdFooter } = Layout;

const Container: React.FC = ({ children }) => {
  const router = useRouter();

  return (
    <ContainerLayout>
      <Header>
        <div className="logo">
          <h1>LOVELYZIN.US</h1>
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['/']}
          selectedKeys={[router.pathname]}
        >
          <Menu.Item key="/">
            <Link href="/">
              <a>Home</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="/calendar">
            <Link href="/calendar">
              <a>Calendar</a>
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content>{children}</Content>
      <Footer>
        <Typography>LOVELYZ UNOFFICIAL SCHEDULE CALENDAR</Typography>
      </Footer>
    </ContainerLayout>
  );
};

const ContainerLayout = styled(Layout)`
  background: #fff;
`;

const Header = styled(AntdHeader)`
  position: fixed;
  z-index: 3;
  width: 100%;
  padding: 0 16px 0 144px;
  background: rgba(255, 255, 255, 0.95) !important;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.075);

  .logo {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 20px;
    letter-spacing: -0.25px;
    user-select: none;

    h1 {
      position: relative;
      top: -1px;
      margin: 0;
      font-size: 14px;
      font-weight: bold;
      line-height: 1.3;
    }
  }

  .ant-menu {
    height: 65px;

    .ant-menu-item {
      margin: -2px 16px 0;
      padding: 0 8px;
    }
  }
`;

const Content = styled(AntdContent)`
  margin-top: 64px;
  background-color: #fff;
`;

const Footer = styled(AntdFooter)`
  display: block;
`;

export default Container;
