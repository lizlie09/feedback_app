export default [
  {
    path: "/user",
    layout: false,
    routes: [
      {
        path: "/user",
        routes: [
          {
            name: "login",
            path: "/user/login",
            component: "./user/Login",
          },
        ],
      },
      {
        component: "./404",
      },
    ],
  },
  {
    path: "/admin/dashboard",
    component: "./dashboard",
  },
  {
    name: "Dashboard",
    path: "/assignedOffer/dashboard",
    component: "./dashboard",
    menuRender: false,
    hideInMenu: true,
  },
  {
    path: "/admin/offices",
    component: "./offices",
  },
  {
    path: "/admin/ranking",
    component: "./ranking",
  },
  {
    path: "/admin/admin-list",
    component: "./admins",
  },
  {
    layout: false,
    path: "/",
    component: "./user/Login",
    menuRender: false,
    hideInMenu: true,
  },
  {
    path: "/rating-page",
    component: "./rating-page",
    menuRender: false,
    hideInMenu: true,
  },
  {
    component: "./404",
  },
];
