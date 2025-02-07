import { useFormContext } from "react-hook-form";

const Input = ({
  id,
  name,
  customLabel,
  placeholder,
  type = "text",
  register: externalRegister,
}) => {
  const methods = useFormContext();
  const register = methods ? methods.register : externalRegister;
  const errors = methods ? methods.formState.errors : {};

  const autoCompleteMap = {
    email: "email",
    password: "current-password",
    "new-password": "new-password",
    phone: "tel",
    name: "name",
    "address.street": "street-address",
    "address.city": "address-level2",
    "address.state": "address-level1",
    "address.zipCode": "postal-code",
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {customLabel.split(".").pop().charAt(0).toUpperCase() +
          customLabel.split(".").pop().slice(1)}
      </label>
      <div className="mt-1">
        <input
          id={id}
          type={type}
          {...register(name)}
          autoComplete={autoCompleteMap[name] || "off"}
          className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                    ${errors[name] ? "border-red-300" : "border-gray-300"}`}
          placeholder={`Digite ${placeholder}`}
          aria-invalid={errors[name] ? "true" : "false"}
        />
        {errors[name] && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors[name].message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
