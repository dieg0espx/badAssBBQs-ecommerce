import React, { useEffect, useState } from 'react';
import background from '../images/logo-negative.png';
import loader from '../images/loader.gif';
import botLogo from '../images/bot-logo.png'
import { capitalize } from '../Utils/Helpers';

const OPTIONS = ['Products', 'Contact', 'Quotation', 'About', 'Delivery', 'Other'];

function Chatbot() {
  const [currentMessage, setCurrentMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [showOptions, setShowOptions] = useState(true);
  const [data, setData] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [submenuOptions, setSubmenuOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const openAiUrl = process.env.REACT_APP_APIURL;

  useEffect(() => {
    async function fetchData() {
      try {
        const information = await import('../data/data.json');
        setData(information.categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, [conversation]);

  const getTimeStamp = () => {
    const timestamp = new Date();
    return `${timestamp.toLocaleDateString()} | ${timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const addMessage = (sender, text = '') => {
    setConversation((prev) => [...prev, { sender, text: String(text), timestamp: getTimeStamp() }]);
    setCurrentMessage('');
    setIsLoading(false);
  };

  const handleOptionClick = (option) => {
    setShowOptions(false);
    setSelectedCategory(option);
    addMessage('user', option);
    addMessage('server', `Got it! You’re interested in ${option}.`);
    setTimeout(() => displaySubmenu(option), 500);
  };

  const displaySubmenu = (option) => {
    if (!data || !option) return;

    const categoryData = data[option];
    if (!categoryData) return;

    const submenu = categoryData.items?.map((item) => item.name) || Object.keys(categoryData);
    setSubmenuOptions(submenu);

    if (submenu[0] === 'phone') {
      addMessage('server', "Phone: 778 898 5301\nEmail: info@ttfscaffolding.com\nAddress: 10979 Olsen Rd, Surrey, BC V3V 3S9, Canada");
    } else {
      setTimeout(() => {
        addMessage('server', 'Please select an option below to learn more:');
        setShowOptions(true);
      }, 500);
    }
  };

  const handleSubOptionClick = (subOption) => {
    addMessage('user', subOption);
    const categoryData = data[selectedCategory];
    const subOptionData = categoryData.items?.find((item) => item.name === subOption) || categoryData[subOption];
    if (subOptionData) {
      formattedAnswer(JSON.stringify(subOptionData, null, 2));
    }
  };

  const formattedAnswer = async (answer) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${openAiUrl}generate-text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `Format this: ${answer}` }),
      });
      if (!response.ok) throw new Error('Failed to generate text');
      const data = await response.json();
      addMessage('server', data);
    } catch (error) {
      console.error('Error generating text:', error);
      addMessage('server', 'Sorry, something went wrong while generating the response.');
    }
  };

  const getEmojiForOption = (option) => {
    switch (option) {
      case 'Products':
        return '📦'; // Box emoji
      case 'Contact':
        return '📞'; // Telephone emoji
      case 'Quotation':
        return '💬'; // Speech balloon emoji
      case 'About':
        return 'ℹ️'; // Info emoji
      case 'Delivery':
        return '🚚'; // Delivery truck emoji
      case 'Other':
        return '❓'; // Question mark emoji
      default:
        return '❔'; // Default emoji
    }
  };

  

  return (
    <div className="chat-page h-screen overflow-hidden mx-auto">
      <div className='fixed top-0 left-0 w-full h-[80px] bg-white shadow-md  px-[30px] z-20 flex items-center gap-[20px]'>
          <img src={botLogo}  className='w-[80px]'/>
          <div>
            <h2 className='text-[22px] font-semibold'> AI Assistant </h2>
            <h2 className='text-[15px]'> <i className="bi bi-circle-fill text-green-400"></i> Online </h2>
          </div>
      </div>
      <img src={background} className="filter grayscale brightness-0 contrast-100 w-[50%] max-w-[250px] fixed left-[50%] top-[30%] transform -translate-x-[45%] z-0 opacity-5" alt="Background" />
      <div className="container w-[98%] mx-auto relative z-10">
        <div className="max-w-[800px] mx-auto bubbles h-[calc(100vh-110px)] p-4 overflow-y-scroll rounded-t-lg pt-[100px]">
          {conversation.map((msg, index) => (
            <div key={index} className={`row mb-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] py-2 px-4 rounded-2xl ${msg.sender === 'user' ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}>
                {msg.text}
                <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>{msg.timestamp.split('|')[1]}</p>
              </div>
            </div>
          ))}
          {isLoading && <img src={loader} className="w-20 mx-auto" alt="Loading..." />}
          {showOptions && (
            <div className="grid grid-cols-2 gap-2 mt-4">
             {OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className="bg-gray-200 text-gray-700 py-3 px-4 rounded-2xl hover:bg-blue-600 hover:text-white flex items-center"
                >
                  <span className="mr-2">{getEmojiForOption(option)}</span>
                  {option}
                </button>
              ))}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
