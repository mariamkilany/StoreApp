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

    const {selectedProducts,setSelected,totalPrice,setTotalPrice,total,setTotal}=useContext(AppContext)

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
                                        var newArr=selectedProducts.map(element => {
                                            if(element.id===item.id){
                                                return {...item ,num:element.num+1}
                                            }
                                            return element
                                        });
                                        setSelected(newArr)
                                        setTotalPrice((+totalPrice+item.price).toFixed(2))
                                        setTotal(total+1)
                                    }}
                                    >+</button>
                                    <span style={{margin:"10px"}} >{item.num}</span>
                                    <button className="btn btn-light"
                                    onClick={
                                        ()=>{
                                            var newArr=selectedProducts.map(element => {
                                            if(element.id===item.id && element.num!==0){
                                                setTotalPrice((+totalPrice-item.price).toFixed(2))
                                                setTotal(total-1)
                                                return {...item ,num:element.num-1}
                                            }
                                            return element
                                        });
                                        newArr=newArr.filter((ele)=>ele.num!==0)
                                        setSelected(newArr)
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

