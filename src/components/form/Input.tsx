/* eslint-disable @typescript-eslint/no-explicit-any */

import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  className?: string;
  form: any;
};

const BSInput = ({
  type,
  name,
  label,
  placeholder,
  form,
  required,
  className
}: TInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field}) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
              <Input
                type={type}
                placeholder={placeholder}
                {...field}
                required={required}
                className={className}
              />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default BSInput;
