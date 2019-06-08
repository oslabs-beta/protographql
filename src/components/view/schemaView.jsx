import React, { Fragment } from 'react';
// import SchemaTable from './schemaTable'
import styled from 'styled-components';

const View = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 10px;
`

// const View = styled.div`
//   display: grid;
//   grid-template-columns: 200px 200px 200px 200px auto;
//   grid-template-rows: auto;
// `

function SchemaView ({ tables, setTables, setPopUp, view }) {
//  const tablesArray = Object.keys(tables).map(tableKey => (
//    <SchemaTable
//     key={tableKey}
//     tableKey={tableKey}
//     table={tables[tableKey]}
//     setTables={setTables}
//     setPopUp={setPopUp}
//     />
//  ))
 
 return (
  <View >
    <div style={{ margin: "10px" }}>bsrkvmsrfskdcbasdbvmsdtfbdsrfbvsfhmfgu</div>
    <div style={{ margin: "10px" }}>Test2</div>
    <div style={{ margin: "10px" }}>Test2</div>
    <div style={{ margin: "10px" }}>Test2</div>
    <div style={{ margin: "10px" }}>Test2</div>
    <div style={{ margin: "10px" }}>Test2</div>

      {/* { tablesArray } */}
  </View>
 )
}

export default SchemaView;