const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.Root = null;
  }

  root() {
    return this.Root ? this.Root : null;
  }

  add(data) {
    this.Root = addWithin(this.Root, data);

    function addWithin(node, data) {
      if (!node) return new Node(data);

      if (node.data === data) return node;

      if (data < node.data) {
        node.left = addWithin(node.left, data);
      } else {
        node.right = addWithin(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    return searchWithin(this.Root, data);

    function searchWithin(node, data) {
      if (!node) return false;

      if (node.data === data) return true;

      return data < node.data
        ? searchWithin(node.left, data)
        : searchWithin(node.right, data);
    }
  }

  find(data) {
    return returnWithin(this.Root, data);

    function returnWithin(node, data) {
      if (!node) return null;

      if (node.data === data) return node;

      return data < node.data
        ? returnWithin(node.left, data)
        : returnWithin(node.right, data);
    }
  }

  remove(data) {
    this.Root = removeNode(this.Root, data);

    function removeNode(node, data) {
      if (!node) return null;

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) return null;

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;

        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this.Root) return;

    let node = this.Root;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.Root) return;

    let node = this.Root;
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
