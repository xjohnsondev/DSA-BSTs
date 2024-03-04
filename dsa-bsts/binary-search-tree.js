class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;

    while (current) {
      if (val > current.val) {
        if (current.right === null) {
          current.right = newNode;
          break;
        }
        current = current.right;
      } else {
        if (current.left === null) {
          current.left = newNode;
          break;
        }
        current = current.left;
      }
    }
    return this;
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, node = this.root) {
    if (!node) {
      this.root = new Node(val);
      return this;
    }

    if (val < node.val) {
      if (node.left === null) {
        node.left = new Node(val);
      } else {
        this.insertRecursively(val, node.left);
      }
    } else if (val > node.val) {
      if (node.right === null) {
        node.right = new Node(val);
      } else {
        this.insertRecursively(val, node.right);
      }
    }

    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;

    while (current) {
      if (current.val === val) return current;

      if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, node = this.root) {
    if (!node) {
      return undefined;
    }

    if (val === node.val) {
      return node;
    } else if (val < node.val) {
      return this.findRecursively(val, node.left);
    } else {
      return this.findRecursively(val, node.right);
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder(node = this.root) {
    let arr = [];
    arr.push(node.val);

    if (node.left) {
      arr = arr.concat(this.dfsPreOrder(node.left));
    }

    if (node.right) {
      arr = arr.concat(this.dfsPreOrder(node.right));
    }

    return arr;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder(node = this.root) {
    let arr = [];

    if (node.left) {
      arr = arr.concat(this.dfsInOrder(node.left));
    }
    arr.push(node.val);
    if (node.right) {
      arr = arr.concat(this.dfsInOrder(node.right));
    }

    return arr;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder(node = this.root) {
    let arr = [];

    if (node.left) {
      arr = arr.concat(this.dfsPostOrder(node.left));
    }
    if (node.right) {
      arr = arr.concat(this.dfsPostOrder(node.right));
    }
    arr.push(node.val);

    return arr;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    if (!this.root) {
      return []; // Return an empty array if the tree is empty
    }

    const result = [];
    const queue = [this.root];

    while (queue.length > 0) {
      const current = queue.shift();
      result.push(current.val);

      if (current.left) {
        queue.push(current.left);
      }

      if (current.right) {
        queue.push(current.right);
      }
    }

    return result;
  }
  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    this.root = this._remove(this.root, val);
  }

  _remove(node, val) {
    if (!node) {
      return null;
    }

    if (val < node.val) {
      node.left = this._remove(node.left, val);
    } else if (val > node.val) {
      node.right = this._remove(node.right, val);
    } else {
      // Node with the value to be removed found

      // Case 1: Node has no children or one child
      if (!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      }

      // Case 2: Node has two children
      let successor = node.right;
      while (successor.left) {
        successor = successor.left;
      }
      node.val = successor.val;
      node.right = this._remove(node.right, successor.val);
    }

    return node;
  }
  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    return this._checkBalanced(this.root) !== -1;
  }

  _checkBalanced(node) {
    if (!node) {
      return 0; // Height of an empty tree is 0
    }

    const leftHeight = this._checkBalanced(node.left);
    const rightHeight = this._checkBalanced(node.right);

    if (
      leftHeight === -1 ||
      rightHeight === -1 ||
      Math.abs(leftHeight - rightHeight) > 1
    ) {
      return -1; // Unbalanced
    }

    return Math.max(leftHeight, rightHeight) + 1;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */
  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) {
      return undefined; // Tree is empty or has only one node
    }

    let current = this.root;
    let parent = null;

    // Find the largest node
    while (current.right) {
      parent = current;
      current = current.right;
    }

    // If the largest node has a left subtree, find the largest node in that subtree
    if (current.left) {
      current = current.left;
      while (current.right) {
        current = current.right;
      }
    } else if (parent) {
      // If the largest node doesn't have a right subtree, the second largest is its parent
      return parent.val;
    }

    return current.val;
  }
}

module.exports = BinarySearchTree;
