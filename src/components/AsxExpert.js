import React from 'react'
import expert from '../images/expert.png'

function AskExpert() {
  return (
    <div className="border rounded p-4 mt-6">
        <div className="text-center mb-4">
          <img src={expert} alt="Expert" className="w-[50%] h-auto rounded-full mx-auto mb-3" />
          <h3 className="font-semibold">Ask an Expert</h3>
          <p className="text-sm text-gray-600">Buy with confidence. Contact our experts today.</p>
        </div>
        <div className="text-left text-red ml-[15px] xl:ml-[6px] mb-2">
          <p className="flex items-center justify-start">
            <span className="material-icons mr-2"><i className="bi bi-telephone"></i></span> <a href="tel:877-659-2619">(877) 659-2619</a>
          </p>
        </div>
        <div className="text-left text-red ml-[15px] xl:ml-[6px] mb-2">
          <p className="flex items-center justify-start">
            <span className="material-icons mr-2"><i className="bi bi-chat-left-text"></i></span> Live Chat
          </p>
        </div>
        <div className="text-left text-red ml-[15px] xl:ml-[6px]">
          <p className="flex items-center justify-start">
            <span className="material-icons mr-2"><i className="bi bi-envelope"></i></span> Email an Expert
          </p>
        </div>
    </div>
  )
}

export default AskExpert