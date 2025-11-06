import type { CheckoutFormType, SelectOptions } from "../../../types";
import Select from "../../../controls/Select";
import { useFormContext, useFormState, useWatch } from "react-hook-form";
import getRenderCount from "../../../utils/getRenderCount";
import { useEffect } from "react";

const RenderCount = getRenderCount();

const paymentOptions: SelectOptions[] = [
  { value: "", text: "Select" },
  { value: "online", text: "Paid Online" },
  { value: "COD", text: "Cash on Delivery" },
];

const deliveryOptions: SelectOptions[] = [
  { value: 0, text: "Select" },
  { value: 30, text: "Half an Hour" },
  { value: 60, text: "1 Hour" },
  { value: 120, text: "2 Hour" },
  { value: 180, text: "3 Hour" },
];

const CheckoutForm = () => {
  const { register } = useFormContext<CheckoutFormType>();
  // Destructure only the errors from useFormState to minimize re-renders
  // useStateForm is used here to subscribe to specific form state changes and avoid unnecessary re-renders
  // parameter 'name' allows to subscribe only to specific fields
  // parameter 'exact' when set to true, ensures that only the specified fields trigger re-renders, ignoring changes in nested fields.
  //    This is useful for optimizing performance in forms with nested structures.
  // parameter 'disabled' when set to true, prevents the component from re-rendering in response to form state changes.
  const { errors } = useFormState<CheckoutFormType>({
    name: ["paymentMethod", "deliveryIn"],
  })

  // Using useWatch to monitor paymentMethod field without causing re-renders
  // paramenter 'name' specifies the field to watch, it can also be an array of field names
  // parameter 'defaultValue' sets a default value for the watched field(s) if they are undefined
  // parameter 'control' it will be necessary to provide control when useWatch is used outside of FormProvider or useFormContext
  // parameter 'disabled' when set to true, prevents the component from re-rendering in response to changes in the watched field(s).
  // parameter 'exact' when set to true, ensures that only the specified fields trigger re-renders, ignoring changes in nested fields.
  const paymentMethod = useWatch({name: "paymentMethod"});

  useEffect(() => {
    if (paymentMethod === "online") {
      alert("Redirecting to online payment gateway...");
    }
  }, [paymentMethod]);



  return (
    <>
      <RenderCount />
      <div className="text-start fw-bold mt-4 mb-2">Checkout Details</div>
      <div className="row mb-2">
        <div className="col">
          <Select
            label="Payment Method"
            options={paymentOptions}
            error={errors.paymentMethod}
            {...register("paymentMethod", {
              required: {
                value: true,
                message: "Payment method is required",
              },
            })}
          />
        </div>
        <div className="col">
          <Select
            label="Delivery Whithin"
            options={deliveryOptions}
            error={errors.paymentMethod}
            {...register("deliveryIn", {
              required: {
                value: true,
                message: "Payment method is required",
              },
            })}
          />
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
