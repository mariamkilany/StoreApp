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
    const {dispatchTotalPrice,dispatchSelected,dispatchTotal}=useContext(AppContext)

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
                dispatchSelected({type:'Increase',item:product.props})
                dispatchTotalPrice({type:'Increase',item:product.props})
                dispatchTotal({type:'Increase'})
            }} >Add to cart</button>
        </MDBCardBody>
        </MDBCard>
        </div>
    );
}