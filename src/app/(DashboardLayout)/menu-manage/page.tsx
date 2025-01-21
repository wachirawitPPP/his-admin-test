import React from 'react';
import BreadcrumbComp from '../layout/shared/breadcrumb/BreadcrumbComp';
import MenuMangement from '@/app/components/menu-manage';

const BCrumb = [
    {
      to: "/",
      title: "Home",
    },
    {
      title: "Menu Group",
    },
  ];
const Page = () => {
    return (
        <div>
             <BreadcrumbComp title="Menu Group" items={BCrumb} />
             <MenuMangement/>
        </div>
    );
}

export default Page;
