/* eslint-disable @typescript-eslint/no-explicit-any */
import BSForm from "@/components/form/Form";
import BSInput from "@/components/form/Input";
import { Button } from "@/components/ui/button";
import { FieldValues, useForm } from "react-hook-form";
import image from "../assets/about.jpg";
import { useState } from "react";
import { EyeClosed, EyeOff } from "lucide-react";
import {
  useRegisterMutation,
} from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Register = () => {
  const [passwordType, setPassword] = useState<string>("password");
  const form = useForm();
  const [register] = useRegisterMutation();
  const handleLogin = async (data: FieldValues) => {
    const toastId = toast.loading("Login...");
    try {
      const res = await register(data);
      if (res.error) {
        return toast.error("Failed to register, Try again letter", { id: toastId, duration: 2000 });
      }
      toast.success("Registered Successfully", { id: toastId, duration: 2000 });
    } catch (err: any) {
      console.log(err);
      toast.error("something went wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <div
      className="w-full h-screen flex justify-center items-center"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-400px bg-white p-12  relative">
        <BSForm form={form} onSubmit={handleLogin}>
          <BSInput
            form={form}
            type="text"
            name="name"
            label="Name"
            className="border-gray-400 w-[300px]"
          />
          <BSInput
            form={form}
            type="text"
            name="phone"
            label="Phone"
            className="border-gray-400 w-[300px]"
          />
          <BSInput
            form={form}
            type="email"
            name="email"
            label="Email"
            className="border-gray-400 w-[300px]"
          />
          <BSInput
            form={form}
            type={passwordType}
            name="password"
            label="Password"
            className="border-gray-400 w-[300px]"
          />
          <div className="absolute bottom-0 right-0 -translate-x-14 -translate-y-[8.8rem]">
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
          <Button type="submit" className="w-full">
            Register
          </Button>
          <small>
            Already have an account? &nbsp;
            <Link to="/login" className="underline hover:text-blue-300">
              Login
            </Link>
          </small>
        </BSForm>
      </div>
    </div>
  );
};

export default Register;
