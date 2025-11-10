import type { CheckoutFormType, SelectOptions } from "../../../types";
import Select from "../../../controls/Select";
import { useFormContext, useFormState } from "react-hook-form";
import getRenderCount from "../../../utils/getRenderCount";

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
  const { errors } = useFormState<CheckoutFormType>({
    name: ["paymentMethod", "deliveryIn"],
  })



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
              valueAsNumber: true
            })}
          />
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
