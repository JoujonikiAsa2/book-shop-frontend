import { ShoppingCart, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { RootState } from "@/redux/store";

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const totalProducts = useAppSelector((state: RootState) => state.cart.totalProducts)
  console.log(totalProducts)
  const { currentData } = useGetMeQuery(undefined);
  return (
    <div className="border py-2 hidden sm:hidden md:hidden lg:block bg-[#003C3C] text-white">
      <div className="flex justify-between items-center mx-[5%]">
        <div>Contact: +1 234 567 890</div>
        <div className="flex justify-between items-center gap-8">
          <NavLink to="/cart" className="relative">
            <ShoppingCart size={20} />
            <div className="absolute inset-0 translate-x-2 -translate-y-2 w-fit flex justify-center items-center p-1 rounded-full bg-white text-black text-xs">
              {`${user && totalProducts > 10 ? 10 + "+" : totalProducts}`}
            </div>
          </NavLink>
          <Popover>
            <PopoverTrigger asChild>
              <div className=" text-white text-center font-bold  hover:cursor-pointer uppercase border rounded-full size-8 flex justify-center items-center">
                {user !== null ? (
                  currentData?.data?.name?.slice(0, 1)
                ) : (
                  <User className="w-full flex items-center justify-center" />
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 space-y-4">
              <div>
                {user === null ? (
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "menu-item active" : "menu-item"
                    }
                    style={{ textDecoration: "none" }}
                  >
                    <li style={{ listStyle: "none" }}>Login</li>
                  </NavLink>
                ) : (
                  <div className="flex flex-col gap-4">
                    <h4 className="uppercase">
                      <span className="text-gray-600 uppercase poppins-semibold">Name: </span> {currentData?.data?.name}
                    </h4>
                    <p className="text-gray-400"><span className="text-gray-600 uppercase poppins-semibold">Phone: </span>{currentData?.data?.phone}</p>
                    <p className="text-gray-400"><span className="text-gray-600 uppercase poppins-semibold">Email: </span>{currentData?.data?.email}</p>
                  </div>
                )}
              </div>
            </PopoverContent>
              {
                user && <div className="flex items-center gap-2 border border-red-400 px-2 rounded-full" onClick={() => dispatch(logout())}>
                <span className="text-red-400">Logout</span>
                </div>
              }
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Header;
