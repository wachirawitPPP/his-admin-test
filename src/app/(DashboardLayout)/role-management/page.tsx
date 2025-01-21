"use client"
import React from 'react';
import BreadcrumbComp from '../layout/shared/breadcrumb/BreadcrumbComp';
import RoleManagementApps from '@/app/components/role-management';

const BCrumb = [
    {
      to: "/",
      title: "Home",
    },
    {
      title: "Role Management",
    },
  ];

const Page = () => {
    return (
        <div>
             <BreadcrumbComp title="Role Management" items={BCrumb} />
             <RoleManagementApps/>
        </div>
    );
}

export default Page;
