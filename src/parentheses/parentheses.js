const Stack = require("../lib/stack");

const match = (expression) => {
  expression = expression.replace(/[^(\(\))]/g, "");
  if (expression === "") {
    return true;
  } else if (expression.length % 2 === 1) {
    return false;
  }

  const stack = new Stack();
  for (let i = 0; i < expression.length; i++) {
    if(expression[i] === `(`) {
        stack.push(expression[i])
    } else if (expression[i] === `)`) {
        //in case of the parenthese are out of order, )(
        //there might be nothing in the stack, so we need additional stop case
        if(!stack.top) {
            return false
        } else stack.pop();
    }
  }

  if(!stack.top) {
    return true
  }
  return false;
};

const a = "a + b + c) + (d"
console.log(match(a))
module.exports = match;
