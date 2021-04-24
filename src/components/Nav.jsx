import React from "react";
import { Layout, Menu, Button } from "antd";
import SignInModal from "./Auth/SignInModal";
import { Link } from "react-router-dom";

const clear = () => {
  localStorage.clear();
  window.location.replace("/home");
};

function Nav() {
  const { Header } = Layout;
  const token = localStorage.getItem("auth-token");
  const userInfo = localStorage.getItem("user-info")?.split(",");
  console.log("the token", token);
  console.log("user INFO", userInfo);

  return (
    <>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">
              <Link className="link" to="/home">
                Home
              </Link>
            </Menu.Item>
            {token && (
              <Menu.Item key="2">
                <Link className="link" to="review">
                  Review
                </Link>
              </Menu.Item>
            )}
            {userInfo && userInfo[3] == 1 && (
              <Menu.Item key="3">
                <Link className="link" to="/admin">
                  Admin
                </Link>
              </Menu.Item>
            )}
            {userInfo && (
              <Menu.Item key="4">
                {userInfo[1]}
              </Menu.Item>
            )}
            <Menu.Item key="5">
              {!token ? (
                <SignInModal />
              ) : (
                <Button onClick={clear}>Sign Out</Button>
              )}
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>
    </>
  );
}

export default Nav;
