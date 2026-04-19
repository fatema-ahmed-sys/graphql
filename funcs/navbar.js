import { State } from "./state";
import userPlaceholder from "../assets/user2.png";

/**
 * Renders Navbar HTML
 */
export const LoadNav = () => {
  const avatar = State.user.avatar || userPlaceholder;
  const username = State.user.nickname || "User";
  const base = import.meta.env.BASE_URL;

  return /*html*/ `
  <nav class="main-menu">
    <div>
      <div class="user-info">
        <img src="${avatar}" alt="user" />
        <p id="wlcoming">${username}</p>
      </div>
      <ul>
        <li class="nav-item active">
          <a href="${base}profile">
            <i class="fa fa-user nav-icon"></i>
            <span class="nav-text">Profile</span>
          </a>
        </li>
        <li class="nav-item">
          <div class="interaction-control interactions">
            <div class="toggle">
              <div class="mode-icon moon">
                <i class="bx bxs-moon night-img"></i>
              </div>
              <div class="mode-icon sun hidden">
                <i class="bx bxs-sun morning-img"></i>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <ul>
      <li class="nav-item">
        <a href="${base}logout">
          <i class="fa fa-right-from-bracket nav-icon"></i>
          <span class="nav-text">Logout</span>
        </a>
      </li>
    </ul>
  </nav>
    `;
};

/**
 * Attaches listeners for theme and navigation.
 * Called after LoadNav is injected into DOM.
 */
export function navBarItems() {
  const sunIcon = document.querySelector(".sun");
  const moonIcon = document.querySelector(".moon");
  const morningImage = document.querySelector(".morning-img");
  const nightImage = document.querySelector(".night-img");
  const toggle = document.querySelector(".toggle");

  if (!toggle) return;

  const updateUI = (theme) => {
    const isDark = theme === "dark";
    document.body.classList.toggle("darkmode", isDark);
    
    if (sunIcon) sunIcon.classList.toggle("hidden", !isDark);
    if (moonIcon) moonIcon.classList.toggle("hidden", isDark);
    if (morningImage) morningImage.classList.toggle("hidden", isDark);
    if (nightImage) nightImage.classList.toggle("hidden", !isDark);
  };

  const handleToggle = () => {
    const newTheme = State.theme.current === "dark" ? "light" : "dark";
    State.theme.set(newTheme);
    updateUI(newTheme);
  };

  // Initial UI state
  updateUI(State.theme.current);

  // Toggle listener
  toggle.addEventListener("click", handleToggle);

  // Active item logic
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((navItem) => {
    navItem.addEventListener("click", () => {
      navItems.forEach((item) => item.classList.remove("active"));
      navItem.classList.add("active");
    });
  });

  // Global exposure if needed (though discouraged in optimized SPA)
  window.switchTheme = handleToggle;
}

export const LoadFooter = () => {
  return /*html*/ `
    <footer>
      <div class="footer">
        <div class="footer-logo">
          <img src="../assets/logo.svg" alt="logo">
        </div>
        <div class="footer-text">
          <p>&copy; 2024 Fatima. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
};
