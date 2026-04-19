import { Home } from "../pages/Home";
import { Login } from "../pages/auth/login";
import { Profile } from "../pages/profile";
import { Logout } from "./logout";
import { UpdateCSS } from "./utils";
import { navBarItems } from "./navbar";

const routes = {
  "/profile": { component: Profile, stylesheet: "/css/profile.css" },
  "/login": { component: Login, stylesheet: "/css/sign.css" },
  "/": { component: Home, stylesheet: "/css/index.css" },
};

const ExtractHref = () => {
  const base = import.meta.env.BASE_URL;
  let path = location.pathname;
  if (path.startsWith(base)) {
    path = path.substring(base.length);
  }
  path = path.replace(/^\/|\/$/g, "");
  return path;
};

export const ForumRouter = async () => {
  const path = ExtractHref();
  const route = routes["/" + path];

  if (path === "logout") {
    Logout();
    return;
  }

  const render = async (routeData) => {
    await routeData.component();
    UpdateCSS(routeData.stylesheet);
    navBarItems(); // Re-attach listeners for the new DOM
  };

  if (route) {
    await render(route);
  } else {
    await render(routes["/"]);
  }
};
