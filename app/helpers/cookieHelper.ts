// helpers/cookieHelper.ts
import Cookies from 'js-cookie';

export function setCookies(key: string, value: string) {
  Cookies.set(key, value); // Set cookie
}

export function getCookies(key: string) {
  return Cookies.get(key); // Get cookie
}

export function removeCookies(key: string) {
  Cookies.remove(key); // Remove cookie
}
