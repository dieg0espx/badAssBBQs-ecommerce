import React, { useState, useEffect } from 'react';
import Faq from 'react-faq-component';

const ContactPage = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendContactForm();
    alert('Thank you for reaching out! We’ll get back to you soon.');
    setData({ name: '', email: '', message: '' });
  };

  const faqData = {
    title: "FAQ",
    rows: [
      {
        title: "How long does shipping take?",
        content: "Standard shipping takes 3-5 business days, depending on your location. You’ll receive a tracking number once your order is on its way."
      },
      {
        title: "What is the return policy?",
        content: "Items can be returned within 30 days if they are unused and in their original packaging. Please review our full return policy for more details."
      },
      {
        title: "Do you offer international shipping?",
        content: "Currently, we only ship within the U.S. For international orders, please contact us for more information."
      },
      {
        title: "How do I track my order?",
        content: "Once your order has shipped, you’ll receive an email with tracking information. You can use this to monitor the status of your delivery."
      },
      {
        title: "Can I change my order after placing it?",
        content: "Please contact us as soon as possible if you need to make changes. We’ll do our best to accommodate your request, but changes may not be possible once the order has shipped."
      }
    ]
  };

  const faqStyles = {
    bgColor: 'transparent',
    titleTextColor: "#333",
    rowTitleColor: "#1a202c",
    rowTitleTextSize: "18px",
    rowContentColor: "#4a5568",
    rowContentTextSize: "16px",
    rowContentPaddingTop: "10px",
    rowContentPaddingBottom: "10px",
    rowContentPaddingLeft: "20px",
    rowContentPaddingRight: "20px",
    transitionDuration: "0.5s",
    timingFunc: "ease"
  };

  const faqConfig = {
    animate: true,
    tabFocus: true
  };

  const sendContactForm = async () => {
    try {
      const response = await fetch('https://server-badassbbqs.vercel.app/contactForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data}),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send contact form');
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error sending email confirmation:', error);
    }
  };


  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  },[])

  return (
    <div className="contact-page-container p-6  mx-auto">
      <h1 className="text-4xl font-bold mb-[30px] ml-[10px] text-left">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 ">
        <div className="contact-form bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-lg font-medium mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-lg font-medium mb-1">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={data.phone || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-medium mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={data.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                rows="5"
                required
              />
            </div>

            <button type="submit" className="w-full py-2 bg-red border border-red text-white font-semibold rounded transition duration-200 hover:bg-white hover:text-red">
              Send Message
            </button>
          </form>
        </div>

        <div className="contact-info border border-gray-200 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-[20px] mb-2">
            <span className="font-semibold">Email:</span> <a href="mailto:info@badassbbqs.com" className="text-blue-500">info@badassbbqs.com</a>
          </p>
          <p className="text-[20px] mb-6">
            <span className="font-semibold">Phone:</span> <a href="tel:877-659-2619" className="text-blue-500">877-659-2619</a>
          </p>

          <Faq data={faqData} styles={faqStyles} config={faqConfig} />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
