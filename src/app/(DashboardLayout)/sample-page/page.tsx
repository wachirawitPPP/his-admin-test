import CardBox from '@/app/components/shared/CardBox'
import React from 'react'
import BreadcrumbComp from '../layout/shared/breadcrumb/BreadcrumbComp'

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Chat",
  },
];

const page = () => {
  return (
    <>
    
      <BreadcrumbComp title="Page" items={BCrumb} />
      <CardBox>
        <h5 className="card-title">Sample page 2</h5>
        <p>
          asdasdhasdf Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo commodi error perferendis eligendi asperiores unde repellendus dolorum velit similique? Iure eaque dolorem odit! Tenetur ipsum delectus rerum officia odio illum!
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </p>
      </CardBox>
    </>
  )
}

export default page
