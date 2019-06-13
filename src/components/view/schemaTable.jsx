import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, Typography, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core/';
import { Edit, Delete } from '@material-ui/icons';

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

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);


const useStyles = makeStyles(theme => ({
  root: {
    width: 250,
    maxHeight: 300,
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 200
  },
  title: {
    variant: "h6",
    id: "tableTitle",
    // color: 'textSecondary',
    minWidth: 200,
    paddingTop: '8px',
    paddingLeft: '16px',
    paddingRight: '16px',
    color: '#dd399c',
    fontWeight: 400,
    letterSpacing: '0.1em',
  },
  button: {
    color: 'black',
  }
}));

function SchemaTable({ table,
  setTables,
  setPopUp,
  tableKey,
  setView,
  deleteTable,
  setSelectedTable
}) {
  const classes = useStyles();
  const fields = (
    Object.keys(table.fields).map(fieldKey => (
      {
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
        <span style={{ float: "right" }} >
          <Delete
            className={classes.button}
            onClick={() => deleteTable(tableKey)}
          />
        </span>
        <span style={{ float: "right", marginRight: 5 }}>
          <Edit
            className={classes.button}
            onClick={() => {
              setSelectedTable(table);
              setPopUp('table');
            }}
          />
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
              <StyledTableCell align="right">{field.type}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>

      </Table>
    </Paper >
  );
}

export default SchemaTable;
