'use client'
import React from 'react'

const error = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-secondary'> Opps! Something went wrong!</h1>
        <p className='text-gray-500 mt-2'>Please try again later</p>
        <button className='mt-4 px-4 py-2 bg-primary-color text-accent-content rounded-lg' onClick={() => window.location.reload()}>Try again</button>
      </div>
    </div>
  )
}

export default error