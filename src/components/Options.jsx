import React, {useState} from "react";

const Options = () => {
    const [options, setOptions] = useState([
        { value: 'Option A', isCorrect: false },
        { value: 'Option B', isCorrect: false },
        { value: 'Option C', isCorrect: false },
        { value: 'Option D', isCorrect: false }
      ]);
    
      const handleOptionChange = (index) => {
        const updatedOptions = options.map((option, i) => {
          if (i === index) {
            return { ...option, isCorrect: true };
          } else {
            return { ...option, isCorrect: false };
          }
        });
        setOptions(updatedOptions);
      }
    
      return (
        <div className="flex flex-col space-y-2">
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="radio"
                id={`option-${index}`}
                name="options"
                value={option.value}
                checked={option.isCorrect}
                onChange={() => handleOptionChange(index)}
                className="rounded-full text-green-500 border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <label htmlFor={`option-${index}`} className="text-gray-700">{option.value}</label>
            </div>
          ))}
        </div>
      );
    }

export default Options