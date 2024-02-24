const ActionButton = ({ handleClick, type = "button", text }) => {
  return (
    <button
      type={type}
      style={{
        cursor: "pointer",
        boxShadow: "0px 0px 3px 0px gray",
        border: "0.5px solid lightgray",
        borderRadius: "5px",
        padding: "2px 6px",
        backgroundColor: "white",
        color: "black",
      }}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default ActionButton;
