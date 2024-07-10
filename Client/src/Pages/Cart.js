import React, { useEffect, useState } from 'react'
import CartItem from '../Components/CartItem'
import { useSelector } from 'react-redux'
import { toast,ToastContainer } from 'react-toastify'
import StripeCheckout from 'react-stripe-checkout';


const Cart = () => {
  const productData = useSelector((state)=>state.bazar.productData)
  const userInfo = useSelector((state)=>state.bazar.userInfo)
  const [totalAmt,setTotalAmt] = useState("");
  const [paynow,setPaynow]=useState(false);
  const handleCheckOut = ()=>{
    if(userInfo){
      setPaynow(true)
    }else{
      toast.error("Please Sign in First")
    }
  }
  useEffect(()=>{
    let price=0;
    productData.map((item)=>{
      price += item.price * item .quantity;
    })
    setTotalAmt(price.toFixed(2));
  },[productData])
  return (
    <div>
      <img
        className="w-full h-60 object-cover"
        src="https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="cartImg"
      />
      <div className='max-w-screen-xl mx-auto py-20 flex'>
        <CartItem/>
        <div className='w-1/3 bg-[#fafafa] py-6 px-4'>
         <div className=" flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
          <h2 className="text-2xl font-medium ">Card Totals</h2>
          <p className="flex items-center gap-4 text-base">
                Subtotal{" "}
                <span className="font-titleFont font-bold text-lg">
                  ${totalAmt}
                </span>
              </p>
              <p className="flex items-start gap-4 text-base">
                Shipping{" "}
                <span>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Quos, veritatis.
                </span>
              </p>
              </div>
              <p className="font-titleFont font-semibold flex justify-between mt-6">
              Total <span className="text-xl font-bold">${totalAmt}</span>
            </p>
            <button onClick={handleCheckOut}
              className="text-base bg-black text-white w-full py-3 mt-6 hover:bg-gray-800 duration-300"
            >
              Proceed to checkout
            </button>
            {paynow && (
              <div className="w-full mt-6 flex items-center justify-center">
                <StripeCheckout
                  stripeKey="pk_test_51PLedmKK3z9KZzet7cnJdoBn1uGvzfLB1ogq7JnpuXsuTcrUOw8nA7SD7NbW2DqflC1382Ls6bUwkf044jCBw9OV00Z2Lc0ZEL"
                  name="Bazar Online Shopping"
                  amount={totalAmt * 100}
                  label="Pay to bazar"
                  description={`Your Payment amount is $${totalAmt}`}
                 // token={payment}
                  email={userInfo.email}
                />
             </div>
         )}
        </div>
      </div>
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

export default Cart
