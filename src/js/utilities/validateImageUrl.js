export function isValidImageUrl(url) {
  const regex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))$/i;
  return regex.test(url);
}
