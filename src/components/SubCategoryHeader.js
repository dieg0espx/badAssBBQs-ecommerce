import React from 'react'
import { Link } from 'react-router-dom'

function SubCategoryHeader(props) {
  return (
    <Link to={props.to} className='text-gray-600 hover:text-red'>
      <img src={props.imgURL} className='h-[150px] m-auto'/>
      <p className='text-center mt-[10px] font-semibold '> {props.title} </p>
    </Link>
  )
}

export default SubCategoryHeader
