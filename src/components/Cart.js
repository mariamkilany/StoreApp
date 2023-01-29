import React, { useState , useContext } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from "mdb-react-ui-kit";
import {AppContext} from '../App'

export default function Cart() {
    const [basicModal, setBasicModal] = useState(false);

    const {selectedProducts,totalPrice,total,dispatchTotalPrice,dispatchSelected,dispatchTotal}=useContext(AppContext)

    const toggleShow = () => setBasicModal(!basicModal);

    return (
        <>
        <button style={{backgroundColor:"transparent",border: "none" ,padding:0}} onClick={toggleShow}>
            <AiOutlineShoppingCart className='cartIcon'/>
        </button>
        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
            <MDBModalDialog>
            <MDBModalContent>
                <MDBModalHeader>
                <MDBModalTitle>Cart</MDBModalTitle>
                <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={toggleShow}
                ></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <span>Total items : {total}</span>
                        </li>
                        {selectedProducts.map((item)=>{
                            return <li className="list-group-item" key={item.id}>
                                <img src={item.image} alt="item img"/>
                                <span>{item.price}$</span>
                                <div>
                                    <button className="btn btn-light"
                                    onClick={()=>{
                                        dispatchSelected({type:'Increase',item:item})
                                        dispatchTotalPrice({type:'Increase',item:item})
                                        dispatchTotal({type:'Increase'})
                                    }}
                                    >+</button>
                                    <span style={{margin:"10px"}} >{item.num}</span>
                                    <button className="btn btn-light"
                                    onClick={
                                        ()=>{
                                        dispatchSelected({type:'Decrease',item:item})
                                        dispatchTotalPrice({type:'Decrease',item:item})
                                        dispatchTotal({type:'Decrease'})
                                        }
                                    }
                                    >-</button>
                                </div>
                            </li>
                        })}
                        <li className="list-group-item">Total price : {totalPrice} $</li>
                    </ul>
                </MDBModalBody>
                <MDBModalFooter>
                </MDBModalFooter>
            </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
        </>
    );
}

