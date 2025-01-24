export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  item?: any;
  url?: any;
  color?: string;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: any;
}

import { uniqueId } from "lodash";

const Menuitems = [
  // {
  //   id: uniqueId(),
  //   title: "Medical Records",
  //   name: "Medical Records",
  //   url: "",
  //   icon: "solar:user-id-linear",
  //   column: 2,
  //   children: [
  //     {
  //       id: uniqueId(),
  //       name: "Medical Records",
  //       title: "Medical Records",
  //       icon: "solar:user-id-linear",
  //       url: "/customer",
  //     },
  //     {
  //       id: uniqueId(),
  //       name: "OPD Register",
  //       title: "OPD Register",
  //       icon: "solar:user-id-linear",
  //       url: "/medical-records/opd-register",
  //     },
  //     {
  //       id: uniqueId(),
  //       name: "Registration",
  //       title: "Registration",
  //       icon: "solar:user-id-linear",
  //       url: "#",
  //     },
  //   ],
  // },
  // {
  //   id: uniqueId(),
  //   title: "Calendar",
  //   name: "Calendar",
  //   url: "",
  //   icon: "solar:calendar-line-duotone",
  //   column: 2,
  //   children: [
  //     {
  //       id: uniqueId(),
  //       name: "Calendar",
  //       title: "Calendar",
  //       icon: "solar:calendar-line-duotone",
  //       url: "/calendar",
  //     },
  //   ],
  // },

  // {
  //   id: uniqueId(),
  //   title: "Privilege Center",
  //   name: "Privilege Center",
  //   url: "",
  //   icon: "solar:user-id-bold",
  //   column: 2,
  //   children: [
  //     {
  //       id: uniqueId(),
  //       name: "Privilege Check",
  //       title: "Privilege Check",
  //       icon: "solar:user-id-bold",
  //       url: "/medical-records/medical-records-management",
  //     },
  //     // {
  //     //   id: uniqueId(),
  //     //   title: "OPD Register",
  //     //   icon: "solar:user-id-bold",
  //     //  url: "/medical-records/opd-register",
  //     // },
  //     // {
  //     //   id: uniqueId(),
  //     //   title: "Registration",
  //     //   icon: "solar:user-id-bold",
  //     //  url: "/medical-records/patient-register",
  //     // },
  //   ],
  // },
  // {
  //   id: uniqueId(),
  //   title: "OPD Clinic",
  //   name: "OPD Clinic",
  //   url: "",
  //   icon: "solar:user-id-bold",
  //   column: 2,
  //   children: [
  //     {
  //       id: uniqueId(),
  //       name: "OPD Clinic",
  //       title: "OPD Clinic",
  //       icon: "solar:user-id-bold",
  //       url: "#",
  //     },
  //     // {
  //     //   id: uniqueId(),
  //     //   title: "OPD Register",
  //     //   icon: "solar:user-id-bold",
  //     //  url: "/medical-records/opd-register",
  //     // },
  //     // {
  //     //   id: uniqueId(),
  //     //   title: "Registration",
  //     //   icon: "solar:user-id-bold",
  //     //  url: "/medical-records/patient-register",
  //     // },
  //   ],
  // },
  // {
  //   id: uniqueId(),
  //   title: "Setting",
  //   name: "Setting",
  //   url: "",
  //   icon: "solar:settings-outline",
  //   column: 2,
  //   children: [
  //     {
  //       id: uniqueId(),
  //       name: "Role",
  //       title: "Role",
  //       icon: "solar:user-check-broken",
  //       url: "/user-tables/basic",
  //     },
  //     {
  //       id: uniqueId(),
  //       name: "Role Management",
  //       title: "Role Management",
  //       icon: "carbon:subnet-acl-rules",
  //       url: "/user-tables/role-manage",
  //     },
  //     {
  //       id: uniqueId(),
  //       name: "Permissions",
  //       title: "Permissions",
  //       icon: "carbon:subnet-acl-rules",
  //       url: "/user-tables/permission-table",
  //     },
  //   ],
  // },
  // {
  //   id: uniqueId(),
  //   title: "Queue Management",
  //   name: "Queue Management",
  //   url: "",
  //   icon: "solar:settings-outline",
  //   column: 2,
  //   children: [
  //     {
  //       id: uniqueId(),
  //       name: "Queue Management",
  //       title: "Queue Management",
  //       icon: "solar:user-check-broken",
  //       url: "/queue-management",
  //     },
  //   ],
  // },
  {
    id: uniqueId(),
    title: "Dashboard",
    name: "Dashboard",
    url: "/",
    icon: "tabler:brand-speedtest",
    column: 2,
  },
  {
    id: uniqueId(),
    title: "Apps Management",
    name: "Apps Management",
    url: "/permission-management",
    icon: "tabler:browser",
    column: 2,
  },
  {
    id: uniqueId(),
    title: "Admin",
    name: "Admin",
    url: "",
    icon: "tabler:user-cog",
    column: 2,
  },
  {
    id: uniqueId(),
    title: "User",
    name: "User",
    url: "/user-management",
    icon: "tabler:user",
    column: 2,
  },
  {
    id: uniqueId(),
    title: "Language",
    name: "Language",
    url: "",
    icon: "tabler:language",
    column: 2,
  },
  {
    id: uniqueId(),
    title: "Permission",
    name: "Permission",
    url: "role-management",
    icon: "tabler:key",
    column: 2,
  },
  {
    id: uniqueId(),
    title: "Menu Group",
    name: "Menu Group",
    url: "/menu-manage",
    icon: "tabler:adjustments",
    column: 2,
  },

  {
    id: uniqueId(),
    title: "Service Catagory Management",
    name: "Service Catagory Management",
    url: "",
    icon: "tabler:list-check",
    column: 2,
  },
  {
    id: uniqueId(),
    title: "Product Unit Management",
    name: "Product Unit Management",
    url: "",
    icon: "tabler:tags",
    column: 2,
  },
  {
    id: uniqueId(),
    title: "Popup Management",
    name: "Popup Management",
    url: "",
    icon: "tabler:alert-octagon",
    column: 2,
  },
  {
    id: uniqueId(),
    title: "File Management",
    name: "File Management",
    url: "",
    icon: "tabler:cloud",
    column: 2,
  },
  {
    id: uniqueId(),
    title: "Data Transfer",
    name: "Data Transfer",
    url: "",
    icon: "tabler:database",
    column: 2,
  },
  {
    id: uniqueId(),
    title: "Cost",
    name: "Cost",
    url: "",
    icon: "tabler:plus-minus",
    column: 2,
    children: [],
  },
  {
    id: uniqueId(),
    title: "Report",
    name: "Report",
    url: "",
    icon: "tabler:report",
    column: 2,
    children: [],
  },
  {
    id: uniqueId(),
    title: "Save Log",
    name: "Save Log",
    url: "",
    icon: "tabler:list",
    column: 2,
    children: [],
  },
];

const SidebarContent: MenuItem[] = [
  {
    id: 1,
    name: "Pages",
    items: [
      {
        heading: "Admin",
        children: Menuitems,
      },
    ],
  },
  {
    id: 2,
    name: "Menu",
    items: [
      {
        heading: "Multi level",
        children: [
          {
            name: "Menu Level",
            icon: "solar:widget-add-line-duotone",
            id: uniqueId(),
            children: [
              {
                id: uniqueId(),
                name: "Level 1",
                url: "",
              },
              {
                id: uniqueId(),
                name: "Level 1.1",
                icon: "fad:armrecording",
                url: "",
                children: [
                  {
                    id: uniqueId(),
                    name: "Level 2",
                    url: "",
                  },
                  {
                    id: uniqueId(),
                    name: "Level 2.1",
                    icon: "fad:armrecording",
                    url: "",
                    children: [
                      {
                        id: uniqueId(),
                        name: "Level 3",
                        url: "",
                      },
                      {
                        id: uniqueId(),
                        name: "Level 3.1",
                        url: "",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        heading: "More Options",
        children: [
          {
            id: uniqueId(),
            url: "/sample-page",
            name: "Applications",
            icon: "solar:check-circle-bold",
            color: "text-primary",
          },
          {
            id: uniqueId(),
            url: "",
            name: "Form Options",
            icon: "solar:check-circle-bold",
            color: "text-secondary",
          },
          {
            id: uniqueId(),
            url: "",
            name: "Table Variations",
            icon: "solar:check-circle-bold",
            color: "text-info",
          },
          {
            id: uniqueId(),
            url: "",
            name: "Charts Selection",
            icon: "solar:check-circle-bold",
            color: "text-warning",
          },
          {
            id: uniqueId(),
            url: "",
            name: "Widgets",
            icon: "solar:check-circle-bold",
            color: "text-success",
          },
        ],
      },
    ],
  },
];

export default SidebarContent;
