import { useFormContext, useFormState } from "react-hook-form";
import type { FoodDeliveryMasterType } from "../../../types";
import TextField from "../../../controls/TextField";
import getRenderCount from "../../../utils/getRenderCount";


const RenderCount = getRenderCount();

const FoodDeliveryMaster = () => {
  const { register } = useFormContext<FoodDeliveryMasterType>();
  const { errors } = useFormState<FoodDeliveryMasterType>({
    name: ["orderNo", "customerName", "email", "mobile"],
  })

  return (
    <>
      <RenderCount />
      <div className="row mb-2">
        <div className="col">
          <TextField label="# Order No" disabled {...register("orderNo")} />
        </div>
        <div className="col">
          <TextField
            label="Mobile"
            {...register("mobile", {
              required: {
                value: true,
                message: "Mobile number is required",
              },
            })}
            error={errors.mobile}
          />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <TextField
            label="Customer Name"
            {...register("customerName", {
              required: { value: true, message: "Customer name is required" },
            })}
            error={errors.customerName}
          />
        </div>
        <div className="col">
          <TextField
            label="Email"
            {...register("email", {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={errors.email}
          />
        </div>
      </div>
    </>
  );
};

export default FoodDeliveryMaster;
