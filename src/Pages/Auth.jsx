import React from 'react';
import { FlexColumn, PageContainer, PageHeader } from '../components/UI';
import RegisterForm from '../components/Auth/RegisterForm';
import AuthTabs from '../components/Auth/AuthTabs';

const Auth = () => {
  return (
    <>
      <title>Login | SQL Rentals </title>
      <PageContainer>
        <PageHeader>Auth</PageHeader>
        <FlexColumn>
          <AuthTabs />
          {/* <RegisterForm /> */}
        </FlexColumn>
      </PageContainer>
    </>
  );
};

export default Auth;
