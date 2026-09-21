import { Link } from 'react-router-dom'
import cartIcon from "../assets/cartIcon.png";

function Header () {
    return (
        <header>
        
        <div>

        <div className="bg-[#c4607a] text-white text-center text-xs py-2
        font-semibold">
            GRATIS FRAKT VID KÖP ÖVER 699 KR · RETURRÄTT 30 DAGAR
        </div>

        <div className="bg-[#fdf8f6] flex justify-between items-center px-8 py-5">

            <div>
                <Link to="/" className="inline-flex flex-col items-center leading-none">
            <span className="font-display text-[10px] italic tracking-[0.2em] text-[#c4607a]">
                Fredrik's
            </span>

            <span className="font-display text-2xl uppercase tracking-[0.22em] text-[#2c1f1a]">
                Angels
            </span>

            </Link>
            </div>

            <div>
                <Link to="/Cart" aria-label="Öppna kundvagn">
                <img
                src={cartIcon}
                alt="Kundvagn"
                className="w-10 h-10 object-contain"/>
                </Link>
            </div>

        </div>  

        </div>
        
        </header>
    )
};

export default Header;