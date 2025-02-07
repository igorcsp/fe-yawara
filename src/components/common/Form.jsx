import React from "react";
import { FormProvider, useFormContext } from "react-hook-form";

const Form = ({ children, onSubmit, isSubmitting, className, noValidate }) => {
  const methods = useFormContext(); 
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={className}
        noValidate={noValidate}
      >
        {children}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </FormProvider>
  );
};

export default Form;
