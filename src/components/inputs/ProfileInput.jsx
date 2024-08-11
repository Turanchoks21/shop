function ProfileInput({ children, type, name, id, onChange, value, readOnly }) {
  return (
    <>
      <input
        className=" pl-2 text-xl border-b-4 bg-transparent outline-none ring-0
        text-chiper-chartreuse mb-4 
        border-chiper-chartreuse placeholder:text-chiper-chartreuse 
        focus:placeholder:text-chiper-chartreuse/60 rounded"
        type={type}
        name={name}
        id={id}
        placeholder={children}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    </>
  );
}

export default ProfileInput;
