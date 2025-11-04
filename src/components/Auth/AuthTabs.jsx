import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthTabs = () => {
  return (
    <Tabs defaultValue="login" className="w-11/12 max-w-[800px] flex flex-col ">
      <TabsList className="w-full cursor-pointer bg-sqlBlue">
        <TabsTrigger
          className="text-lg font-bold data-[state=active]:dark:bg-gray-900 dark:text-white data-[state=inactive]:text-white"
          value="login"
        >
          Login
        </TabsTrigger>
        <TabsTrigger
          className="text-lg font-bold data-[state=active]:dark:bg-gray-900 dark:text-white data-[state=inactive]:text-white"
          value="register"
        >
          Register
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
      <TabsContent value="register">
        <RegisterForm />
      </TabsContent>
    </Tabs>
  );
};

export default AuthTabs;
