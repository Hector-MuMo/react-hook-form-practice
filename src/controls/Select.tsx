import { forwardRef, type ForwardedRef } from "react";
import type { FieldError } from "react-hook-form";
import type { SelectOptions } from "../types";

type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: FieldError | undefined;
  options: SelectOptions[];
};

const Select = forwardRef(
  (
    { className = "", label, error, options, ...rest }: SelectFieldProps,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    return (
      <div>
        <select className={`form-select ${className}`} ref={ref} {...rest}>
          {options.map((option, index) => (
            <option key={index} value={typeof option == "string" ? option : option.value}>
              {typeof option == "string" ? option : option.text}
            </option>
          ))}
        </select>
        <label>{label}</label>
        {error && <div className="error-feedback">{error.message}</div>}
      </div>
    );
  }
);

export default Select;
