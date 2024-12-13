import React from 'react'

function BtnChat() {
    const handleClick = () => {
        const url = 'http://localhost:3000/chatbot'; 
        window.open(url, '_blank', 'width=400,height=600');
    };

  return (
    <div onClick={handleClick} className='fixed bottom-[10px] right-[10px] bg-red w-[80px] h-[80px] rounded-full drop-shadow-lg flex items-center justify-center animate-slideInFromRight border-2 border-red text-white hover:text-red hover:bg-white'>
      <i className="bi bi-chat-text text-[40px]"></i>
    </div>
  )
}

export default BtnChat
