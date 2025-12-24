export interface UserAddress {
  city: string;
  streetName: string;
  country: string;
  postalCode: string;
  id?: string;
}
export interface UserAddressType {
  useAsShipping: boolean;
  useAsBilling: boolean;
  setAsDefaultShipping: boolean;
  setAsDefaultBilling: boolean;
}
