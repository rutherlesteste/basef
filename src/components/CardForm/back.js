import React, { useEffect, useState }  from 'react'
import Image from 'next/image'
import Avatar from '../Avatar'
const truck = require('../../images/truck.svg')
import { formatPrice } from '@/utils'
import { LocationSearching } from '@mui/icons-material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SplitButton from '../SplitButton'
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import Slider from '@mui/material/Slider';
import styles from './Card2.module.sass'
import classNames from 'classnames'
import cn from 'classnames'

export default function (props){
  const {service,handleService} = props
  const {image2,id,value_hours,value_helpers } = service
  const [hours, setHours] = React.useState(parseInt(service.hours));
  const [helpers, setHelpers] = React.useState(parseInt(service.helpers));
  const [value,setValule] = useState()


  useEffect(() => {
    console.log(service);
    if (!id) return;

    let total =
      hours * value_hours +
      helpers * value_helpers -
      value_helpers;

    console.log(total);

  setValule(total)
    

  }, [helpers, hours]);
 
  
  const handleChangeHelp = ( event,newValue) => {
   
      setHelpers(newValue);

  };

  const handleChangeHours = ( event,newValue) => {
  
    setHours(newValue);
  };
  
  const maxCount = 10; 

  const increment = (type) => {
    if(type == 'help'){
      setHelpers(prevCount => Math.min(prevCount + 1, maxCount));
      return;
    }
    setHours(prevCount => Math.min(prevCount + 1, maxCount));

  };

  const decrement = (type) => {
    if(type == 'help'){
      setHelpers(prevCount => Math.max(prevCount - 1, service.helpers)); // Defina um valor mínimo, se necessário;
      return;
    }
    setHours(prevCount => Math.max(prevCount - 1, service.hours)); // Defina um valor mínimo, se necessário;
  };


  console.log(service)
  return(

<div className={cn(styles['master-container'])}>
  <div className={cn(styles['card'], styles.cart)}>
    <label className={styles.title}>Your cart</label>
    <div className={styles.products}>
      <div className={styles.product}>
      <img  width={60} height={60} alt='' src={image2} />
        <div>
          <span>Cheese Burger</span>
          <p>Extra Spicy</p>
          <p>No mayo</p>
        </div>
        <div className={styles.quantity}>
          <button>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              height={14}
              width={14}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                stroke="#47484b"
                d="M20 12L4 12"
              />
            </svg>
          </button>
          <label>2</label>
          <button>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              height={14}
              width={14}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                stroke="#47484b"
                d="M12 4V20M20 12H4"
              />
            </svg>
          </button>
        </div>
        <label className={cn(styles['price'], styles.small)} >$23.99</label>
      </div>
    </div>
  </div>
  <div className={cn(styles['card'], styles.coupons)} >
    <label className={styles.title}>Apply coupons</label>
    <form className={styles.form}>
      <input
        type="text"
        placeholder="Apply your coupons here"
        className={styles['input_field']}
      />
      <button>Apply</button>
    </form>
  </div>
  <div className={cn(styles['card'], styles.checkout)} >
    <label className={styles.title}>Checkout</label>
    <div className={styles.details}>
      <span>Your cart subtotal:</span>
      <span>47.99$</span>
      <span>Discount through applied coupons:</span>
      <span>3.99$</span>
      <span>Shipping fees:</span>
      <span>4.99$</span>
    </div>
    <div className={cn(styles['checkout--footer'])}  >
      <label className={styles.price}>
        <sup>$</sup>57.99
      </label>
      <button className={cn(styles['checkout-btn'])}>Checkout</button>
    </div>
  </div>
</div>




    )

  }