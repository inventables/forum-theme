import { apiInitializer } from "discourse/lib/api";

export default apiInitializer((api) => {
  api.onPageChange((url) => {
    const cookieBanner = document.querySelector('.cookie-banner');
    const cookieBannerOk = document.querySelector('.cookie-banner__btn--ok');
    const setReadCookiePolicy = () => {
      document.cookie = `_inv_read_cookie_policy_at=${(new Date).getTime()}; domain=easel.com; path=/; max-age=31536000`;
    };
    const didReadCookiePolicy = () => {
      return document.cookie.split(';').some(crumb => crumb.trim().startsWith('_inv_read_cookie_policy_at='));
    };
    cookieBannerOk.addEventListener('click', () => {
      cookieBanner.style.display = 'none';
    });
    if (!didReadCookiePolicy()) {
      setReadCookiePolicy();
      cookieBanner.style.display = 'block';
    }
    else {
      cookieBanner.style.display = 'none';
    }
  });
});