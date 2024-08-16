import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function SearchInput({ placeholder, value, onChange }) {
  return (
    <>
      <div className="relative">
        <input
          placeholder={placeholder}
          className="border-2 border-gray-200  w-full h-10 p-2 rounded-lg outline-analytics-azule"
          value={value}
          onChange={onChange} 
        />
        <MagnifyingGlassIcon className="h-8 absolute right-3 top-1" />
      </div>
    </>
  );
}

export default SearchInput;
