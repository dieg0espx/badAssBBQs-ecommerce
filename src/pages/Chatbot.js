import React, { useEffect, useState } from 'react';
import background from '../images/logo-negative.png';
import loader from '../images/loader.gif';
import botLogo from '../images/bot-logo.png'
import { capitalize, getTimeStamp } from '../Utils/Helpers';
import { useProducts } from '../context/ProductsContext';


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
      `Here is the link to the product: <a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
    );
    setShowOptions(true)
  };
  
  
  
  

  

  return (
    <div className="chat-page h-screen overflow-hidden mx-auto">
      <div className='fixed top-0 left-0 w-full h-[80px] bg-white shadow-md  px-[30px] z-20 flex items-center gap-[20px]'>
          <img src={botLogo}  className='w-[80px]'/>
          <div>
            <h2 className='text-[22px] font-semibold'> AI Assistant </h2>
            <h2 className='text-[18px] text-gray-400'> <i className="bi bi-circle-fill text-green-400"></i> Online </h2>
          </div>
      </div>
      <img src={background} className="filter grayscale brightness-0 contrast-100 w-[50%] max-w-[250px] fixed left-[50%] top-[30%] transform -translate-x-[45%] z-0 opacity-5" alt="Background" />
      <div className="container w-[98%] mx-auto relative z-10">
        <div className="max-w-[800px] mx-auto bubbles h-[calc(100vh-110px)] p-4 overflow-y-scroll rounded-t-lg pt-[100px]">
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
          
          {isLoading && <img src={loader} className="w-20 mx-auto" alt="Loading..." />}

          
          {/* BRANDS MENU */}
          {submenuOptions.length > 0 && showBrands && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              {submenuOptions.map((brand, index) => (
                <button
                  key={index}
                  onClick={() => handleBrandsButton(brand)}
                  className="bg-gray-200 text-gray-700 py-3 px-4 rounded-2xl hover:bg-blue-600 hover:text-white text-left"
                >
                  {capitalize(brand.replace(/_/g, ' '))}
                </button>
              ))}
              <button onClick={()=>setShowOptions(true)}> Show Menu </button>
            </div>
          )}
          {/* PRODUCTS MENU */}
          {showProductSubmenu && products.length > 0 && showProducts && (
            <div className="grid grid-cols-1 gap-2 mt-4">
              {products.map((product, index) => (
                <button
                  key={index}
                  onClick={() => handleProductClick(product)}
                  className="bg-gray-200 text-gray-700 py-3 px-4 rounded-2xl hover:bg-blue-600 hover:text-white text-left"
                >
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
