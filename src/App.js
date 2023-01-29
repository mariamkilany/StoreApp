import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header';
import Product from './components/Product';
import axios from 'axios';
import { useEffect, useState , createContext } from 'react';

export const AppContext =createContext(null);

function App() {
  const [products,setProducts]=useState([])
  const [selectedProducts,setSelected]=useState([]);
  const [total,setTotal]=useState(0);
  const [totalPrice,setTotalPrice]=useState(0);
  const [category,setCategory]=useState("all")

  useEffect(()=>{
    axios.get('https://fakestoreapi.com/products').then((res)=>{
      setProducts(res.data)
    })
  },[])

  return (
    <AppContext.Provider value={{selectedProducts,setSelected,totalPrice,setTotalPrice,total,setTotal}}>
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
            return <Product props={product} key={product.id}/>
          }
          return ''
        })}
      </div>
    </div>
    </AppContext.Provider>
  );
}

export default App;
