import { Heart, ShoppingCart, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
    {
        icon: <Heart size={20}/>,
        path: "/",
        key: "1"
    },
    {
        icon: <ShoppingCart size={20}/>,
        path: "/",
        key: "2"
    },
    {
        icon: <User size={20}/>,
        path: "/",
        key: "3"
    }
]

const Header = () => {
    return (
        <div className="border py-2 hidden sm:hidden md:hidden lg:block bg-black text-white">
            <div className="flex justify-between items-center mx-[5%]">
                <div>Contact: +1 234 567 890</div>
                <div className="flex justify-between items-center gap-4">
                    {
                        items.map((item)=><NavLink to={item.path}><div key={item.key} className={"cursor-pointer"}>{item.icon}</div></NavLink>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;