import React, { useState } from "react";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
const libraries = ["places"];

const AddressAutocomplete = ({ onAddressSelect }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD9uq43MmBP42vLtAlPjgdz9V8MosUeUMM", // Replace with your Google API key
    libraries,
  });

  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };


  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      
      const getComponent = (type) =>
        place.address_components.find(component => component.types.includes(type))?.long_name || "";
      

        
      const addressObject = {
        formatted_address: place.formatted_address,
        city: getComponent("locality"),
        state: getComponent("administrative_area_level_1"),
        postalCode: getComponent("postal_code"),
        country: getComponent("country"),
      };
  
      onAddressSelect(addressObject);
    }
  };
  

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Autocomplete onLoad={onLoad} onPlaceChanged={handlePlaceChanged}>
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
        placeholder="Your Address"
      />
    </Autocomplete>
  );
};

export default AddressAutocomplete;
