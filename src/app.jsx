import { SettingDrawer } from "@ant-design/pro-layout";
import { PageLoading } from "@ant-design/pro-layout";
import { history, Link } from "umi";
import RightContent from "@/components/RightContent";
import Footer from "@/components/Footer";
import defaultSettings from "../config/defaultSettings";
const isDev = process.env.NODE_ENV === "development";
import store from "store";
import { routesIcon } from "../config/routesIcon";

const loginPath = "/user/login";

export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      const msg = store.get("user");
      return msg;
    } catch (error) {
      history.push(loginPath);
    }

    return undefined;
  };

  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }

  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

export const layout = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    onPageChange: () => {
      const { location } = history;
      if (
        !initialState?.currentUser &&
        location.pathname !== loginPath &&
        location.pathname !== "/rating-page"
      ) {
        history.push(loginPath);
      }
    },
    menu: {
      request: async (params, defaultMenuData) => {
        return routesIcon;
      },
    },
    childrenRender: (children, props) => {
      return (
        <>
          {children}
          <SettingDrawer
            settings={initialState?.settings}
            onSettingChange={(settings) => {
              setInitialState((preInitialState) => ({
                ...preInitialState,
                settings,
              }));
            }}
          />
        </>
      );
    },
    // menu: {
    //   // Re-execute request whenever initialState?.currentUser?.userid is modified
    //   params: initialState,
    //   request: async (params, defaultMenuData) => {
    //     let { mode } = store.get('user');
    //     return mode === 'admin' ? admin : lguAdmin;
    //   },
    // },
    // menuHeaderRender: undefined,
  };
};
