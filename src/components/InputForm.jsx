import React from 'react'

const InputForm = ({ id, type, label, placeholder, onChange, className, visibleLabel, hidePlaceHolder}) => {
 
    let contentToRender;
  
    if (label === "Message") {
      
      contentToRender = <textarea rows="4"
      id={id}
      name={label}
      autoComplete='off'
      required
      type={type}
      placeholder={label}
      onChange={onChange}
      className={`${className}  normal-case  input placeholder:font-bold font-open  px-2`} />;
    } else {
      contentToRender = <input
      id={id}
      name={label}
      type={type}
      placeholder={`${hidePlaceHolder?  '': {label}}`}
      onChange={onChange}
      className={`${className} px-2 w-full h-10 normal-case rounded-md focus:ring-green-100 input placeholder:font-bold `}
      autoComplete='off'
      required
    />;
    }
  
    return (
      <div className=" py-2">
        {visibleLabel? 
        
        <label
          htmlFor={id}
          className=" text-gray-600 text-xs font-medium text leading-9 font-open uppercase"
        >
          {label}
        </label>
        :null}
        
  
        {contentToRender}
        
           
      </div>
    );
  };

export default InputForm
