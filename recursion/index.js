function fibs(num) {
  let first = 0, second = 1, sum = 0;
  for (let i = 0; i < num - 1; i++) {
    sum = first + second;
    first = second;
    second = sum;
  }

  return sum;
}

function fibsRec(num) {
  if (num <= 1) return num;
  return fibsRec(num - 1) + fibsRec(num - 2);
}

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  let left = arr; 
  let right = arr.splice(arr.length / 2);

  left = mergeSort(left)
  right = mergeSort(right)
  
  let copy = []
  let i = 0
  let j = 0

  while (copy.length != (left.length + right.length)) {
    if (i >= left.length) {
      copy = copy.concat(right.slice(j))
      break;
    } else if (j >= right.length) {
      copy = copy.concat(left.slice(i))
      break;
    }

    if (left[i] < right[j]) {
      copy.push(left[i])
      i++
    } else if (right[j] < left[i]){
      copy.push(right[j])
      j++
    } else if (left[i] === right[j]){
      copy.push(left[i])
      i++
    } 
  }
  return copy
}

console.log(mergeSort([38, 27, 43, 10]))
console.log(mergeSort([73]))
console.log(mergeSort([1, 2, 3, 4, 5]))
console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
console.log(mergeSort([105, 79, 100, 110]));

