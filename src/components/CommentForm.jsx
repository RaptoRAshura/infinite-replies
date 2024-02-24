import { useState } from "react";
import ActionButton from "./ActionButton";

const CommentForm = ({ defaultValue = "", handleSave, handleCancel }) => {
  const [input, setInput] = useState(defaultValue);

  return (
    <form
      style={{
        display: "flex",
        gap: 8,
        flexDirection: "column",
        alignItems: "start",
        width: "100%",
      }}
    >
      <input
        style={{
          border: "1px solid skyblue",
          boxSizing: "border-box",
          width: "400px",
          boxShadow: "0px 0px 3px 0px gray",
          outline: "none",
          borderRadius: "6px",
          padding: "4px 6px",
        }}
        autoFocus
        placeholder="type here..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <div style={{ display: "flex", gap: 6 }}>
        <ActionButton
          style={{ width: "max-content" }}
          handleClick={() => {
            handleCancel();
            setInput("");
          }}
          text={"Cancel"}
        />
        <ActionButton
          style={{ width: "max-content" }}
          handleClick={() => handleSave(input)}
          text={"Save"}
          type={"submit"}
        />
      </div>
    </form>
  );
};

export default CommentForm;
