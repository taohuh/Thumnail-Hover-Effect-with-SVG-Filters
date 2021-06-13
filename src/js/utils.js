const lerp = (a, b, n) => {
  return (1 - n) * a + n * b;
};

const getMousePosition = (event) => {
  return {
    x: event.clientX,
    y: event.clientY,
  };
};

export { lerp, getMousePosition };