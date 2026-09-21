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

            <div className="font-display text-2xl tracking-[0.2em]">
                <Link to="/">Fredrik's Angels</Link>
            </div>

            <div>
                <Link to="/Cart">
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