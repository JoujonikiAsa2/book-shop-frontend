/* eslint-disable @typescript-eslint/no-explicit-any */
import BSForm from "@/components/form/Form";
import BSInput from "@/components/form/Input";
import { Button } from "@/components/ui/button";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const UpdateProfile = () => {
  const [updateProfile] = useUpdateProfileMutation();
  const user = useAppSelector(selectCurrentUser);
  const { data: userData } = useGetMeQuery(undefined);
  console.log(userData);

  const form = useForm();

  const profileHandler = async (data: FieldValues) => {
    try {
      const toastId = toast.loading("Updating...");
      const userInfo = {
        userId: user?.user,
        name: data.name,
        phone: data.phone,
      };
      const res = await updateProfile(userInfo);
      console.log(res);
      if (res?.data?.success === true) {
        toast.success("Profile update successfully", {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.error("Failed to update", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err?.data?.message);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-[400px] bg-white p-12">
        <BSForm form={form} onSubmit={profileHandler}>
          <BSInput
            form={form}
            type="text"
            name="name"
            label="Name"
            required={true}
            placeholder={userData?.data?.name}
            className="border-gray-400 w-[300px]"
          />
          <BSInput
            form={form}
            type="text"
            name="phone"
            label="Phone"
            required={true}
            placeholder={userData?.data?.phone}
            className="border-gray-400 w-[300px]"
          />
          <Button type="submit" className="w-full">
            Update
          </Button>
        </BSForm>
      </div>
      <div className=" poppins-regular pb-2">
        <p className="font-medium">Others Information</p>
        <p className="w-[280px] p-1 border text-sm">Email: {userData?.data?.email}</p>
        <p className="w-[280px] p-1 border text-sm">Role: {userData?.data?.role}</p>
        <p className="w-[280px] p-1 border text-sm">{user?.isDeactivate ? "Deactivate" : "Not Deactivate"}</p>
        <p className="w-[280px] p-1 border text-sm">{user?.isBlocked ? "Blocked" : "Not Blocked"}</p>
        <p className="w-[280px] p-1 border text-sm">{user?.isDeleted ? "Deleted" : "Not Deleted"}</p>
      </div>
    </div>
  );
};

export default UpdateProfile;
