import { Heart, ShoppingCart, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
const items = [
  {
    icon: <Heart size={20} />,
    path: "/",
    key: "1",
  },
  {
    icon: <ShoppingCart size={20} />,
    path: "/",
    key: "2",
  },
];

const Header = () => {
  const user = useAppSelector(selectCurrentUser)
  const { currentData } = useGetMeQuery(undefined);
  console.log(currentData);
  return (
    <div className="border py-2 hidden sm:hidden md:hidden lg:block bg-black text-white">
      <div className="flex justify-between items-center mx-[5%]">
        <div>Contact: +1 234 567 890</div>
        <div className="flex justify-between items-center gap-4">
          {items.map((item) => (
            <NavLink to={item.path} key={item.key}>
              <div className={"cursor-pointer"}>{item.icon}</div>
            </NavLink>
          ))}
          <Popover>
            <PopoverTrigger asChild>
              <div className=" text-white text-center font-bold  hover:cursor-pointer uppercase">
                {user !== null ? (
                  currentData?.data?.name?.slice(0, 1)
                ) : (
                  <User className="w-full flex items-center justify-center" />
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 space-y-4 font-semibold">
              <div>
              <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "menu-item active" : "menu-item"
                    }
                    style={{ textDecoration: "none" }}
                  >
                    <li style={{ listStyle: "none" }}>Login</li>
                  </NavLink>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Header;
