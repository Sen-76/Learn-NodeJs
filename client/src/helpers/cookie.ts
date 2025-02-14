export const cookie = {
  setCookie(name: string, value: string, daysToExpire: number) {
    if (typeof document !== 'undefined') {
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
      const expires = 'expires=' + expirationDate.toUTCString();
      document.cookie = name + '=' + encodeURIComponent(value) + ';' + expires + ';path=/; ';
    }
  },

  clearCookie(name: string) {
    if (typeof document !== 'undefined') document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; ';
  },

  getCookie(name: string) {
    if (typeof document !== 'undefined') {
      const cookieString = decodeURIComponent(document.cookie || '');
      const cookieArray = cookieString.split('; ');

      for (const cookie of cookieArray) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) return cookieValue;
      }
    }

    return null;
  },
};
