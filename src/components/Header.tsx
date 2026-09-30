import { Link } from 'react-router-dom'
import { FiShoppingCart } from "react-icons/fi";
import Logo from '../Logo';
import { useCart } from '../hooks/useCart';

function Header () {

    const { cartItems } = useCart();

    const totalQuantity = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );


    return (
        <header className="sticky top-0 z-50">
        
        <div>

        <div className="bg-[#c4607a] text-white text-center text-xs py-2
        font-semibold">
            GRATIS FRAKT VID KÖP ÖVER 699 KR · RETURRÄTT 30 DAGAR
        </div>

        <div className="bg-[#fdf8f6] flex justify-between items-center px-8 py-5">

            <Logo />
            
            <div className='relative'>
                <Link to="/Cart" aria-label="Öppna kundvagn">
                <FiShoppingCart className="w-8 h-8"/>

                {totalQuantity >= 1 && (
                    <span data-testid="cart-badge" className="absolute -top-2 -right-2 bg-[#c4607a] text-white
                    text-xs rounded-full min-w-5 h-5 flex items-center justify-center">
                        {totalQuantity}
                    </span>
                )}
                </Link>
            </div>

        </div>  

        </div>
        
        </header>
    )
};

export default Header;