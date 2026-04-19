/**
 * Lightweight State Management
 * Caches storage values to reduce disk access and provide a central source of truth.
 */

const getSession = (key) => sessionStorage.getItem(key);
const getLocal = (key) => localStorage.getItem(key);

export const State = {
  user: {
    get token() { return getSession("user_token"); },
    get nickname() { return getSession("username"); },
    get avatar() { return getSession("avatar"); },
  },
  
  theme: {
    get current() {
      return getLocal("theme") || 
             (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    },
    set(value) {
      localStorage.setItem("theme", value);
    }
  },

  isLoggedIn() {
    return !!this.user.token;
  }
};
