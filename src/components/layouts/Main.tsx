import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Header from "../shared/Header";

const Main = () => {
    return (
        <div>
            <Header/>
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default Main;