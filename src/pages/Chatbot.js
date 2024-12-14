import React, { useEffect, useState } from 'react';
import background from '../images/logo-negative.png';
import loader from '../images/loader.gif';
import botLogo from '../images/bot-logo.png'
import placeholderImage from '../images/placeholder_image.jpg'
import { capitalize, getTimeStamp } from '../Utils/Helpers';
import { useProducts } from '../context/ProductsContext';
import dataChatbot from '../data/chatbot.json'
import AILoader from '../components/AILoader';
const OPTIONS = ['Products', 'Contact',];

function Chatbot() {
  const [currentMessage, setCurrentMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [showOptions, setShowOptions] = useState(true);
  const [data, setData] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [submenuOptions, setSubmenuOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const { getBrands, loadProductsByBrand, products } = useProducts();
  const [showProductSubmenu, setShowProductSubmenu] = useState(false);
  const [showBrands, setShowBrands] = useState(true)
  const [showProducts, setShowProducts] = useState(true)

  
  const openAiUrl = process.env.REACT_APP_APIURL;
  

  // FUNCTION TO AUTO SCROLL UP
  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, [conversation]);

  useEffect(() => {
    setData(dataChatbot)
    addMessage(
      'server',
      "Hello! I'm your AI Assistant 🤖.  \n How can I help you today?"
    );
  }, []);

  // FUNCTION TO CREATE NEW MESSAGE 
  const addMessage = (sender, text = '') => {
    setConversation((prev) => [...prev, { sender, text: String(text), timestamp: getTimeStamp() }]);
    setCurrentMessage('');
    setIsLoading(false);
  };

  const handleOptionClick = (option) => {
    addMessage('user', option);
    addMessage('server', `Got it! You’re interested in ${option}.`);
    console.log('OPTION SELECTED: ' + option);
    setShowOptions(false)
    switch (option) {
      case 'Contact':
        addMessage(
          'server',
          'You can reach us through the following contact information:\n\n' +
          '**Phone:** <a href="tel:+18776592619">(877) 659-2619</a>\n' +
          '**Email:** <a href="mailto:sales@badassbbqs.com">sales@badassbbqs.com</a>'
        )
        setShowOptions(true)
        break;
      case 'Products':
        console.log('DISPLAYING ALL THE BRANDS ');
        setShowBrands(true)
        const brands = getBrands();
        addMessage('server', 'Here are the available brands. Please select one:');
        setSubmenuOptions(brands);
        break;
    
      default:
        break;
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

  function formatText(text) {
    const parts = text.split(/(\*\*.*?\*\*)/);
  
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      } else {
        // Replace \n with <br /> and render HTML links
        return part.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            <span dangerouslySetInnerHTML={{ __html: line }} />
            {i < part.split('\n').length - 1 && <br />}
          </React.Fragment>
        ));
      }
    });
  }

  const handleBrandsButton = async (brand) => {
    addMessage('user', capitalize(brand));
    setShowBrands(!showBrands)
    setShowProducts(true)

    try {
      setIsLoading(true);
      await loadProductsByBrand(brand);

      setTimeout(() => {
        addMessage('server', `Here are the products for ${capitalize(brand.replace(/_/g, ' '))}:`);
        setShowProductSubmenu(true); // Show the product submenu
        setIsLoading(false);
      }, 500);
      setSubmenuOptions(brand)
    } catch (error) {
      console.error(`Error loading products for ${brand}:`, error);
      addMessage('server', 'Sorry, there was an issue loading the products.');
      setIsLoading(false);
    }
  };
  const handleProductClick = (product) => {
    setShowProducts(!showProducts)
    const url = `https://badassbbqs.com/product/${product.brand}-${product.Id}`;
    addMessage('user', product.Title);
    addMessage(
      'server',
      `Click here to see the product: <a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
    );
    setShowOptions(true)
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey && currentMessage.trim() !== '') {
    event.preventDefault(); // Prevent default behavior
    addMessage('user', currentMessage); // Add user message to the conversation
    rawAnswer(currentMessage, data); // Pass the currentMessage and data to rawAnswer
    setCurrentMessage(''); // Clear the input field
    }
};


async function rawAnswer(question, data) {
    const prompt = `
    You are an expert assistant. Answer the question below intelligently:
    - If the question is directly related to the provided data, use the relevant parts of the data to answer.
    - If the question is not related to the data, respond based on general knowledge and ignore the provided data.
    - Do not include programming terms like JSON, keys, or objects in your response.
    - Use bullet points or short sentences for clarity and readability.
    - Concrete answer.
    - Highlight important elements or keys using **bold text** when necessary. For example: **key**.
    - Do not include symbols like {}, [], :, <>, or anything that a non-technical person might find confusing.
    - Always present the information in a way that a regular person can easily understand.
    
    Here is the data (use only if relevant):
    ${JSON.stringify(data, null, 2)}
    
    Question: ${question}
    `;
    
    
    try {
        setIsLoading(true);
        const response = await fetch(openAiUrl + '/generate-text', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt })
    });

    if (!response.ok) {
        setIsLoading(false)
        throw new Error('Failed to generate text');
    }

    const responseData = await response.json();
    const generatedText = responseData.trimStart(); // Trim the leading spaces
    console.log(generatedText);
    addMessage('server', generatedText);
    } catch (error) {
    console.error('Error generating text:', error);
    return 'Sorry, something went wrong while generating the response.';
    }
}
  
  return (
    <div className="chat-page h-screen overflow-hidden mx-auto">
      {/* HEADER */}
      <div className='w-full h-[50px] bg-white shadow-md  px-[30px] z-20 flex items-center gap-[20px]'>
          <img src={botLogo}  className='h-[90%]'/>
          <div>
            <h2 className='text-[15px] font-semibold'> AI Assistant </h2>
            <h2 className='text-[15px] text-gray-400 items-center leading-[20px]'> <i className="bi bi-circle-fill text-green-400 text-[10px]"></i> Online </h2>
          </div>
          <a href="tel:8776592619" className='block ml-auto'>
            <i className="bi bi-telephone-plus ml-auto text-gray-400 hover:text-red cursor-pointer"></i>
          </a>
      </div>
      {/* BACKGROUND */}
      <img src={background} className="filter grayscale brightness-0 contrast-100 w-[50%] max-w-[250px] fixed left-[50%] top-[30%] transform -translate-x-[45%] z-0 opacity-5" alt="Background" />
      {/* CHAT */}
      <div className="container w-full mx-auto relative z-10">
        <div className="max-w-[800px] mx-auto bubbles p-4 h-[calc(100vh-150px)] overflow-y-scroll">
          {conversation.map((msg, index) => (
            <div key={index} className={`row mb-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
             <div className={`py-2 px-4 rounded-2xl ${msg.sender === 'user' ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}>
               <div>{formatText(msg.text)}</div>
               <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                 {msg.timestamp.split('|')[1]}
               </p>
             </div>
           </div>
          ))}
          
          {isLoading && <AILoader />}

          
          {/* BRANDS MENU */}
          {submenuOptions.length > 0 && showBrands && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              {submenuOptions.map((brand, index) => (
                <button
                  key={index}
                  onClick={() => handleBrandsButton(brand)}
                  className="bg-gray-200 text-gray-700 py-3 px-4 rounded-2xl hover:bg-red hover:text-white text-left text-[15px] grid grid-cols-[20px_auto_10px] h-full items-center"
                >
                  <i className="bi bi-grip-vertical"></i>
                  {capitalize(brand.replace(/_/g, ' '))}
                  <i className="bi bi-chevron-compact-right"></i>
                </button>
              ))}
              <button onClick={()=>setShowOptions(true)}> Show Menu </button>
            </div>
          )}
          {/* PRODUCTS MENU */}
          {showProductSubmenu && products.length > 0 && showProducts && (
            <div className="grid grid-cols-1 gap-2 mt-4 h-[300px] overflow-y-scroll">
              {products.map((product, index) => (
                <button
                  key={index}
                  onClick={() => handleProductClick(product)}
                  className="bg-gray-200 text-gray-700 py-3 px-4 rounded-2xl hover:bg-red hover:text-white text-left grid grid-cols-[50px_auto] gap-[10px] items-center"
                >
                  <img
                    className='rounded'
                    src={product.Image}
                    alt="Product Image"
                    loading="lazy" // Enable lazy loading
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop in case placeholder also fails
                      e.target.src = placeholderImage
                    }}
                  />

                  {product.Title}
                </button>
              ))}
              <button onClick={()=>setShowOptions(true)}> Show Menu </button>
            </div>
          )} 


          {/* MAIN MENU */}
          {showOptions && (
            <div className="grid grid-cols-2 gap-2 mt-4">
             {OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className="bg-gray-200 text-gray-700 py-3 px-4 rounded-2xl hover:bg-red hover:text-white flex items-center"
                >
                  <span className="mr-2">{getEmojiForOption(option)}</span>
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* TEXTAREA */}
      <div className='h-[100px] fixed bottom-0 left-0 w-full'>
        <textarea 
          className='w-full h-full p-[10px] border-t border-gray-200 outline-0 resize-none' 
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          value={currentMessage}
          placeholder="Ask me something ..."
        />
      </div>
    </div>
  );
}

export default Chatbot;