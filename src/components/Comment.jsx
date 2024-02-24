import { useState, useCallback } from "react";
import ActionButton from "./ActionButton";
import CommentForm from "./CommentForm";

const Comment = ({ comment, deleteComment, addComment, updateComment }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [input, setInput] = useState("");

  const handleUpdateComment = useCallback(
    (value) => {
      if (!input.length) return;
      updateComment(comment.id, value);
      setIsEditMode(false);
      setInput("");
    },
    [input]
  );

  const handleAddReply = useCallback(
    (value) => {
      if (!value.length) return;
      addComment(comment.id, value);
      setIsReplying(false);
      setInput("");
    },
    [input]
  );

  return (
    <div
      key={comment?.id}
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "20px",
        gap: 8,
        width: "100%",
      }}
    >
      <div
        style={{
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          background: "#E7E7E6",
          boxShadow: "0px 0px 4px 0px gray",
          borderRadius: "12px",
          padding: "8px",
          minWidth: "400px",
          width: "100%",
          gap: "4px",
          border: "4px solid white",
        }}
      >
        {isEditMode ? (
          <CommentForm
            defaultValue={comment?.text ?? ""}
            handleSave={handleUpdateComment}
            handleCancel={() => setIsEditMode(false)}
          />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              width: "100%",
            }}
          >
            <span
              style={{
                boxSizing: "border-box",
                textAlign: "left",
                display: "block",
                fontSize: "14px",
                padding: "4px 8px",
                overflow: "hidden",
                textWrap: "wrap",
                boxShadow: "0px 0px 2px 0px lightgray",
                textOverflow: "ellipsis",
                background: "#FFFEFB",
                width: "100%",
                borderRadius: "6px",
              }}
            >
              {comment?.text}
            </span>
            <div style={{ display: "flex", gap: 6 }}>
              <ActionButton
                handleClick={() => setIsReplying(true)}
                text={"Reply"}
              />
              <ActionButton
                handleClick={() => {
                  setIsEditMode(true);
                  setInput(comment?.text);
                }}
                text={"Edit"}
              />
              <ActionButton
                handleClick={() => deleteComment(comment.id)}
                text={"Delete"}
              />
            </div>
          </div>
        )}
      </div>
      {isReplying ? (
        <CommentForm
          handleSave={handleAddReply}
          handleCancel={() => setIsReplying(false)}
        />
      ) : null}

      {comment?.children?.map((comment, index) => (
        <Comment
          key={comment.id}
          comment={comment}
          index={index}
          deleteComment={deleteComment}
          addComment={addComment}
          updateComment={updateComment}
        />
      ))}
    </div>
  );
};

export default Comment;
