import React, { useContext } from 'react';
import styled from 'styled-components';


function VizType ({ table }) {
  const values = []
  for (let key in table.fields) {
    values.push(<p>{key}: {table.fields[key]}</p>)
  }
  return (
    <div>
    <h4>{table.name}</h4>
    {values}
    </div>
  )
}

export default VizType