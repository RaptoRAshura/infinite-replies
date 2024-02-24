const useAction = () => {
  const deleteNode = (id, tree) => {
    tree.forEach((node, index) => {
      if (node.id === id) {
        tree.splice(index, 1);
      } else {
        if (node.children.length) {
          return deleteNode(id, node.children);
        }
      }
    });
    return tree;
  };

  const addNode = (parentId, val, tree) => {
    tree.forEach((node) => {
      if (node.id === parentId) {
        node.children.push({
          id: Math.floor(Math.random(0, 1) * Number.MAX_SAFE_INTEGER),
          text: val,
          children: [],
        });
      } else {
        if (node.children.length) {
          return addNode(parentId, val, node.children);
        }
      }
    });
    return tree;
  };

  const updateNode = (id, val, tree) => {
    tree.forEach((node, index) => {
      if (node.id === id) {
        tree[index] = { ...node, text: val };
      } else {
        if (node.children.length) {
          return updateNode(id, val, node.children);
        }
      }
    });
    return tree;
  };

  return { deleteNode, addNode, updateNode };
};

export default useAction;
