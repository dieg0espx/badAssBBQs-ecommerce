import React, {useContext, useEffect} from 'react'
import { useProducts } from '../context/ProductsContext'; // Import the custom hook\
import { useCart } from '../context/CartContext'; // Import the custom hook\
import { Link } from 'react-router-dom';
import { toCamelCase, formatCurrency, formatBrandName } from '../Utils/Helpers'


function Cart() {
  // const { loadAllProducts } = useProducts();
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, []);

  const totalCost = cartItems.reduce((accumulator, item) => {
    return accumulator + item.Price * item.quantity;
  }, 0);



  return (
    <div className='min-h-[80vh]'>      
    <p className="font-bold text-[30px] text-center sm:text-left px-10 pt-5 pb-0"> My Cart </p> 
      {cartItems.length === 0 ? (
      <>
        <div className='h-[70vh] xl:h-[100vh] flex items-center justify-center flex-col gap-[10px]'>
          <i class="bi bi-cart-x text-[10vw] text-red -mt-[20%]"></i>
          <p className='text-[20px] xl:text-[30px]'> Opps, your cart seems to be empty.</p>
          <p className='text-[20px] xl:text-[30px]'> Please add some products.</p>          
          <Link to='/products/all/all' className='text-[15px] xl:text-[20px] bg-red text-white px-10 py-1 mt-5 rounded border border-red hover:bg-white hover:text-red'> View Products </Link>
        </div>
        <hr></hr>
      </>
      ) : (
      <div className='p-5 xl:p-10 flex gap-[10px] flex-col lg:flex-row'>        
        <div className='basis-[70%]'>
          {cartItems.map((item, index) => (
            <div key={index} className="border border-gray-200 flex w-full flex-col md:flex-row gap-10 items-center px-[30px] py-[20px] rounded mb-[10px]">
             <img src={item.Image} className="w-full md:w-[100px] object-cover" alt="Product Image"/>
            
             <div className="flex flex-col justify-center w-full">
               <p><b>ID</b> {item.Id} | <b>MODEL</b> {item.Model}</p>
               <p><b>Brand:</b> {formatBrandName(item.brand)}</p>
               <p>{item.Title}</p>
               <p className='text-green-800 font-semibold'>{item.Price > 49 ? 'Free Shipping' : ''}</p>
             </div>
            
            <div className='grid grid-cols-[auto_2fr_1fr] items-center gap-[23px]'>
            <input 
              type="number" 
              value={item.quantity} 
              min="1" 
              onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
              className="text-center border rounded h-10 w-[50px]"
            />

             <p className="text-center">{formatCurrency(item.Price)}</p>

             <i className="bi bi-trash3 text-gray-400 hover:text-red" onClick={() => removeFromCart(index)}></i>
            </div>

            </div>
          ))}
        </div>
        <div className='border border-gray-200 mb-[10px] w-full basis-[30%] rounded self-start'>
          <p className='px-[15px] py-[10px] mb-[30px] rounded-t font-bold border-b border-gray-200 text-[30px]'> Your Total </p>
          <div className='p-[15px]'>
            <div className='flex justify-between mb-[15px]'>
              <p className='text-[18px]'> <b>Subtotal</b></p>
              <p className='text-[18px]'>{formatCurrency(totalCost)} </p>
            </div>

            <div className='flex justify-between mb-[15px]'>
              <p className='text-[18px]'> <b>Shipping</b></p>
              <p className='text-[18px] text-green-800 font-semibold'>{totalCost > 49 ? "FREE" : '$6.95 USD' } </p>
            </div>

            <div className='flex justify-between mb-[15px]'>
              <p className='text-[18px]'> <b>TAX</b></p>
              <p className='text-[18px]'>Calculated at Checkout </p>
            </div>
            <hr className='my-[20px]'></hr>
            <Link to='/checkout' className='block bg-red text-white px-[10px] py-[5px] mb-[5px] text-center rounded border border-red hover:bg-white hover:text-red'> Proceed to Checkout </Link>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default Cart
