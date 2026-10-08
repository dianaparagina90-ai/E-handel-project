import { SlSocialInstagram } from "react-icons/sl";
import { TiSocialFacebook } from "react-icons/ti";
import { HiOutlineMail } from "react-icons/hi";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="bg-[#fdf8f6] px-6 py-8">
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
        <div className="md:flex-1 text-center md:text-left">
          <h3 className="font-semibold mb-2">Kontakta oss</h3>
          <address className="not-italic text-sm">
            Fredrik's Angels AB
            <br />
            Storgatan 1, 111 22 Stockholm
            <br />
            0701-234567
          </address>
        </div>

        <div className="md:flex-1 flex flex-col items-center">
          <Logo />
          <p className="text-sm mt-2 text-[#2c1f1a]/60">
            © 2026 Fredrik's Angels AB. Alla rättigheter förbehållna.
          </p>
        </div>

        <div className="md:flex-1 flex items-center justify-center gap-4 md:justify-end">
          <SlSocialInstagram
            aria-label="Instagram"
            className="hover:scale-105 cursor-pointer 
          transition-transform duration-200"
            size={24}
            color="#c4607a"
          />
          <TiSocialFacebook
            aria-label="Facebook"
            className="hover:scale-105 cursor-pointer 
          transition-transform duration-200"
            size={26}
            color="#c4607a"
          />
          <HiOutlineMail
            aria-label="Mail"
            className="hover:scale-105 cursor-pointer 
          transition-transform duration-200"
            size={24}
            color="#c4607a"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
