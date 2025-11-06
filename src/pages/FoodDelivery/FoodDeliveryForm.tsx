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
//import { useEffect } from "react";

//import { useRenderCount } from "./hooks/useRenderCount"

const RenderCount = getRenderCount();

export const FoodDeliveryForm = () => {
  const methods: UseFormReturn<FoodDeliveryFormType> =
    useForm<FoodDeliveryFormType>({
      mode: "onChange",
      criteriaMode: "firstError",
      //reValidateMode: "onChange",
      //shouldFocusError: true,
      defaultValues: {
        orderNo: new Date().valueOf(),
        email: "",
        customerName: "",
        mobile: "",
        paymentMethod: "",
        deliveryIn: 0,
        address: {
          streetAddress: "",
          landmark: "",
          city: "",
          state: "",
        },
      },
    });

  const { handleSubmit, control, /*watch,*/ getValues, setValue } = methods;

  // watch works to re-render the form on field changes
  // we can add these parameters
  // watch(); affects all the form fields
  // watch("customerName"); affects only customerName field
  // watch(["customerName","email"]); affects customerName and email fields
  // watch((data, {name, type}) => console.log(data, name, type)); to get all the changes in the form and not re-render the form
  // watch("customerName", "jaun"); to set default value while watching a field, this default value is only for the watch and not for the form field
  //watch((data, {name, type}) => console.log(data, name, type));

  //const paymentMethod = watch("paymentMethod");

  // Base on paymentmethod input watch, we can trigger side effects
  // useEffect(() => {
  //   if (paymentMethod === "online") {
  //     alert("Redirecting to online payment gateway...");
  //   }
  // }, [paymentMethod])

  // useEffect(() => {
  //   // In this case, watch is used to subscribe to form changes without re-rendering the form
  //   // and we can perform side effects based on form changes, later unsubscribe the watch on component unmount
  //   const suscription = watch((data, {name, type}) => console.log(data, name, type));
  //   return () => suscription.unsubscribe();
  // }, [watch]);
  

  const onSubmit = (formData: FoodDeliveryFormType) => {
    console.log("form data", formData);
  }; 

  const onError = (errors: FieldErrors) => {
    //console.log("validation errors", errors);
    //console.log(getFieldState("customerName"));
    //the parameter we can pass getValues are
    // getValues(); returns all form values
    // getValues("customerName"); returns specific form field value
    // getValues(["customerName","email"]); returns array of specific form field values
    console.log("current form values", getValues());
    
  };

  const onDemo = () => {
    setValue("customerName", "John Doe");
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit, onError)}>
      <RenderCount />

      <FormProvider {...methods}>
        <FoodDeliveryMaster />
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
