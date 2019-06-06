import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#00264d',
    color: theme.palette.common.white,
    fontSize: 16,
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);


const useStyles = makeStyles(theme => ({
  root: {
    width: 350,
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 300,
  },
}));

function SchemaTable ( { table, setTables, setPopUp }) {
  const classes = useStyles();
  function createField (name, type) {
    return { name, type };
  }
  
  const fields = (
    Object.keys(table.fields).map(fieldKey => (
      {
        name: table.fields[fieldKey].name,
        type: table.fields[fieldKey].type
      }
    ))  
  )

  

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>

        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Type</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {fields.map(field => (
            <StyledTableRow key={field.name}>
              <StyledTableCell component="th" scope="field">
                {field.name}
              </StyledTableCell>
              <StyledTableCell align="right">{field.type}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>

      </Table>
    </Paper>
  );
}

export default SchemaTable;