import {
  FormProvider,
  useForm,
  type FieldErrors,
  type UseFormReturn,
} from "react-hook-form";
import getRenderCount from "../../utils/getRenderCount";
import CheckoutForm from "./Components/CheckoutForm";
import type { FoodDeliveryFormType } from "../../types";
import DeliveryAddressForm from "./Components/DeliveryAddressForm";
import FoodDeliveryMaster from "./Components/FoodDeliveryMaster";
import SubmitButton from "../../controls/SubmitButton";
import FoodItems from "./Components/OrderedFoodItems";
import { createOrder, fetchLastOrder } from "../../db";

//import { useRenderCount } from "./hooks/useRenderCount"

const RenderCount = getRenderCount();

const id = 0;
const defaultValues: FoodDeliveryFormType = {
  orderId: 0,
  orderNo: new Date().valueOf(),
  email: "",
  customerName: "",
  mobile: "",
  paymentMethod: "",
  gTotal: 0,
  placeOn: new Date(),
  deliveryIn: 0,
  foodItems: [{ foodId: 0, price: 0, quantity: 0, totalPrice: 0 }],
  address: {
    streetAddress: "",
    landmark: "",
    city: "",
    state: "",
  },
};

export const FoodDeliveryForm = () => {
  const methods: UseFormReturn<FoodDeliveryFormType> =
    useForm<FoodDeliveryFormType>({
      mode: "onChange",
      shouldUnregister: true,
      criteriaMode: "firstError",
      //reValidateMode: "onChange",
      //shouldFocusError: true,
      defaultValues: async (): Promise<FoodDeliveryFormType> => {
        if (id === 0) return new Promise((resolve) => resolve(defaultValues));
        else {
          const tempOrder = await fetchLastOrder();
          return new Promise((resolve) =>
            resolve(tempOrder ? tempOrder : defaultValues)
          );
        }
      },
      //values: ()(),
    });

  const { handleSubmit, control /*setValue, getValues*/ } = methods;

  const onSubmit = (formData: FoodDeliveryFormType) => {
    formData.orderId = 1;
    formData.placeOn = new Date();
    createOrder(formData);
    console.log("form data", formData);
  };

  const onError = (errors: FieldErrors) => {
    console.log("validation errors", errors);
  };

  const onDemo = () => {
    //setValue("customerName", "John Doe");
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit, onError)}>
      <RenderCount />

      <FormProvider {...methods}>
        <FoodDeliveryMaster />
        <FoodItems />
        <p>List of ordered food items</p>
        <CheckoutForm />
        <DeliveryAddressForm />
      </FormProvider>

      <SubmitButton value="Submit" control={control} />
      <button className="btn btn-secondary ms-2" onClick={onDemo} type="button">
        Demo
      </button>
    </form>
  );
};
