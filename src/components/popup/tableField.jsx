import React from 'react';
import styled from 'styled-components';

/*-------------------- Styled Components --------------------*/

const Tr = styled.tr`
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`;

const Th = styled.th`
  font-size: .75em;
  padding: .9em;
`;

/*-------------------- Functional Component --------------------*/

function TableField() {
  return (
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
