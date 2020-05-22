export default typeof browser !== "undefined"
  ? browser
  : typeof chrome !== "undefined"
  ? chrome
  : null;
