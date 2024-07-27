function FormWraper({ children }) {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div
          className="flex flex-col w-full max-w-xl xxl:max-w-4xl space-y-4 xxl:space-y-8 rounded-xl shadow-2xl
          pt-4 pb-6 px-8 md:px-12 md:pb-7 xxl:px-24 xxl:pb-14 xxl:pt-10 items-center
          bg-analytics-azule"
        >
          {children}
        </div>
      </div>
    </>
  );
}

export default FormWraper;
