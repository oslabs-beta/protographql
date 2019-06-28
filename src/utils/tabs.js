// Returns string of user-input tabbed spaces to indent our code
const tabs = numTabSpaces => {
  let tabSpaces = ``;
  while (numTabSpaces > 0) {
    tabSpaces += `  `;
    numTabSpaces--;
  } 
  return tabSpaces;
}

export default tabs;