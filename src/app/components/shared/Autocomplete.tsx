import { TextInput } from "flowbite-react";
import React, {
  ChangeEventHandler,
  HTMLAttributes,
  useEffect,
  useState,
} from "react";

interface SelectWithSearchProps<T> extends HTMLAttributes<T> {
  options: string[];
  placeholder?: string;
  formValue?: string;
  setFormData?: any;
  field?: any;
  onChange?: ChangeEventHandler<T> | undefined;
}

const SelectWithSearch: React.FC<SelectWithSearchProps<any>> = ({
  options,
  placeholder,
  formValue,
  setFormData,
  field,
  onChange,
}) => {
  const [query, setQuery] = useState<string>(formValue ?? ""); // Input value
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options); // Filtered options
  const [showDropdown, setShowDropdown] = useState<boolean>(false); // Dropdown visibility

  // Sync query with formValue whenever formValue changes
  useEffect(() => {
    setQuery(formValue ?? ""); // Update input value based on external changes
  }, [formValue]);

  // Update filtered options whenever the options array changes
  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Filter options based on input
    if (value.trim() === "") {
      setFilteredOptions(options); // Reset to all options
    } else {
      setFilteredOptions(
        options.filter((option: string) =>
          option.toLowerCase().includes(value.toLowerCase())
        )
      );
    }

    setShowDropdown(true); // Show dropdown while typing

    // Call the external onChange handler if provided
    if (onChange) {
      onChange(e);
    }
  };

  const handleOptionClick = (option: string) => {
    // if(!option){
    //   setQuery("")
    // }
    setQuery(option); // Set input value to the selected option
    setShowDropdown(false); // Close dropdown

    // Update formData in the parent
    if (setFormData) {
      setFormData((prevData: any) => ({
        ...prevData,
        [field]: option, // Use computed property name for dynamic key
      }));
    }

    // Trigger the external onChange handler
    if (onChange) {
      onChange({
        target: { value: option }, // Mock a synthetic event
      } as React.ChangeEvent<any>);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false); // Close dropdown after input loses focus
    }, 100); // Add a slight delay to allow option click to register
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="relative">
        <TextInput
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          sizing="md"
          className="form-rounded-md"
          onFocus={() => setShowDropdown(true)} // Show dropdown on focus
          onBlur={handleBlur} // Hide dropdown on blur
        />
        {showDropdown && (
          <div
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-44 overflow-auto"
          style={{
            zIndex: 9999, // High z-index to ensure it appears on top
          }}
        >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white"
                >
                  {option}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No options found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectWithSearch;
