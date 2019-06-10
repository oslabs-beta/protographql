import React, { useState } from 'react';
import NavButton from './navButton';
import styled from 'styled-components';


const SideBar = styled.div`
  background-color: white;
  grid-area: navSideBar;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.10);
  display: inline-block;
  height: 100vh;
`
//when someone clicks table, the schema should stay.
function NavSideBar({ setView, setPopUp, setSelectedTable, tableIndexState }) {
  const buttons = () => {
    let input = [];
    const popUp = ['', '', '', 'table'];
    const views = ['Schema', 'Code', 'Export', 'Create Table'];
    const icons = ["fas fa-code-branch", "fas fa-code", "fas fa-file-download", "fas fa-plus-square"]
    const route = ['schema', 'code', 'export', 'schema'];
    views.forEach((text, i) => {
      let click = () => {
        setView(route[i]);
        setPopUp(popUp[i]);
        if (i === 3) {
          setSelectedTable({
            type: '',
            fields: {
              0: {
                name: '',
                type: 'string',
                primaryKey: false,
                autoIncrement: false,
                unique: false,
                defaultValue: '',
                required: false,
                multipleValues: false,
                relationSelected: false,
                relation: {
                  tableIndex: -1,
                  fieldIndex: -1,
                  refType: ''
                },
                refBy: new Set(),
                queryable: true,
                tableNum: -1,
                fieldNum: -1,
              }
            },
            fieldIndex: 2,
            tableID: tableIndexState
          })
        }
      }
      input.push(
        <NavButton
          key={i}
          className={icons[i]}
          view={text}
          click={click}
        />
      )
    })
    return input;
  }
  return (
    <SideBar>
      {buttons()}
    </SideBar>
  )
}

export default NavSideBar;
