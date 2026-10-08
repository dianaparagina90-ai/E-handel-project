import { Link } from 'react-router-dom'

function Logo () {
    return (
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
    )
 }
 
 export default Logo; 
 
 