import React from 'react';
import { PageContainer, PageHeader } from '../components/UI';
import AdminTabs from '../components/Admin/AdminTabs';

const Admin = () => {
  return (
    <>
      <title>Admin Panel | Tentlify</title>
      <PageContainer>
        <PageHeader>Admin</PageHeader>
        <AdminTabs />
      </PageContainer>
    </>
  );
};

export default Admin;
