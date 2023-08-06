export function closeAllDialogs() {
  [...document.getElementsByTagName('dialog')].forEach(d => d.close());
}
