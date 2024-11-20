import React from 'react'
import LoaderGif from '../images/loader.gif'

function Loader() {
  return (
    <div className='h-[70vh] md:h-[90vh] w-full flex items-center justify-center'>
        <img src={LoaderGif}  className='w-[90%] max-w-[500px] -mt-[30%] md:-mt-[10%]'/>
    </div>
  )
}

export default Loader
