/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Form } from "../ui/form";

// types
type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  form: any;
} & TFormConfig;
const BSForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
  form,
}: TFormProps) => {
  const formConfig: TFormConfig = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {" "}
        {children}
      </form>
    </Form>
  );
};

export default BSForm;
