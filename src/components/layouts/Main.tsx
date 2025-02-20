import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Header from "../shared/Header";
import Footer from "../shared/Footer";

const Main = () => {
    return (
        <div>
            <Header/>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Main;