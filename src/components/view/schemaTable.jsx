import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Table,
  Typography,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core/';
import styled from 'styled-components';

/*-------------------- Styled Components --------------------*/

// styles the 'Name' section of each cell that appears after clicking the 'Schema' button
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#324353',
    color: theme.palette.common.white,
    fontSize: 16,
    size: 'small',
    color: 'white'
  },
  body: {
    color: '#222',
    fontSize: 15,
  },
}))(TableCell);

// styles each field of each cell that appears after clicking the 'Schema' button
const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);


const useStyles = makeStyles(theme => ({
  // styles each cell that appears after clicking the 'Schema' button
  root: {
    width: 250,
    height: '100%',
  },
  // styles each cell that appears after clicking the 'Schema' button
  table: {
    minWidth: 200
  },
  // styles the title of each cell that appears after clicking the 'Schema' button
  title: {
    variant: "h6",
    id: "tableTitle",
    minWidth: 200,
    paddingTop: '3px',
    paddingLeft: '16px',
    paddingRight: '7px',
    paddingBottom: '2px',
    color: '#dd399c',
    fontWeight: 400,
    letterSpacing: '0.1em',
  }
}));

// styles the icons of the title section of each cell that appears after clicking the 'Schema' button
const Buttons = styled.span`
  color: black;
  margin-left: 5px;
  cursor: pointer;
  &:hover{
    color: #DD399C;
  }
`;

/*-------------------- Functional Component --------------------*/

function SchemaTable({
  table,
  setPopUp,
  tableKey,
  deleteTable,
  editTable
}) {
  // sets the classes to be used in each cell, as defined on line 41
  const classes = useStyles();
  const fields = (
    Object.keys(table.fields).map(fieldKey => (
      {
        // populates, for each cell, the table name, field name, field type, etc.
        name: table.fields[fieldKey].name,
        type: table.fields[fieldKey].type,
        tableNum: table.fields[fieldKey].tableNum,
        fieldNum: table.fields[fieldKey].fieldNum
      }
    ))
  )

  return (
    <Paper className={classes.root} style={{ margin: '10px' }}>
      <Typography className={classes.title}  >
        {table.type}
        <span style={{ float: "right" }}>
          <Buttons>
            <i className="fas fa-trash" onClick={() => deleteTable(tableKey)} />
          </Buttons>
        </span>
        <span style={{ float: "right", marginRight: 5 }}>
          <Buttons>
            <i
              className="fas fa-edit"
              onClick={() => {
                editTable(tableKey);
                setPopUp('table');
              }}
            />
          </Buttons>
        </span>
      </Typography>

      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Type</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {fields.map(field => (
            <StyledTableRow key={field.tableNum + '-' + field.name + '-' + field.fieldNum}>
              <StyledTableCell component="th" scope="field">
                {field.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                {field.type}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>

      </Table>
    </Paper >
  );
}

export default SchemaTable;
