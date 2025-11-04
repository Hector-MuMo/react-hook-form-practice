import { forwardRef, type ForwardedRef } from "react";
import type { FieldError } from "react-hook-form";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: FieldError | undefined;
};

const TextField = forwardRef(
  (
    { type = "text", className = "", label, error, ...rest }: TextFieldProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className="form-floating">
        <input
          type={type}
          className={`form-control ${className}`}
          placeholder={label}
          ref={ref}
          {...rest}
        />
        <label>{label}</label>
        {error && <div className="error-feedback">{error.message}</div>}
      </div>
    );
  }
);

export default TextField;
