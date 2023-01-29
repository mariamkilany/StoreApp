import React, { useContext } from "react";
import {AppContext} from '../App'
import Cart from './Cart';
function Header() {
    const {total}=useContext(AppContext)
    return (
        <header>
        <Cart/>
        <span className="cartn" style={{display:total>0?"block":"none"}}>{total}</span>
        </header>
    )
}

export default Header
