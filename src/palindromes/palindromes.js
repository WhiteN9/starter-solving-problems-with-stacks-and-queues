const Stack = require("../lib/stack");

const isPalindrome = (sentence) => {
  sentence = sentence.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  // Your solution here
  if (sentence === "" || sentence.length === 1) {
    return true;
  }
  let midpoint = Math.floor(sentence.length / 2);

  const stack = new Stack();

  let index = 0;
  while (index < midpoint) {
    stack.push(sentence[index]);
    index++;
  }

  index += sentence.length % 2 === 1 ? 1 : 0;

  while (index < sentence.length) {
    if (stack.pop() !== sentence[index]) {
      return false;
    }
    index++;
  }
  return true;
};

/*
const isPalindrome = (sentence) => {
  sentence = sentence.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  // Your solution here
  if(sentence === "" || sentence.length === 1) {
    return true
  }
  const midpoint = Math.floor(sentence.length / 2);
  console.log(midpoint);

  const stack = new Stack();

  let index = 0;
  while (index < midpoint) {
    stack.push(sentence[index]);
    index++;
  }

  if (sentence.length % 2 === 1) {
    index = midpoint + 1;
  } else index = midpoint;
  
  while (index < sentence.length) {
    const popped = stack.pop();
    if (popped !== sentence[index]) {
      return false;
    }
    index++;
  }
  console.log(stack);
  return true;
};
*/

module.exports = isPalindrome;
