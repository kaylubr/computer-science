import Node from "./Node.js"

class LinkedList {
  constructor() {
    this.node = null
    this.head = this.node
  }

  append(value) {
    if (!this.node) {
      this.node = new Node(value)
    } else if (!this.head.nextNode) {
      this.head.nextNode = new Node(value)
    } else {
      this.head = this.head.nextNode
      this.append(value)
    }

    this.head = this.node
  }

  prepend(value) {
    const temp = this.node
    this.node = new Node(value)
    this.node.nextNode = temp
    this.head = this.node
  }

  size() {
    if (!this.node) {
      return 0
    }

    let num = 1
    if (this.head.nextNode === null) {
      this.head = this.node
      return 1
    }

    this.head = this.head.nextNode

    return num + this.size()
  }
}

export default LinkedList