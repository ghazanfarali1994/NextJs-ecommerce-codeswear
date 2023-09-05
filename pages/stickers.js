
            // <Link href={'/product/wear-the-code'} className="block relative rounded overflow-hidden">
            //     <img alt="ecommerce" className="m-auto md:mx-0 block" src="https://m.media-amazon.com/images/I/8189ZQT7nDL._AC_SX569_.jpg"/>
            //   <div className="mt-4 text-center md:text-left">
            //     <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirts</h3>
            //     <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
            //     <p className="mt-1">Rs.499</p>
            //     <p className="mt-1">S, M, L, XL, XXL</p>
            //   </div>
            // </Link>
            


            // <Link href={'/product/wear-the-code'} className="block relative rounded overflow-hidden">
            //     <img alt="ecommerce" className="m-auto h-[30vh] md:mx-0 md:h-[36vh] block" src="https://m.media-amazon.com/images/I/81pATWDmDtL._AC_UX466_.jpg"/>
            //   <div className="mt-4 text-center md:text-left">
            //     <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirts</h3>
            //     <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
            //     <p className="mt-1">Rs.499</p>
            //     <p className="mt-1">S, M, L, XL, XXL</p>
            //   </div>
            // </Link>

import Link from 'next/link'
import React from 'react'
import Product from '@/models/Product';
import mongoose from "mongoose";

const Stickers = ({ products }) => {
  // console.log(products)
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(products).length ===0 && <p>Sorry all the stickers are currently out of stock. New stock coming soon. Stay Tuned!</p>}
            {Object.keys(products).map((item) => {
              return <div key={products[item]._id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5">
                <Link passHref={true} href={`/product/${products[item].slug}`} className="block relative rounded overflow-hidden">
                  <img alt="ecommerce" className="m-auto h-[30vh]  md:h-[36vh] block" src={products[item].img} />
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Stickers</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                    <p className="mt-1">Rs.{products[item].price}</p>
                    <div className="mt-1">
                      {products[item].size.includes('S') && <span className='border border-gray-300 mx-1 px-1'>S</span>}
                      {products[item].size.includes('M') && <span className='border border-gray-300 mx-1 px-1'>M</span>}
                      {products[item].size.includes('L') && <span className='border border-gray-300 mx-1 px-1'>L</span>}
                      {products[item].size.includes('XL') && <span className='border border-gray-300 mx-1 px-1'>XL</span>}
                      {products[item].size.includes('XXL') && <span className='border border-gray-300 mx-1 px-1'>XXL</span>}
                    </div>
                    <div className="mt-1">
                    {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('purple') && <button className="border-2 border-gray-300 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    </div>
                  </div>
                </Link>
              </div>
            })}


          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await Product.find({ category: 'stickers' })
  let hoods = {}
  for (let item of products) {
    if (item.title in hoods) {
      if (!hoods[item.title].color.includes(item.color) && item.availabeQty > 0) {
        hoods[item.title].color.push(item.color)
      }
      if (!hoods[item.title].size.includes(item.size) && item.availabeQty > 0) {
        hoods[item.title].size.push(item.size)
      }
    }
    else {
      hoods[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availabeQty > 0) {
        hoods[item.title].color = [item.color]
        hoods[item.title].size = [item.size]
      }
    }
  }
  console.log(hoods)


  // Pass data to the page via props
  return {
    props: { products: JSON.parse(JSON.stringify(hoods)) }
  }
}

export default Stickers