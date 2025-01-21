import React from 'react'
import BreadcrumbComp from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbComp";
import { Metadata } from 'next';
import ReactBasicTables from '@/app/components/user-tables/basic/BasicTables';
import StripedTable from '@/app/components/user-tables/basic/StripedTable';
import FooterTable from '@/app/components/user-tables/basic/FooterTable';


export const metadata: Metadata = {
    title: "Role Tables List",
};
const BCrumb = [
    {
        to: "/",
        title: "Home",
    },
    {
        title: "Tables List",
    },
];
function page() {
    return (
        <>
            <BreadcrumbComp title="Role Management" items={BCrumb} />
            <div className="grid grid-cols-12 gap-7">
                <div className="col-span-12">
                    <ReactBasicTables />
                </div>
                {/* <div className="col-span-12">
                    <StripedTable />
                </div> */}
                {/* <div className="col-span-12">
                    <FooterTable />
                </div> */}
            </div>

        </>
    )
}

export default page
