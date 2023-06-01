import React  from 'react'
import styles from './Card.module.sass'
import Image from 'next/image'
import Avatar from '../Avatar'
const truck = require('../../images/truck.svg')

export default function ({service}){
  const {image} = service
  console.log(image)
  
  return(

    <div className={styles['card-container']}>
<div className={styles['master-container']}>
  <div className={styles['card']}>
    <div className={styles['cart']}>
    <label className={styles['title']}>Serviço</label>
    <div className={styles['products']}>
      <div className={styles['product']}>
   <Image width={60}  src={truck} />
        <div>
          <span>{service.servico}</span>
          <p>{'Ajudantes'}</p>
      

         
        </div>
        <div className={styles['quantity']}>
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
        <label className={styles['price-small']}>R$23.99</label>
      </div>
      
    </div>
    </div>
  </div>
  <div className={styles['card-coupons']}>
    <label className={styles['title']}>Apply coupons</label>
    <form className={styles['form']}>
      <input
        type="text"
        placeholder="Apply your coupons here"
        className={styles['input_field']}
      />
      <button className={styles['button']}>Apply</button>
    </form>
  </div>
  <div className={styles['card-checkout']}>
    <label className={styles['title']}>Checkout</label>
    <div className={styles['details']}>
      <span>Your cart subtotal:</span>

    </div>
    <div className={styles['checkout--footer']}>
      <label className={styles['price']}>
        <sup>R$</sup>57.99
      </label>
      <button className={styles['checkout-btn']}>Checkout</button>
    </div>
  </div>
</div>
</div>



    )

  }