/* eslint-disable @typescript-eslint/no-explicit-any */
import BSForm from "@/components/form/Form";
import BSInput from "@/components/form/Input";
import { Button } from "@/components/ui/button";
import { FieldValues, useForm } from "react-hook-form";
import image from "../assets/about.jpg";
import { useState } from "react";
import { EyeClosed, EyeOff } from "lucide-react";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/veryfyToken";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [passwordType, setPassword] = useState<string>("password");
  const form = useForm();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation()

  console.log(location)

  const handleLogin = async (data: FieldValues) => {
    try {
      const toastId = toast.loading("Login...");
      const res = await login(data).unwrap();
      console.log(res);
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      {
        if(user.role === 'user'){
          navigate(location.state ||'/')
        }
        else if(user.role === 'admin'){
          navigate(location.state || '/dashboard/admin/manage-orders')
        }
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err?.data?.message);
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
      <div className="w-[400px] bg-white p-12  relative">
        <BSForm form={form} onSubmit={handleLogin}>
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
            Login
          </Button>
          <small>
            Do not have an account? &nbsp;
            <Link to="/register" className="underline hover:text-blue-300">
              Create account
            </Link>
          </small>
        </BSForm>
      </div>
    </div>
  );
};

export default Login;
