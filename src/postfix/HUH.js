expression.split("").forEach((character) => {
  if (character === "(") {
    stack.push(character);
  } else {
    if (character === ")") {
      let top = stack.pop();
      while (top !== "(") {
        result.push(top);
        top = stack.pop();
      }
    } else {
      if ("+-*/".includes(character)) {
        if (
          !stack.top ||
          stack.top.value === "(" ||
          precedence[character] > precedence[stack.top.value]
        ) {
          stack.push(character);
        } else {
          while (
            stack.top &&
            precedence[stack.top.value] >= precedence[character]
          ) {
            result.push(stack.pop());
          }

          stack.push(character);
        }
      } else {
        result.push(character);
      }
    }
  }
});
