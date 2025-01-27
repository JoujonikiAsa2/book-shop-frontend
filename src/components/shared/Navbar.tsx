import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Heart, Menu, ShoppingCartIcon } from "lucide-react";
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
  return (
    <div className="py-8 border-b">
      <div className="flex justify-between items-center mx-[5%]">
        <Link to="/">
          <div className="flex gap-4 justify-center items-center">
            <img src={logo} />
            <p className="jost-semibold text-xl">InkSpire</p>
          </div>
        </Link>
        <div className="hidden md:hidden lg:flex justify-end items-center gap-6">
          {items.map((item) => (
            <div key={item.key}>{item.label}</div>
          ))}
        </div>
        <div className="md:flex lg:hidden flex gap-4">
        <div className="flex gap-4">
              <Heart size={20}/>
              <ShoppingCartIcon size={20}/>
            </div>
          <Sheet>
            <SheetTrigger asChild>
              <Menu />
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-8 mt-12">
                {items.map((item) => (
                  <div key={item.key}>{item.label}</div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
