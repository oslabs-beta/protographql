import React, { useContext } from 'react';
import NavButton from './navButton';
import NoTableButton from './noTableButton';
import styled from 'styled-components';
import { Store } from '../../state/store';
import {
  SET_POP_UP,
  SET_VIEW,
  ADD_TABLE,
} from '../../actions/actionTypes';

/*-------------------- Styled Components --------------------*/

// styles the left side-bar of the application
const SideBar = styled.div`
  background-color: white;
  grid-area: navSideBar;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.10);
  display: inline-block;
  height: calc(100vh - 64px);
  position: relative;
`;

/*-------------------- Functional Component --------------------*/

const views = ["Schema", "Code", "Visualize"]

// alters the clicked button of the side-bar menu
function changeButtonStyleOnClick(view) {
  // selects the button that was clicked
  const currentButton = document.querySelector(`#${view}`);
  // sets the box shadow of the clicked button
  currentButton.style.boxShadow = "4px 4px 4px rgba(0, 0, 0, 0.10)";
  // styles the border type of the clicked button
  currentButton.style.border = "2px solid rgba(0, 0, 0, 0.12)";
  // styles the right border of the clicked button
  currentButton.style.borderRight = "4px solid rgba(221, 57, 156, 1)";
  // iterate through all the buttons ('Schema', 'Code', and 'Visualize')
  for (let j = 0; j < views.length; j++) {
    /*
    if the current button in the iteration is not the button that was clicked... go to line 46
    */
    if (view !== views[j]) {
      // select the current button in the iteration
      const button = document.querySelector(`#${views[j]}`);
      // set the box shadow of the current button in the iteration
      button.style.boxShadow = "1px 2px 3px rgba(0, 0, 0, 0.10)";
      // set the border type of the current button in the iteration
      button.style.border = "none";
      // set the right border style of the current button in the iteration
      button.style.borderRight = "1px solid rgba(0, 0, 0, 0.12)";
    }
  }
}

function NavSideBar() {
  /*
    -> connects the application to the context (utilized by Hooks in React) and facilitates the ability to
        update the context of the application
    -> the context is initialized by useContext() and specified by Store which is found
        in /components/state/store.jsx
  */
  const { dispatch, state: { tableIndex } } = useContext(Store);
  return (
    <SideBar>
      <NavButton
        key='NavButton0'
        className='fas fa-code-branch'
        view='Schema'
        click={(e) => {
          dispatch({ type: SET_VIEW, payload: 'schema' })
          dispatch({ type: SET_POP_UP, payload: '' })
          changeButtonStyleOnClick("Schema")
          document.querySelector("svg") ? document.querySelector("svg").remove() : "";
        }}
      />
      <NavButton
        key='NavButton1'
        className='fas fa-code'
        view='Code'
        click={(e) => {
          dispatch({ type: SET_VIEW, payload: 'code' })
          dispatch({ type: SET_POP_UP, payload: '' })
          changeButtonStyleOnClick("Code")
          document.querySelector("svg") ? document.querySelector("svg").remove() : "";
        }}
      />
      <NavButton
        key='NavButton2'
        className='fas fa-project-diagram'
        view='Visualize'
        click={(e) => {
          dispatch({ type: SET_VIEW, payload: 'visualize' })
          dispatch({ type: SET_POP_UP, payload: '' })
          changeButtonStyleOnClick("Visualize")
          document.querySelector("svg") ? document.querySelector("svg").remove() : "";
        }}
      />
      <NavButton
        key='NavButton5'
        className='fas fa-project-diagram'
        view='GraphiQL'
        click={(e) => {
          dispatch({ type: SET_VIEW, payload: 'graphiql' })
          dispatch({ type: SET_POP_UP, payload: '' })
          changeButtonStyleOnClick("Visualize")
          document.querySelector("svg") ? document.querySelector("svg").remove() : "";
        }}
      />
      {tableIndex !== 0 && <NavButton
        key='NavButton3'
        className='fas fa-plus-square'
        view='Add Table'
        click={() => {
          dispatch({ type: SET_VIEW, payload: 'schema' })
          dispatch({ type: SET_POP_UP, payload: 'table' })
          dispatch({ type: ADD_TABLE })
          changeButtonStyleOnClick("Schema")
          document.querySelector("svg") ? document.querySelector("svg").remove() : "";
        }}
        style={{
          position: 'absolute',
          bottom: 0,
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          width: '100%'
        }}
      />}
      {tableIndex === 0 && <NoTableButton
        key='NavButton4'
        className='fas fa-plus-square'
        view='Add Table'
        click={() => {
          dispatch({ type: SET_VIEW, payload: 'schema' })
          dispatch({ type: SET_POP_UP, payload: 'table' })
          dispatch({ type: ADD_TABLE })
          changeButtonStyleOnClick("Schema")
          document.querySelector("svg") ? document.querySelector("svg").remove() : "";
        }}
        style={{
          position: 'absolute',
          bottom: 0,
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          width: '100%'
        }}
      />}
    </SideBar>
  )
}

export default NavSideBar;
