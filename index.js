// Priority Queue
// element with 1 priority should be preferred while insertion and deletion from queue
// implement using min heap ,as parent will have highest priority (lowest value)
// parent of i'th node : Math.ceil((i-1)/2)
// child;s of i'th parent : 
//  left :  2 * i + 1
//  right : 2 * i + 2

class Node {
  constructor(val,priority){
    this.val = val;
    this.priority = priority;
  }
}
class PriorityQueue {
  constructor(){
    this.values = [];    // min heap represented as array, every new elem will be pushed to last index , and depending on priority can be bubbled up
  }
  get size() {
    return this.values.length;
  }
  comparator = (a, b) => {
    return this.values[a].priority - this.values[b].priority
  } 
  swap(a, b) {
    [this.values[a], this.values[b]] = [this.values[b], this.values[a]];
  }
  enqueue(value, priority){
    let newNode = new Node(value,priority);
    this.values.push(newNode);
    this.bubbleUp();
   
  }

  bubbleUp(){
    let idx = this.size -1; //last index
    while(idx>0){
      let parentIdx = Math.ceil((idx-1)/2);
      let parent = this.values[parentIdx];
      const ele = this.values[idx];
      if(parent.priority <= ele.priority){
        break; // elem is at correct position as it has greater compared to its parent (less priority)
      }
          this.values[parentIdx] = ele;
          this.values[idx] = parent;
          idx = parentIdx;
      
    }
  }
  dequeue(index=0){. // dequeue will always remove root, (aka poll), as that will have highest priority
    if (!this.size) return null;
    this.swap(index, this.size - 1); // swap root( default, or any elem to be dequeued) with last index
    const value = this.values.pop(); // remove that element, which is now at the last
    this.bubbleDown(index); // the prev last elem which was swapped to root,  find its correct position
    return this;
  }

  bubbleDown(index=0) {
    const left = (i) => 2 * i + 1;   
    const right = (i) => 2 * i + 2;  
    // check for right node, if its not exisiting, min is left,   
    const getMin = (i) => ( right(i) < this.size && this.comparator(right(i), left(i)) < 0 ? right(i) : left(i));

    while (left(index) < this.size && this.comparator(getMin(index),index ) <0) {
        const min = getMin(index);
        this.swap(index, min);
        index = min;
    }
  }
}

// 1, 2, 3, 4, , 7
// 7, 2, 3, 4
// 2, 7, 3, 4
// 2, 4, 3, 7
const pq = new PriorityQueue();
console.log('0',pq.enqueue('Cough',7));
console.log('1',pq.enqueue('Fever',4));
console.log('2',pq.enqueue('SwineFlu',3));
console.log('3',pq.enqueue('Covid',1));
console.log('4',pq.enqueue('Ebola',2));
console.log(pq.dequeue());
console.log(pq.dequeue());
console.log(pq.dequeue());
