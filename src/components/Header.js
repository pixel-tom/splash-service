import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Layout,
  Input,
  Button,
  Avatar,
  Card,
  Popover,
  Typography,
  Space,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FcGoogle } from "react-icons/fc";
import {
  signInWithGoogle,
  onAuthChange,
  getCurrentUser,
  signOutUser,
} from "../../firebase";
import { useNotification } from "@/context/NotificationProvider"; // Adjust the path as needed

const { Header } = Layout;
const { Text } = Typography;

const CustomHeader = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const notify = useNotification();

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      const currentUser = getCurrentUser();
      setUser(currentUser);
      router.push("/"); // Redirect to the home page after successful login
      notify(
        "success",
        "Login Successful",
        "You have successfully signed in with Google."
      );
    } catch (error) {
      console.error("Sign in with Google failed", error);
      notify("error", "Login Failed", "Unable to sign in with Google.");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setUser(null);
      router.push("/"); // Redirect to the home page after sign out
      notify(
        "success",
        "Logout Successful",
        "You have successfully signed out."
      );
    } catch (error) {
      console.error("Sign out failed", error);
      notify("error", "Logout Failed", "Unable to sign out.");
    }
  };

  const userContent = (
    <Card bordered={false} style={{ width: 300, textAlign: "center" }}>
      <Space direction="vertical" size="middle">
        <Avatar src={user?.photoURL} size={64} />
        <Typography.Title level={4}>{user?.displayName}</Typography.Title>
        <Text type="secondary">{user?.email}</Text>
        <Button type="primary" danger onClick={handleSignOut}>
          Sign Out
        </Button>
      </Space>
    </Card>
  );

  return (
    <Header
      style={{
        backgroundColor: "#fefeff",
        color: "#f5f5f5",
        borderTop: "1px solid #e5e5e5",
        borderLeft: "1px solid #e5e5e5",
      }}
      className="px-4 rounded-tl-lg mt-3"
    >
      <div className="flex w-full gap-4 justify-between items-center">
        <div className="relative flex-1">
          <Input
            prefix={<SearchOutlined style={{ color: "#0fa7de" }} />}
            placeholder="Search..."
            style={{
              backgroundColor: "#f5f5f5",
              color: "#084b73",
              borderColor: "#0fa7de",
              borderRadius: "50px",
              paddingLeft: "40px",
            }}
            className="py-2 ml-10 w-52 lg:w-[400px] md:ml-0 invisible md:visible"
          />
        </div>
        {user ? (
          <div className="flex items-center gap-1">
            <Text
              className="invisible md:visible"
              style={{ color: "#084b73", marginRight: 8 }}
            >
              {user.displayName}
            </Text>
            <Popover
              content={userContent}
              placement="bottomRight"
              trigger="click"
            >
              <Avatar src={user.photoURL} size="large" />
            </Popover>
          </div>
        ) : (
          <Button
            size="large"
            icon={<FcGoogle />}
            type="primary"
            style={{
              backgroundColor: "#ffffff",
              color: "#084b73",
              borderColor: "#0fa7de",
            }}
            onClick={handleGoogleSignIn}
          >
            Sign in
          </Button>
        )}
      </div>
    </Header>
  );
};

export default CustomHeader;
