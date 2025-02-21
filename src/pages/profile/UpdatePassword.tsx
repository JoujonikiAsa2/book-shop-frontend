/* eslint-disable @typescript-eslint/no-explicit-any */
import BSForm from "@/components/form/Form";
import BSInput from "@/components/form/Input";
import { Button } from "@/components/ui/button";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { EyeClosed, EyeOff } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const UpdatePassword = () => {
  const [passwordType, setPassword] = useState<string>("password");
  const form = useForm();
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  console.log(location);

  const passwordHandler = async (data: FieldValues) => {
    try {
      const toastId = toast.loading("Changing...");
      if (user !== null) {
        if (data.newPassword === data.confirmPassword) {
          const res = await changePassword(data);
          if (res?.data?.success === true) {
            toast.success("Changed password successfully", {
              id: toastId,
              duration: 2000,
            });
            dispatch(logout());
          }
          else{
            toast.error("Current password is wrong", {id:toastId})
          }
        }
      } else {
        toast.error("Password does not match", { id: toastId });
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err?.data?.message);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[400px] bg-white p-12  relative">
        <BSForm form={form} onSubmit={passwordHandler}>
          <BSInput
            form={form}
            type={passwordType}
            name="currentPassword"
            label="Current Password"
            required={true}
            className="border-gray-400 w-[300px]"
          />
          <div className="absolute bottom-0 right-0 -translate-x-16 -translate-y-[18.8rem]">
            {passwordType === "password" ? (
              <EyeClosed
                onClick={() => setPassword("text")}
                size={16}
              ></EyeClosed>
            ) : (
              <EyeOff
                onClick={() => setPassword("password")}
                size={16}
              ></EyeOff>
            )}
          </div>

          <BSInput
            form={form}
            type={passwordType}
            name="newPassword"
            label="New Password"
            required={true}
            className="border-gray-400 w-[300px]"
          />
          <BSInput
            form={form}
            type={passwordType}
            name="confirmPassword"
            label="Confirm Passowrd"
            required={true}
            className="border-gray-400 w-[300px]"
          />
          <Button  type="submit" className="w-full bg-[#E07A5F] text-white hover:bg-[#E07A5F]/80">
            Confirm
          </Button>
        </BSForm>
      </div>
    </div>
  );
};

export default UpdatePassword;
