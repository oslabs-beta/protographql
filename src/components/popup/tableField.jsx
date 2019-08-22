import React from 'react';
import styled from 'styled-components';

/*-------------------- Styled Components --------------------*/

/*
styles the table row... in this application and in this instance, the only item styles is the line
between 'Enter Table Name' and the titles of the options associated with the 'Add Table' button
*/
const Tr = styled.tr`
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`;

/*
styles the table headers... in this application and in this instance, the items that are styled are the
titles associated with each option of the 'Add Table' button
*/
const Th = styled.th`
  font-size: .75em;
  padding: .9em;
`;

/*-------------------- Functional Component --------------------*/

function TableField() {
  return (
    // this specifies the name of each option associated with the 'Add Table' button
    <Tr>
      <Th>Delete</Th>
      <Th className="other-header">Field Name</Th>
      <Th className="other-header">Type</Th>
      <Th className="other-header">Default Value</Th>
      <Th className="slider-header">Primary Key</Th>
      <Th className="slider-header">Unique</Th>
      <Th className="slider-header">Required</Th>
      <Th className="slider-header">Queryable</Th>
      <Th className="other-header">Table Relationship</Th>
      <Th className="other-header">Field Relationship</Th>
      <Th className="other-header">Type of Relationship</Th>
    </Tr>
  );
}

export default TableField;
