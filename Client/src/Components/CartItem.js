import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { MdOutlineClose } from "react-icons/md";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { DecreasedQuantity, DeleteItem, IncraementQuantity, resetCart } from '../Redux/bazaarSlice';
import { toast,ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

const CartItem = () => {
  const dispatch = useDispatch()
  const productData = useSelector((state)=>state.bazar.productData)
  console.log(productData)
  return (
    <div className='w-2/3 pr-10'>
      <div className='w-full'>
        <h2 className='font-titleFont text-2xl'>Shopping  Cart</h2>
      </div>
      <div >
        {
          productData.map((item,key)=>(
            <div
                key={item._id}
                className="flex items-center justify-between gap-6 mt-6"
              >
                <div className='flex items-center gap-2'>
                <MdOutlineClose
                onClick={()=>dispatch(DeleteItem(item._id))&toast.error(`${item.title} has been removed`)}  className="text-xl text-gray-600 hover:text-red-600 cursor-pointer duration-300"/>
                <img 
                className='w-32 h-32 object-cover'
                src={item.Image}
                 alt='productimage'/>
            </div>
            <h2>{item.title}</h2>
            <h2>{item.price}</h2>
            <div className='flex items-center gap-4 text-sm font-semibold'>
              <button 
              onClick={()=>dispatch(DecreasedQuantity({
                _id:item._id,
                title:item.title,
                Image:item.Image,
                price:item.price,
                quantity:1,
                description:item.description,
              }))}
              className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
              >-</button>
              <span>{item.quantity}</span>
              <button 
              onClick={()=>dispatch(IncraementQuantity({
                _id:item._id,
                title:item.title,
                Image:item.Image,
                price:item.price,
                quantity:1,
                description:item.description,
              }))}
              className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black">+</button>
              </div>
              <div>
              <p className='w-14'>${item.quantity*item.price}</p>
            </div>
            </div>
            
          ))
        }
      </div>
      <button className='bg-red-500 text-white mt-8 ml-7 py-1 px-6 hover:bg-red-800'
      onClick={()=>dispatch(resetCart())&toast.error("your cart is empty")}
      >Reset Cart</button>
      <Link to='/'>
        <button className='mt-8 ml-7 flex items-center gap-1 text-gray-400 hover:text-black duration-300'><span><HiOutlineArrowLeft/></span>
        go shopping</button>
      </Link>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default CartItem
