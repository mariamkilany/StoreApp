import React,{useContext} from 'react';
import {AppContext} from '../App'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage
} from 'mdb-react-ui-kit';

export default function Product(product) {
    const {selectedProducts,setSelected,totalPrice,setTotalPrice,total,setTotal}=useContext(AppContext)

    return (
        <div className='col-lg-3 col-md-4 col-sm-6 product'>
        <MDBCard className='shadow m-2'>
        <MDBCardImage src={product.props.image} position='top' alt='...' />
        <MDBCardBody>
            <MDBCardTitle>{product.props.category}</MDBCardTitle>
            <MDBCardText>
            {product.props.title}
            </MDBCardText>
            <MDBCardText className='fw-bold fs-5'>
            {product.props.price}$
            </MDBCardText>
            <button className='btn btn-primary' onClick={()=>{
                var found=selectedProducts.find((ele)=>{
                    return ele.id===product.props.id
                })
                if(found===undefined){
                setSelected([...selectedProducts,{...product.props,num:1}])
                }
                else{
                    var newArr=selectedProducts.map(element => {
                        if(element.id===product.props.id){
                            return {...product.props ,num:element.num+1} 
                        }
                        return element
                    });
                    setSelected(newArr)
                }
                setTotalPrice((+totalPrice+product.props.price).toFixed(2))
                setTotal(total+1)
            }} >Add to cart</button>
        </MDBCardBody>
        </MDBCard>
        </div>
    );
}