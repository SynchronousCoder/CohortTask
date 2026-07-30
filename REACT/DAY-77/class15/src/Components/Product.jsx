import React, { useContext } from 'react'
import { ProductContext } from '../Context/ProductDataContext';
import { Link } from 'react-router-dom';

const Product = () => {
    const data  = useContext(ProductContext);
    // console.log(data.productData);
    if(data.productData.length == 0){
        return <h1>Loading...</h1>
    }
  return (
    <div className='main'>
      {data.productData.map((item, idx) => {
        return (
            <Link className='card' key={idx} to={`/${item.id}`}>
                <img className='img' src={item.image} alt={item.title} />
                <h1 className='title'>{item.title}</h1>
                <h2 className='price'>${item.price}</h2>
            </Link>
        )
      })}
    </div>
  )
}

export default Product
