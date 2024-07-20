export const getArgs = (args) => {
  const res = {};
  const [node, file, ...rest] = args;

  rest.forEach((el, i, array) => {
    if (el.charAt(0) === '-') {
      if (i !== array.length - 1 && array[i + 1].charAt(0) !== '-') {
        res[el.slice(1)] = array[i + 1];
        return;
      }

      res[el.slice(1)] = true;
    }
  });

  return res;
};
