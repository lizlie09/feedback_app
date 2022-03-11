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
    component: "./admin",
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
