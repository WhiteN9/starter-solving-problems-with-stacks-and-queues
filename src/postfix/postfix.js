const Stack = require("../lib/stack");

const precedence = {
  "+": 0,
  "-": 0,
  "*": 1,
  "/": 1,
};

const postfix = (expression) => {
  if (expression.length === 0) {
    return expression;
  }

  const stack = new Stack();
  let result = [];
  for (let i = 0; i < expression.length; i++) {
    let character = expression[i];
    //If the character is an operand, append it to the result
    if (/[a-zA-Z]/g.test(character)) {
      result.push(character);
    }
    //Else, if the character is an operator
    if (/[*\/+-]/g.test(character)) {
      /**
       * If the current operator has a higher precedence, or higher priority than the operator on the top of stack,
       * @param {character vs stack.top.value}
       * i.e {*} vs {+}, * will have priority due to its property value in the precedence object
       * @returns {Boolean}
       * or if the stack is empty,
       * or if the top of the stack is `(`,
       * then push the current operator onto the stack.
       * This is so that the higher precedence node will be added to result first when we starts to pop off
       */
      if (
        !stack.top ||
        stack.top === "(" ||
        precedence[character] > precedence[stack.top.value]
      ) {
        stack.push(character);
      } 
      /**
       * Else we need to pop the operators off of the stack.
       * We pop until we reach an operator on the stack that has a lower or equal priority to the current operator, or until the stack is empty
       * As we pop them off the stack, we append the operator from the stack to `result`
       * Lastly, we push the current operator onto the stack.
       */
      else {
        while (
          stack.top &&
          precedence[character] <= precedence[stack.top.value]
        ) {
          result.push(stack.pop());
        }
        stack.push(character);
      }
    }
    //Else, if the character is a `(`, push it onto the stack
    if (character === "(") {
      stack.push(character);
    }

    //Else, if the character is a `)`, start popping the characters off the stack
    if (character === ")") {
      //pop the first node, if returned value is `(`, nothing will happen
      let top = stack.pop();
      //if it is not a `(`, iterate and append each character to the result until we reach `(` and end the loop
      while (top !== "(") {
        result.push(top);
        top = stack.pop();
      }
    }
  }

  while (stack.top) {
    result.push(stack.pop());
  }
  return result.join(" ");
};

const a = "(a + b)*c";
console.log(postfix(a));

module.exports = postfix;
