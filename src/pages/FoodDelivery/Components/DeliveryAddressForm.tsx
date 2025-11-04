import { useFormContext } from "react-hook-form";
import TextField from "../../../controls/TextField";
import type { DeliveryAddressFormType } from "../../../types";

const DeliveryAddressForm = () => {
  const { register, formState: { errors } } = useFormContext<{address: DeliveryAddressFormType}>();

  return (
    <>
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
    </>
  );
};

export default DeliveryAddressForm;
