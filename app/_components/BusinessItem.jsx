import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

function BusinessItem({bussiness}) {

  const CaculateRating=()=>{
    let total=0;
    let count=0;
    bussiness?.reviews.forEach(item=>{
      total=total+item.star;
      count++;
    })
    const result=total/count;
    return result?result.toFixed(1):5;
  }

  return (
    <Link
    href={'/restaurant/'+bussiness?.slug}
    className='p-3 
    hover:border hover:rounded-xl 
    hover:border-primary cursor-pointer
    hover:bg-orange-50'>
      <Image src={bussiness.banner?.url} alt={bussiness.name}
        width={500}
        height={130}
        className='h-[130px] rounded-xl object-cover'
        />
        <div className='mt-2'>
            <h2 className='font-bold text-lg'>{bussiness.name}</h2>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <Image src="/star.png" alt='star'
                    width={14}
                    height={14}/>
                    <label className='text-gray-400 text-sm'>{CaculateRating()}</label>
                    <h2 className='text-gray-400 text-sm'>{bussiness?.restroType[0]}</h2>
                </div>
                <h2 className='text-sm text-primary'>{bussiness.categories[0].name}</h2>
            </div>
        </div>
    </Link>
  )
}

export default BusinessItem
