import type {
  FieldError,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  name: string;
  value?: string | number | readonly string[];
  register?: UseFormRegister<any>;
  validations?: RegisterOptions;
  error?: FieldError;
  className?: string;
}

export const Input: React.FC<Props> = (props) => {
  const {
    label,
    id,
    name,
    type = "text",
    error,
    register,
    validations,
    ...rest
  } = props;

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="flex justify-between text-sm font-medium text-gray-900"
        >
          <span>{label}</span>
          {!validations?.required && (
            <span className="text-sm text-gray-400">Optional</span>
          )}
        </label>
      )}
      <div className="mt-1">
        <input
          type={type}
          name={name}
          id={id}
          {...rest}
          {...(error && { "aria-invalid": true })}
          {...(error && { "aria-describedby": `${name}-error` })}
          {...(register && register(name, validations ?? {}))}
          className={`block w-full rounded-md border border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:outline-blue-500 ${
            error ? "border-red-500 outline-red-400 focus:outline-red-400" : ""
          }`}
        />
        {error && (
          <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
};
