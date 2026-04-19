import { Home } from "../pages/Home";
import { Login } from "../pages/auth/login";
import { Profile } from "../pages/profile";
import { Logout } from "./logout";
import { UpdateCSS } from "./funcs";

const routes = {
  "/profile": { component: Profile, stylesheet: "/css/profile.css" },
  "/login": { component: Login, stylesheet: "/css/sign.css" },
  "/": { component: Home, stylesheet: "/css/index.css" },
};

const ExtractHref = () => {
  const base = "/graphql/";
  let path = location.pathname;
  if (path.startsWith(base)) {
    path = path.substring(base.length);
  }
  // Remove leading and trailing slashes
  path = path.replace(/^\/|\/$/g, "");
  console.log("Path detected:", path);
  return path;
};

/**
 * frontend router
 */
export const ForumRouter = () => {
  const path = ExtractHref();
  const route = routes["/" + path];
  if (path === "logout") {
    Logout();
    return;
  }
  if (route) {
    route.component();
    UpdateCSS(route.stylesheet);
  } else {
    Home(); // Default route
    UpdateCSS("/css/index.css"); // Default stylesheet
  }
};
