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
  gTotal: number;
}

export type OrderedFoodItemType = {
  foodId: number;
  price: number;
  quantity: number;
  totalPrice: number;
};

export type FoodDeliveryFormType = {
  address: DeliveryAddressFormType;
  foodItems: OrderedFoodItemType[];
} & FoodDeliveryMasterType &
  CheckoutFormType;

export interface FoodType {
  foodId: number;
  name: string;
  price: number;
}

export type SelectOptions =
  | string
  | { value: string; text: string }
  | { value: number; text: string };
