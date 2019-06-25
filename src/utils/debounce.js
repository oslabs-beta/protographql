function debounce(callback) {
  let invoked = false;
  return (arg) => {
    if (!invoked) {
      invoked = true;
      callback(arg);
      setTimeout(() => { invoked = false }, 3000);
    }
  }
}

export default debounce;