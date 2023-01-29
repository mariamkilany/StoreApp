import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header';
import Product from './components/Product';
import axios from 'axios';
import { useEffect, useState , createContext ,useReducer } from 'react';

export const AppContext =createContext(null);

function HandleSelected(state,action){
  var newArr;
  switch(action.type){
    case 'Increase':
      var found=state.find((ele)=>{
          return ele.id===action.item.id
      })
      if(found===undefined){
          return [...state,{...action.item,num:1}]
      }
      else{
          newArr=state.map(element => {
              if(element.id===action.item.id){
                  return {...action.item ,num:element.num+1} 
              }
              return element
          });
              return newArr
        }
    case 'Decrease':
      newArr=state.map(element => {
          if(element.id===action.item.id && element.num!==0){
              return {...action.item ,num:element.num-1}
            }
              return element
          });
      newArr=newArr.filter((ele)=>ele.num!==0)
        return newArr
    case 'display':
      default:
        throw new Error();
  }
}

function HandleTotalPrice(state,action){
  switch(action.type){
    case 'Increase':
      return (+state+action.item.price).toFixed(2)
    case 'Decrease':
      return (+state-action.item.price).toFixed(2)
    default:
        throw new Error();
  }
}

function HandleTotal(state,action){
  switch(action.type){
    case 'Increase':
      return state +1;
    case 'Decrease':
      return state -1;
    default:
      throw new Error();
  }
}

function App() {
  const [products,setProducts]=useState([])
  const [category,setCategory]=useState("all")
  const [selectedProducts,dispatchSelected]=useReducer(HandleSelected,[])
  const [totalPrice,dispatchTotalPrice]=useReducer(HandleTotalPrice,0)
  const [total,dispatchTotal]=useReducer(HandleTotal,0)
  useEffect(()=>{
    axios.get('https://fakestoreapi.com/products').then((res)=>{
      setProducts(res.data)
    })
  },[])

  return (
    <AppContext.Provider value={{selectedProducts,totalPrice,dispatchTotalPrice,total,dispatchSelected,dispatchTotal}}>
    <div className="App">
      <Header/>
      <div className='num row'>
        <span className='col-sm-6'>
          {
            category !=='all'?products.filter(product=>product.category===category).length:products.length
          } PRODUCT FOUND
        </span>
        <div className="list-group col-md-6">
          <button type="button" className={`list-group-item list-group-item-action ${category==="all"?"active":""}`} onClick={()=>setCategory('all')}>All</button>
          <button type="button" className={`list-group-item list-group-item-action ${category==="men's clothing"?"active":""}`} onClick={()=>setCategory("men's clothing")}>men's clothing</button>
          <button type="button" className={`list-group-item list-group-item-action ${category==="women's clothing"?"active":""}`} onClick={()=>setCategory("women's clothing")}>women's clothing</button>
          <button type="button" className={`list-group-item list-group-item-action ${category==="jewelery"?"active":""}`} onClick={()=>setCategory('jewelery')}>jewelery</button>
          <button type="button" className={`list-group-item list-group-item-action ${category==="electronics"?"active":""}`} onClick={()=>setCategory('electronics')}>electronics</button>
        </div>
          </div>
      <div className='products row m-4'>
        {
        products.map(product => {
          if(category==='all'|| product.category===category){
            return <Product props={{...product}} key={product.id}/>
          }
          return ''
        })}
      </div>
    </div>
    </AppContext.Provider>
  );
}

export default App;
