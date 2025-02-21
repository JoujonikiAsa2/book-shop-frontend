import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { LogOutIcon, Menu, ShoppingCartIcon, User } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { RootState } from "@/redux/store";
const items = [
  {
    label: (
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
        style={{ textDecoration: "none" }}
      >
        <li style={{ listStyle: "none" }}>Home</li>
      </NavLink>
    ),
    key: "1",
  },
  {
    label: (
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
        style={{ textDecoration: "none" }}
      >
        <li style={{ listStyle: "none" }}>About</li>
      </NavLink>
    ),
    key: "2",
  },
  {
    label: (
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
        style={{ textDecoration: "none" }}
      >
        <li style={{ listStyle: "none" }}>Contact</li>
      </NavLink>
    ),
    key: "3",
  },
  {
    label: (
      <NavLink
        to="/all-products"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
        style={{ textDecoration: "none" }}
      >
        <li style={{ listStyle: "none" }}>All Products</li>
      </NavLink>
    ),
    key: "4",
  },
];

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { currentData } = useGetMeQuery(undefined);
  const user = useAppSelector(selectCurrentUser);
  const totalProducts = useAppSelector((state: RootState) => state.cart.totalProducts)
  console.log(totalProducts)
  return (
    <div className="py-8 border-b">
      <div className="flex justify-between items-center mx-[5%]">
        <Link to="/">
          <div className="flex gap-2 justify-center items-center">
            <img src={logo}  className="size-12"/>
            <p className="poppins-semibold text-xl text-[#E07A5F]">InkSpire</p>
          </div>
        </Link>
        <div className="hidden md:hidden lg:flex justify-end items-center gap-6 poppins-regular">
          {items.map((item) => (
            <div key={item.key}>{item.label}</div>
          ))}
          {user?.role == "user" && (
            <NavLink
              to="/dashboard/user/order-details"
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
              style={{ textDecoration: "none" }}
            >
              <li style={{ listStyle: "none" }}>Dashboard</li>
            </NavLink>
          )}
          {user?.role == "admin" && (
            <NavLink
              to={`/dashboard/admin/manage-orders`}
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
              style={{ textDecoration: "none" }}
            >
              <li style={{ listStyle: "none" }}>Dashboard</li>
            </NavLink>
          )}
        </div>
        <div className="md:flex lg:hidden flex gap-4">
          <div className="flex gap-5 items-center">
            <NavLink to="/cart" className="relative">
              <ShoppingCartIcon size={20} />
              <div className="absolute inset-0 translate-x-2 -translate-y-3 w-fit flex justify-center items-center p-1 rounded-full bg-black text-white text-xs">
                {`${totalProducts > 10 ? 10 + "+" : totalProducts}`}
              </div>
            </NavLink>
            <Sheet>
              <SheetTrigger asChild>
                <Menu />
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-8 mt-12 poppins-regular">
                  {items.map((item) => (
                    <div key={item.key}>{item.label}</div>
                  ))}
                  {user?.role === "user" && (
                    <>
                      <NavLink
                        to={`/dashboard/user/order-details`}
                        className={({ isActive }) =>
                          isActive ? "menu-item active" : "menu-item"
                        }
                        style={{ textDecoration: "none" }}
                      >
                        <li style={{ listStyle: "none" }}>Dashboard</li>
                      </NavLink>
                      <div className="mt-8">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => dispatch(logout())}
                        >
                          <LogOutIcon />
                          Logout
                        </Button>
                      </div>
                    </>
                  )}
                  {user?.role === "admin" && (
                    <>
                      <NavLink
                        to={`/dashboard/admin/manage-orders`}
                        className={({ isActive }) =>
                          isActive ? "menu-item active" : "menu-item"
                        }
                        style={{ textDecoration: "none" }}
                      >
                        <li style={{ listStyle: "none" }}>Dashboard</li>
                      </NavLink>
                      <div className="mt-8">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => dispatch(logout())}
                        >
                          <LogOutIcon />
                          Logout
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            <Popover>
              <PopoverTrigger asChild>
                <div className="size-7 rounded-full bg-black text-white text-center font-bold  hover:cursor-pointer uppercase">
                  {currentData?.data?.name?.slice(0, 1) !== undefined ? (
                    currentData?.data?.name?.slice(0, 1)
                  ) : (
                    <User className="w-full " />
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 space-y-4 p-4 poppins-semibold">
                {user?.role == "user" && (
                  <li style={{ listStyle: "none" }}>
                    {currentData?.data?.name}
                  </li>
                )}
                {user?.role == "admin" && (
                  <li style={{ listStyle: "none" }}>
                    {currentData?.data?.name}
                  </li>
                )}
                {!user && (
                  <NavLink
                    to={`/login`}
                    className={({ isActive }) =>
                      isActive ? "menu-item active" : "menu-item"
                    }
                    style={{ textDecoration: "none" }}
                  >
                    <li style={{ listStyle: "none" }}>Login</li>
                  </NavLink>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
