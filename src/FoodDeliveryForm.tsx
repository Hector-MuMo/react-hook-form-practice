// React-Hook-Form has 5 validation rules integrated:
// 1. required
// 2. minLenght & maxLenght
// 3. min & max
// 4. pattern matching using regular expressions and custom validation functions
// 5. validate

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
  // useForm hook to manage form state and validation,
  // formState contains many options, one of them is info about errors
  // one paramenter is defaultValues to set initial values for the form fields
  // paramenter mode can be used to set when validation should occur (onSubmit, onBlur, onChange, onTouched, all)
  // paramenter criteriaMode can be used to set how validation errors are reported, all errors o just first one (firstError, all)
  // paramener reValidateMode can be used to set when inputs with errors are re-validated
  //    in other words it will check again if the validations are completed (onChange, onBlur, onSubmit)
  // parameter shouldFocusError can be used to set if the first field with error should be focused automatically (true, false)
  // parameter delayError can be used to set a delay (in ms) before validation is triggered
  // another form of destructuring is t get
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
              {...register("mobile", {
                minLength: {
                  value: 10,
                  message: "Mobile number must be 10 digits",
                },
                maxLength: 10,
                required: {
                  value: true,
                  message: "Mobile number is required",
                },
              })}
            />
            <label>Mobile</label>
            {errors.mobile && (
              <div className="error-feedback">{errors.mobile?.message}</div>
            )}
            <div>{errors.mobile?.message}</div>
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
                required: { value: true, message: "Customer name is required" },
              })}
            />
            <label>Customer Name</label>
            {errors.customerName && (
              <div className="error-feedback">
                {errors.customerName?.message}
              </div>
            )}
          </div>
        </div>
        <div className="col">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              {...register("email", {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
                validate: {
                  notFake: (value) => {
                    return (
                      value != "email@gmail.com" || "This email is not allowed"
                    );
                  },
                  notFromBlackListedDomain: (value) => {
                    return (
                      (!value.endsWith("@xyz.com") &&
                        !value.endsWith("@example.com")) ||
                      "This email is not allowed"
                    );
                  },
                },
              })}
            />
            <label>Email</label>
            {errors.email && (
              <div className="error-feedback">{errors.email?.message}</div>
            )}
          </div>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
