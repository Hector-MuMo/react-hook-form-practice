import { useFormContext } from "react-hook-form";
import TextField from "../../../controls/TextField";
import type { DeliveryAddressFormType } from "../../../types";
import getRenderCount from "../../../utils/getRenderCount";

const RenderCount = getRenderCount();

const DeliveryAddressForm = () => {
  // getFieldState can be used to get the state of a specific field without causing a re-render of the entire form.
  // This is useful for performance optimization, especially in large forms.
  // also it works better for nested fields.
  // This has a better performance if you use it inside the child components to get the state of specific fields.
  const { register, formState: { errors }, getFieldState } = useFormContext<{address: DeliveryAddressFormType}>();

  return (
    <>
      <RenderCount />
      <div className="text-start fw-bold mt-4 mb-2">Delivery Address</div>
      <div className="row mb-3">
        <div className="col">
          <TextField
            label="Street Address"
            error={errors.address?.streetAddress}
            {...register("address.streetAddress", {
              required: { value: true, message: "Address is required" },
            })}
          />
        </div>
        <div className="col">
          <TextField
            label="City"
            error={errors.address?.city}
            {...register("address.city", {
              required: { value: true, message: "City is required" },
            })}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <TextField label="Landmark" {...register("address.landmark")} />
        </div>
        <div className="col">
          <TextField label="State" {...register("address.state")} />
        </div>
      </div>
      <div>{getFieldState("address") && "Having access just to address form with getFiledState"}</div>
    </>
  );
};

export default DeliveryAddressForm;
