import { Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaHeart, FaStar } from 'react-icons/fa6'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';

const UserProductCard = ({product}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const {pathname} = useLocation()

    const navigate = useNavigate()

    const handleAddWishlist = (event) => {
        event.preventDefault()
    }

    const formatRupees = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0, // Adjust if you want decimals
        }).format(amount);
    };

    const handleBuyNow = (event) => {
        event.preventDefault()
        if(isLoggedIn){
            navigate("/checkout", {
                state: {
                    products: [{
                        productDetails: product,
                        quantity: 1
                    }]
                }
            })
        }
        else{
            navigate("/login",{
                state: {
                    products: [{
                        productDetails: product,
                        quantity: 1
                    }],
                }
            })
        }
    }

    useEffect(() => {
        const sessionToken = Cookies.get('SessionID');
        if (sessionToken) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }, [pathname]);

  return (
    <Link to={`/products/${product._id}`} className='shadow-custom-medium hover:shadow-custom-heavy transition rounded-md'>
      <div className='h-56'>
        <img 
            src='https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg'
            className='w-full h-full rounded-t-md object-contain'
        />
      </div>
      <div className='px-5 py-3 flex flex-col gap-4'>
        <div>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-medium text-gray-800'>{product.productName}</h1>
                <Tooltip title="Add to wishlist">
                    <button onClick={(event) => handleAddWishlist(event)}>
                        {
                            
                            <FaHeart className='text-gray-300 text-2xl transition hover:transform hover:scale-[120%]'/>
                        }
                    </button>
                </Tooltip>
            </div>
        <p className='text-sm text-gray-500 font-light'>{product.productDescription}</p>
        </div>
        <h1 className='text-xs text-gray-500'>Category:<span className='text-gray-700 capitalize text-base'> {product.productType}</span></h1>
        <div className='flex items-center justify-between'>
            <h1 className='text-xl text-gray-900 font-semibold'>{formatRupees(product.price)}/-</h1>
            {
                true &&
                    <p className={`flex items-center gap-1 text-white px-2 rounded-sm ${product.rating >= 4 ? "bg-green-600" : product.rating === 3 ? "bg-yellow-300" : "bg-red-500" }`}>
                    {product.rating}
                    <FaStar className={`text-white text-sm`}/>
                </p>
            }
        </div>

        <div className='flex justify-between items-center w/full gap-3'>
            <button onClick={(event) => handleBuyNow(event)} className='bg-green-500 py-1 rounded-md text-white w-1/2 hover:bg-green-400'>Buy now</button>
            <button className='bg-blue-500 py-1 rounded-md text-white w-1/2 hover:bg-blue-400'>Add to cart</button>
        </div>
      </div>
    </Link>
  )
}

export default UserProductCard