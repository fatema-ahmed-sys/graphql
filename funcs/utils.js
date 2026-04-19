/**
 * Function to Update CSS en routing
 * @param {Stylesheet} stylesheet - Path to css file
 */
export const UpdateCSS = (stylesheet) => {
  const linkElement = document.getElementById("page-styles");
  if (linkElement && stylesheet) {
    if (linkElement.getAttribute("href") !== stylesheet) {
      linkElement.setAttribute("href", stylesheet);
    }
  }
};
