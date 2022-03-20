import {
  PieChartOutlined,
  BankOutlined,
  BarChartOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

export const adminIcons = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <PieChartOutlined />,
    component: "./admin/dashboard",
  },
  {
    name: "Offices",
    path: "/admin/offices",
    icon: <BankOutlined />,
  },
  {
    name: "Rankings",
    path: "/admin/ranking",
    icon: <BarChartOutlined />,
  },
  {
    name: "Admin List",
    path: "/admin/admin-list",
    icon: <UsergroupAddOutlined />,
  },
];

export const assignedOfferIcons = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <PieChartOutlined />,
    component: "./admin/dashboard",
  },
];
