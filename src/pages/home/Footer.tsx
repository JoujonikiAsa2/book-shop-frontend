import { RiFacebookBoxFill, RiLinkedinBoxFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className=" flex justify-between mx-[5%] py-10">
        <aside className="flex flex-col">
          <p>
            <span className="text-xl font-medium">InkSpire</span>
            <br />
            Providing reliable tech since 2025
          </p>
        </aside>
        
        <nav className="flex flex-col">
          <h6 className="footer-title">Services</h6>
          <Link to="/" className="link link-hover">Home</Link>
          <Link to="/" className="link link-hover">About us</Link>
          <Link to="/" className="link link-hover">Contact</Link>
          <Link to="/" className="link link-hover">All Products</Link>
        </nav>
        <nav className="flex flex-col">
          <h6 className="footer-title">Contact</h6>
          <a href="tel:+0123456789" className="link link-hover">Phone: + 0123 456 789</a>
          <a href= "mailto:inkspire@email.com">inkspire@email.com</a>
        </nav>
        <nav className="flex flex-col">
          <h6 className="footer-title">Social</h6>
          <div className="flex gap-2">
          <Link to="https://www.facebook.com/joujoniki" target="new" className="link link-hover"><RiFacebookBoxFill size={24}/></Link>
          <Link to="https://www.linkedin.com/in/joujonikiasaroy/" target="new" className="link link-hover"><RiLinkedinBoxFill size={24}/></Link>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
