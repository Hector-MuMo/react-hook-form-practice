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

  const { handleSubmit, formState } = methods;
  //IMPORTANT: When we destructure formState, we create a subscription to the properties we destructure 
  // and any change in any property will cause a re-render.
  // For example isDirty wil re-render the component on every change of the boolean state.
  /*
  isDirty: a boolean indicating whether any of the form fields have been modified from their initial values.
  isValid: a boolean indicating whether the entire form is valid based on the defined validation rules.
  isValidating: a boolean indicating whether the form is currently undergoing validation.
  errors: an object containing validation errors for each form field, if any exist.
  dirtyFields: an object indicating which specific fields have been modified.
  touchedFields: an object indicating which specific fields have been interacted with (focused and then blurred).
  defaultValues: an object containing the initial values of the form fields.
  isSubmitting: a boolean indicating whether the form is currently being submitted.
  isSubmitted: a boolean indicating whether the form has been submitted at least once.
  isSubmitSuccessful: a boolean indicating whether the last form submission was successful.
  submitCount: a number indicating how many times the form has been submitted.
  isLoading: a boolean indicating whether the form is in a loading state, typically used for async operations.
  */
  const { isDirty } = formState;

  const onSubmit = (formData: FoodDeliveryFormType) => {
    console.log("form data", formData);
  };

  const onError = (errors: FieldErrors) => {
    console.log("validation errors", errors);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit, onError)}>
      <RenderCount />

      <FormProvider {...methods}>
        <FoodDeliveryMaster />
        <p>List of ordered food items</p>
        <CheckoutForm />
        <DeliveryAddressForm />
      </FormProvider>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
