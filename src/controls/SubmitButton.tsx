import React from "react"
import {  useFormState, type Control } from "react-hook-form"


type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any, any>
}


export default function SubmitButton(props: SubmitButtonProps) {
  const {
    className = "btn-light",
    value,
    control = undefined,
    ...other
  } = props

  return control ? <WithControl {...{className,value,control,...other}} /> : 
  <WithoutControl {...{className,value,...other}}/>
}

function WithControl({
  className,
  value,
  control,
  ...other
}: SubmitButtonProps) {
  const { isSubmitting } = useFormState({ control })
  return (
    <>
      <button
        type="submit"
        className={`btn ${className}`}
        disabled={isSubmitting}
        {...other}
      >
        {isSubmitting === false ? (
          value
        ) : (
          <>
            <span
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
            <span role="status" className="ms-1">
              {value}
            </span>
          </>
        )}
      </button>
    </>
  )
}

function WithoutControl({
  className,
  value,
  ...other
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <>
      <button type="submit" className={`btn ${className}`} {...other}>
        {value}
      </button>
    </>
  )
}