import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header';
import Product from './components/Product';
import axios from 'axios';
import { useEffect, useState , createContext } from 'react';

export const AppContext =createContext(null);

function App() {
  const [length,setLength]=useState(0)
  const [products,setProducts]=useState([])
  const [selectedProducts,setSelected]=useState([]);
  const [total,setTotal]=useState(0);
  const [totalPrice,setTotalPrice]=useState(0);

  useEffect(()=>{
    axios.get('https://fakestoreapi.com/products').then((res)=>{
      setLength(res.data.length)
      setProducts(res.data)
    })
  },[])

  return (
    <AppContext.Provider value={{selectedProducts,setSelected,totalPrice,setTotalPrice,total,setTotal}}>
    <div className="App">
      <Header/>
      <div className='num'>{length} PRODUCT FOUND</div>
      <div className='products row m-4'>
        {
        products.map(product => {
            return <Product props={product} key={product.id}/>
          })
        }
      </div>
    </div>
    </AppContext.Provider>
  );
}

export default App;
