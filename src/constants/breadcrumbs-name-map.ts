import { UrlPath } from '@ts-enums';

export const BREADCRUMBS_NAME_MAP: Record<string, string> = {
  [UrlPath.CATALOG]: 'Product Catalog',
  [UrlPath.ABOUT]: 'About Us',
  [UrlPath.REGISTRATION]: 'Registration',
  [UrlPath.SIGN_IN]: 'Sign In',
  [UrlPath.USER_PROFILE.slice(1)]: 'My Profile',
  [UrlPath.USER_PROFILE_CREDENTIALS]: 'My Credentials',
  [UrlPath.USER_PROFILE_ADDRESSES]: 'My Addresses',
  [UrlPath.USER_PROFILE_CHANGE_PASSWORD]: 'Change Password',
  [UrlPath.SHOPPING_CART]: 'Shopping Cart',
};
