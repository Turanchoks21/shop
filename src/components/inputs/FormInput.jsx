import React from "react";

function FormInput({ children, type, name, id, error, onChange, value }) {
  return (
    <>
      <input
        className={`h-12 w-full pl-2 text-xl border-b-4 bg-transparent outline-none ring-0
          text-chiper-chartreuse mb-4 
          ${
            error
              ? "border-red-500 placeholder:text-red-500 focus:placeholder:text-red-500/60"
              : "border-chiper-chartreuse placeholder:text-chiper-chartreuse focus:placeholder:text-chiper-chartreuse/60"
          } rounded`}
        type={type}
        name={name}
        id={id}
        placeholder={children}
        value={value}
        onChange={onChange}
      
      />
      {error && (
        <span className="absolute left-0 mt-12 text-sm text-red-600">
          {error}
        </span>
      )}
    </>
  );
}

export default FormInput;
