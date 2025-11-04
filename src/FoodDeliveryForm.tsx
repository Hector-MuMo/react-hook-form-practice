import { useForm, type FieldErrors } from "react-hook-form";
import getRenderCount from "./utils/getRenderCount";
//import { useRenderCount } from "./hooks/useRenderCount"

type FoodDeliveryFormType = {
  orderNo: number;
  email: string;
  customerName: string;
  mobile: string;
};

const RenderCount = getRenderCount();

export const FoodDeliveryForm = () => {
  //We can asign default values here. 
  const { register, handleSubmit } = useForm<FoodDeliveryFormType>({
    defaultValues: {
      orderNo: new Date().valueOf(),
      email: "string",
      customerName: "string",
      mobile: "string",
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
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="# Order No"
              disabled
              {...register("orderNo")}
            />
            <label># Order No</label>
          </div>
        </div>
        <div className="col">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="Mobile"
              {...register("mobile", { required: "mobile number is required" })}
            />
            <label>Mobile</label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Customer Name"
              {...register("customerName", {
                required: "customer name is required",
              })}
            />
            <label>Customer Name</label>
          </div>
        </div>
        <div className="col">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              {...register("email")}
            />
            <label>Email</label>
          </div>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
