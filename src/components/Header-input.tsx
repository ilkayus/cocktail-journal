const HeaderInput = (handleChange: any, inputData: any, handleSubmit: any) => {
  return (
    <input
      type="search"
      className="search-input"
      placeholder="  What are you looking for?"
      autoFocus
      onChange={handleChange}
      value={inputData}
      onKeyDown={handleSubmit}
    />
  );
};

export default HeaderInput;
