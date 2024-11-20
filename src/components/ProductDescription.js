import React, { useEffect, useState, useContext } from 'react';
import { createClient } from '@supabase/supabase-js';


const ProductDescription = ({ product }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [description, setDescription] = useState('')
  

  const supabase = createClient(
    'https://uctubrwiseslmvruhqof.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjdHVicndpc2VzbG12cnVocW9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0NTk2ODIsImV4cCI6MjA0NzAzNTY4Mn0.7MNAuiYNKF8d14LDN91dzr8HSBdsSK4eTHCEHsY8BZA'
  );
   
  useEffect(() => {
    setDescription('')
    const fetchProductData = async () => {
      await loadProduct();
    };
    fetchProductData();
  }, [product]);
  
  const loadProduct = async () => {
    console.log(`CHECKING: ${product.brand}-${product.Id}`);
    const exists = await productExists(`${product.brand}-${product.Id}`);
    if (!exists) {
      console.log('PRODUCT DOES NOT EXIST ...');
      console.log('CREATING NEW DESCRIPTION ...');
      sendPromptToOpenAI(
        "Format the following text with proper punctuation and structure. Use **text** to highlight only critical details, such as key features, specifications, or essential points. Avoid overusing bold for general information. Use double newlines (\\n\\n) to indicate where line breaks are needed to improve readability. Ensure the output is easy to read, concise, and visually appealing:\n\n" +
        product.Description.split('Legal disclaimers and warnings')[0]
      );       
    } else {
      console.log('Product Already Exists');
      console.log('Taking Description From Database...');
    }
  };
  
  async function productExists(product_id) {
    console.log('CHECKING IF PRODUCT EXIST.....');
    
    try {
        const { data, error } = await supabase
          .from('products') // Replace 'products' with your actual table name
          .select('description') // Select the 'description' field
          .eq('product_id', product_id)
          .single(); // Fetch a single record
    
        if (error && error.code === 'PGRST116') {
          return false; // Product not found
        }
    
        if (error) {
          throw error; // Handle other errors
        }
    
        // If the product exists, call setDescription()
        setDescription(data.description);
        setLoading(false)
        return true; // Optionally, return true to indicate success
      } catch (err) {
        console.error('Error fetching product:', err.message);
        return false; // Return false in case of an error
      }
  }

  const sendPromptToOpenAI = async (prompt) => {
    console.log('SENDING PROMPT TO OPEN AI');
    
    const apiUrl = 'https://server-badassbbqs.vercel.app/generate-text';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch response from API');
      }

      const data = await response.json();
      console.log('ANSWER: ');
      console.log(data);
      setDescription(data)
      setLoading(false)
      await saveNewDescription(data)
      
      return data.text; 
    } catch (error) {
      console.error('Error sending prompt to OpenAI:', error.message);
      throw error;
    }
  };

  const formatTextWithLineBreaksAndBold = (text) => {
    // Handle non-string input gracefully
    if (typeof text !== 'string') {
      console.error('Invalid input: Expected a string');
      return null; // Or return a fallback element
    }
  
    // Regular expression to match **bold** text
    const boldRegex = /\*\*(.+?)\*\*/g;
  
    // Split text by line breaks or periods, and process each line
    return text
      .split(/\n|(?<=\.|\:)\s+/) // Split by newline or after periods/colons followed by spaces
      .map((line, index) => (
        <React.Fragment key={index}>
          {/* Replace **bold** with <strong>bold</strong> */}
          {line.split(boldRegex).map((segment, i) =>
            boldRegex.test(`**${segment}**`) ? (
              <strong key={i}>{segment}</strong>
            ) : (
              segment
            )
          )}
          <br />
        </React.Fragment>
      ));
  };


  const saveNewDescription = async(newDescription) => {
    const { data, error } = await supabase
    .from('products')
    .insert([
      { product_id: `${product.brand}-${product.Id}`, description: newDescription },
    ])
    .select()
    console.log('NEW DESCRIPTION STORED ..');
  }
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <p className="text-gray-700 mt-0">{formatTextWithLineBreaksAndBold(description)}</p>
      <h2 className="text-lg font-semibold mt-5 mb-5">Legal disclaimers and warnings</h2>
      <p>{product.Description.split('Legal disclaimers and warnings')[1]}</p> 
    </div>
  );
};

export default ProductDescription;
