export interface CheckoutFormType {
  paymentMethod: string;
  deliveryIn: number;
}

export interface DeliveryAddressFormType {
  streetAddress: string;
  landmark: string;
  city: string;
  state: string;
}

export interface FoodDeliveryMasterType {
  orderNo: number;
  email: string;
  customerName: string;
  mobile: string;
}

export type OrderedFoodItemType = {name: string; quantity: number}

export type FoodDeliveryFormType = {
  address: DeliveryAddressFormType;
  foodItems: OrderedFoodItemType[];
} & FoodDeliveryMasterType &
  CheckoutFormType;

export type SelectOptions =
  | string
  | { value: string; text: string }
  | { value: number; text: string };
