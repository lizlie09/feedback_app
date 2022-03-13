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
    name: "Dashboard",
    path: "/admin/dashboard",
    component: "./admin",
  },
  {
    name: "Offices",
    path: "/admin/offices",
    component: "./offices",
  },
  {
    name: "Rankings",
    path: "/admin/ranking",
    component: "./ranking",
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
