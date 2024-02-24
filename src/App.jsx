import "./styles.css";

import { useState } from "react";
import ActionButton from "./components/ActionButton";
import useAction from "./hooks/useAction";
import Comment from "./components/Comment";
import CommentForm from "./components/CommentForm";

export default function App() {
  const [tree, setTree] = useState([]);
  const [isCommenting, setIsCommenting] = useState(false);

  const { addNode, deleteNode, updateNode } = useAction();

  const addNewComment = (newComment) => {
    setTree([
      ...tree,
      {
        id: Math.floor(Math.random(0, 1) * Number.MAX_SAFE_INTEGER),
        text: newComment,
        children: [],
      },
    ]);
    setIsCommenting(false);
  };

  const handleDeleteNode = (id) => {
    const newTree = deleteNode(id, tree);
    setTree([...newTree]);
  };

  const handleAddNode = (parentId, val) => {
    const newTree = addNode(parentId, val, tree);
    setTree([...newTree]);
  };

  const handleUpdateNode = (id, val) => {
    const newTree = updateNode(id, val, tree);
    setTree([...newTree]);
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        gap: 16,
        flexDirection: "column",
        alignItems: "start",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 12,
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        {tree.map((comment, index) => (
          <Comment
            key={comment.id}
            deleteComment={handleDeleteNode}
            addComment={handleAddNode}
            updateComment={handleUpdateNode}
            comment={comment}
            index={index}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          gap: 12,
          flexDirection: "column",
          alignItems: "start",
          width: "100%",
          marginLeft: 20,
        }}
      >
        <ActionButton
          handleClick={() => setIsCommenting(true)}
          text={"Add New Comment"}
        />
        {isCommenting ? (
          <CommentForm
            handleSave={addNewComment}
            handleCancel={() => setIsCommenting(false)}
          />
        ) : null}
      </div>
    </div>
  );
}
