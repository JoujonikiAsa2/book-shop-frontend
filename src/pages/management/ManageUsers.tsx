import BSForm from "@/components/form/Form";
import BSInput from "@/components/form/Input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateProfileMutation } from "@/redux/features/user/userApi";
import { TQueryParam } from "@/types/global";
import { TUser } from "@/types/user";
import { ArrowLeft, ArrowRight, Delete, Edit, Loader } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const ManageUsers = () => {
  const form = useForm()
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const [userInfo, setUserInfo] = useState<TUser | undefined>(
      undefined
    );
  const queryParam: TQueryParam[] = [];
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    data: userData,
    refetch,
    isFetching,
    isLoading,
  } = useGetAllUsersQuery(params);

  const [updateUserInfo] = useUpdateProfileMutation()
  const [deleteUserInfo] = useDeleteUserMutation()

  const totalPages = userData?.meta?.totalPage || 0;

  if (isFetching || isLoading) {
    return (
      <div className="h-[80vh] w-[70vw] flex items-center justify-center">
        <Loader size={32} className="w-6 h-6 animate-spin" />
      </div>
    );
  } else if (userData?.data?.length === 0) {
    <div className="h-[80vh] w-[70vw] flex items-center justify-center">
      <p>You are not authorized</p>
    </div>;
  }

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      queryParam.push({ name: "page", value: currentPage - 1 });
      setParams(queryParam);
    } else {
      queryParam.push({ name: "page", value: currentPage });
      setParams(queryParam);
      setCurrentPage(currentPage);
    }
  };
  const handleNext = () => {
    if (currentPage > 0 && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      queryParam.push({ name: "page", value: currentPage + 1 });
      setParams(queryParam);
    } else {
      setCurrentPage(totalPages - 1);
      queryParam.push({ name: "page", value: totalPages - 1 });
      setParams(queryParam);
    }
  };

  const handleUpdateUser = async(data:FieldValues) =>{
    const userDetails = {
      userId: userInfo?._id,
      name: data.name !== undefined ? data?.name :userInfo?.name,
      phone: data.phone !== undefined ? data?.phone :userInfo?.phone,
      email: data.email !== undefined ? data?.email :userInfo?.email,
      role: data.role !== undefined ? data?.role :userInfo?.role,
      isDeactivate: data.isDeactivate === "No" ? false : true,
      isBlocked: data.isBlocked === "No" ? false : true,
      isDeleted: data.isDeleted === "No" ? false : true,
      availability: data.availability === "inStock" ? false : true,
    }
    console.log(userDetails)
    await updateUserInfo(userDetails)
    toast.success("Updated")
    refetch()
  }
  const handleDeleteProduct = async(userId:string) =>{
    const result = await deleteUserInfo(userId)
    console.log(result)
    toast.success("Deleted")
    refetch()
  }

  return (
    <div className="w-fit lg:w-[40rem] m-10 poppins-regular">
      <div className="w-[300px] lg:w-[1000px] h-[65vh] overflow-x-scroll">
      <Table className="border rounded-lg bg-[#F3F3F3]">
        <TableHeader className="bg-[#1B4D3E]">
          <TableRow>
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Email</TableHead>
            <TableHead className="text-white">Phone</TableHead>
            <TableHead className="text-white">Role</TableHead>
            <TableHead className="text-white">Deactivated</TableHead>
            <TableHead className="text-white">Blocked</TableHead>
            <TableHead className="text-white">Deleted</TableHead>
            <TableHead className="text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData?.data?.map((user:TUser) => (
            <TableRow>
              <TableCell>{user?.name}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user?.phone}</TableCell>
              <TableCell>{user?.role}</TableCell>
              <TableCell>{user?.isDeactivate ? 'Deactivate' : 'Not Deactivate'}</TableCell>
              <TableCell>{user?.isBlocked ? 'Blocked' : 'Not Blocked'}</TableCell>
              <TableCell>{user?.isDeleted ? 'Deleted' : 'Not Deleted'}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <div>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                        className="bg-[#426CBE] text-white  hover:bg-[#b2c2e2] "
                          variant="outline"
                          onClick={()=> setUserInfo(user)}
                        >
                          <Edit size="18" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Update Order Information</SheetTitle>
                          <SheetDescription>
                            Make changes to user here. Click save when you're
                            done.
                          </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                          <div className="">
                            <BSForm form={form} onSubmit={handleUpdateUser}>
                              <BSInput
                                form={form}
                                type="text"
                                name="name"
                                label="Name"
                                required={false}
                                placeholder={user?.name}
                                className="border-gray-400 "
                              />
                              <BSInput
                                form={form}
                                type="text"
                                name="phone"
                                label="Phone"
                                required={false}
                                placeholder={user?.phone}
                                className="border-gray-400 "
                              />
                              <BSInput
                                form={form}
                                type="email"
                                name="email"
                                label="Email"
                                required={false}
                                placeholder={user?.email}
                                className="border-gray-400 "
                              />
                              <Select
                                onValueChange={(value) =>
                                  form.setValue("role", value)
                                }
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder={user?.role} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value={"user"}>
                                      User
                                    </SelectItem>
                                    <SelectItem value={"admin"}>
                                      Admin
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <Select
                                onValueChange={(value) =>
                                  form.setValue("isDeactivate", value)
                                }
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Is Deactivate" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value={"Yes"}>
                                      True
                                    </SelectItem>
                                    <SelectItem value={"No"}>
                                      False
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <Select
                                onValueChange={(value) =>
                                  form.setValue("isBlocked", value)
                                }
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Is Blocked" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value={"Yes"}>
                                      True
                                    </SelectItem>
                                    <SelectItem value={"No"}>
                                      False
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <Select
                                onValueChange={(value) =>
                                  form.setValue("isDeleted", value)
                                }
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Is Deleted" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value={"Yes"}>
                                      True
                                    </SelectItem>
                                    <SelectItem value={"No"}>
                                      False
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <Button type="submit" className="w-full">
                                Update Product
                              </Button>
                            </BSForm>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                  <div>
                    <Button
                    className="bg-red-400 text-white hover:bg-red-200"
                      variant="outline"
                      onClick={() =>
                        handleDeleteProduct(user?._id as string)
                      }
                    >
                      <Delete size="18" />
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
          <TableRow></TableRow>
        </TableBody>
      </Table>
      </div>
      {
        totalPages>=1 && <div className="flex justify-center items-center gap-2 pb-4 py-4">
        <div>
          <Button size={"sm"} variant={"outline"} onClick={handlePrev}>
            <ArrowLeft />
          </Button>
        </div>
        <div className="flex justify-center items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(0.3)
            .map((item: number, index: number) => (
              <Button
                key={index}
                size={"sm"}
                variant={"outline"}
                onClick={() => {
                  queryParam.push({ name: "page", value: item });
                  setParams(queryParam);
                  setCurrentPage(item);
                }}
                className={`${
                  currentPage === item
                    ? "bg-[#1B4D3E] text-white"
                    : "text-primary"
                }`}
              >
                {item}
              </Button>
            ))}
        </div>
        <div>
          <Button size={"sm"} variant={"outline"} onClick={handleNext}>
            <ArrowRight />
          </Button>
        </div>
      </div>
      }
    </div>
  );
};

export default ManageUsers;
