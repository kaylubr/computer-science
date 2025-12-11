import Node from './Node.js';

class HashMap {
    constructor() {
        this.capacity = new Array(16);
        this.loadFactor = 0.75;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity.length;
        }

        return hashCode;
    }

    set(key, value) {
        const index = this.hash(key);
        if (index < 0 || index >= this.capacity.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if (this.capacity[index] === undefined) {
            this.capacity[index] = new Node(key, value);
            this.#checkLoadCapacity();
            return
        }

        let head = this.capacity[index];
        while (head) {
            if (head.key === key) {
                head.value = value;
                return
            } else if (head.nextNode === null) {
                head.nextNode = new Node(key, value);
            } else {
                head = head.nextNode;
            }

            this.#checkLoadCapacity();
        }
    }

    get(key) {
        const index = this.hash(key);
        if (index < 0 || index >= this.capacity.length) {
            throw new Error("Trying to access index out of bounds");
        }

        let head = this.capacity[index];
        if (!head) {
            return null
        }

        while(head) {
            if (head.key === key) {
                return head.value
            }

            head = head.nextNode;
        }

        return null;
    }

    has(key) {
        const index = this.hash(key);
        if (index < 0 || index >= this.capacity.length) {
            throw new Error("Trying to access index out of bounds");
        }

        let head = this.capacity[index];
        if (!head) {
            return false
        }

        while(head) {
            if (head.key === key) {
                return true
            }

            head = head.nextNode;
        }

        return false;
    }

    remove(key) {
        const index = this.hash(key);
        if (index < 0 || index >= this.capacity.length) {
            throw new Error("Trying to access index out of bounds");
        }

        // Single nodes
        let head = this.capacity[index];
        
        if (!head) {
            return false
        } else if (head.key === key) {
            this.capacity[index] = null;
            return true
        }

        let previous = head;
        let current = head.nextNode;
        while (current) {
            if (current.key === key) {
                previous.nextNode = current.nextNode;
                return true
            }
            previous = current;
            current = current.nextNode;
        }

        return false
    }

    length() {
        const buckets = this.capacity;
        const total = buckets.reduce((acc, bucket) => {
            while (bucket) {
                acc += 1;
                bucket = bucket.nextNode;
            }
            return acc
        }, 0)

        return total
    }

    clear() {
        this.capacity = new Array(16);
    }

    keys() {
        const buckets = this.capacity;
        const allKeys = buckets.map(bucket => {
            const temp = []
            while (bucket) {
                temp.push(bucket.key);
                bucket = bucket.nextNode;
            }
            return temp
        });

        return allKeys.flat()
    }

    values() {
        const buckets = this.capacity;
        const allValues = buckets.map(bucket => {
            const temp = []
            while (bucket) {
                temp.push(bucket.value);
                bucket = bucket.nextNode;
            }
            return temp
        });

        return allValues.flat()
    }

    entries() {
        const buckets = this.capacity;
        const hashes = buckets.reduce((arr, bucket) => {
            while (bucket) {
                arr.push([bucket.key, bucket.value]);
                bucket = bucket.nextNode;
            }
            return arr;
        }, [])

        return hashes
    }

    #checkLoadCapacity() {
        if (this.length() > parseInt(this.capacity.length * this.loadFactor)) {
            const currentHashes = this.entries();
            this.capacity = new Array(this.capacity.length * 2);
            currentHashes.forEach((hash) => this.set(hash[0], hash[1]))
        }
    }
}

export default HashMap