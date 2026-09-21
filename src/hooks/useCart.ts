import { useContext } from "react"
import { CartItemContext } from "../components/context/CartItemContext"

export const useCart = ()=> {
    const context = useContext(CartItemContext)

    if(!context) {
        throw new Error("useCart must be used within CartItemProvider")
    }

    return context
}