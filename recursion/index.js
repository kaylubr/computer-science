function fibs(num) {
  let first = 0, second = 1, sum = 0;
  for (let i = 0; i < num - 1; i++) {
    sum = first + second;
    first = second
    second = sum
  }

  return sum
}

function fibsRec(num) {
  if (num <= 1) return num;
  return fibsRec(num - 1) + fibsRec(num - 2)
}

