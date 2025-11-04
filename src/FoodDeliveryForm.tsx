// React-Hook-Form has 5 validation rules integrated:
// 1. required
// 2. minLenght & maxLenght
// 3. min & max
// 4. pattern matching using regular expressions and custom validation functions
// 5. validate

import { useForm, type FieldErrors } from "react-hook-form";
import getRenderCount from "./utils/getRenderCount";
import TextField from "./controls/TextField";
import Select from "./controls/Select";
import type { SelectOptions } from "./types";
//import { useRenderCount } from "./hooks/useRenderCount"

type FoodDeliveryFormType = {
  orderNo: number;
  email: string;
  customerName: string;
  mobile: string;
  paymentMethod: string;
  deliveryIn: number;
};

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

const RenderCount = getRenderCount();

export const FoodDeliveryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FoodDeliveryFormType>({
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
    },
  });

  const onSubmit = (formData: FoodDeliveryFormType) => {
    console.log("form data", formData);
  };

  const onError = (errors: FieldErrors) => {
    console.log("validatiopn errors", errors);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit, onError)}>
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
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
