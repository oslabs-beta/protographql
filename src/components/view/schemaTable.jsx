import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, Typography, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core/';
import { Edit, Delete  } from '@material-ui/icons';
// import { Edit, Delete } from ‘material-ui/icons’;
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#161e26',
    color: theme.palette.common.white,
    fontSize: 16,
    size: 'small',
    color: 'white'
  },
  body: {
    color: '#161e26',
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
    color:'textSecondary',
  }
}));

function SchemaTable ( { table, setTables, setPopUp, tableKey }) {
  const classes = useStyles();
  
  const fields = (
    Object.keys(table.fields).map(fieldKey => (
      {
        name: table.fields[fieldKey].name,
        type: table.fields[fieldKey].type,
      }
    ))  
  )

  return (
    <Paper className={classes.root} style={{width:'300px'}}> 
      <Typography className={classes.title}  >
        {table.type}
        <span style={{ marginLeft: 130}}>
          <Delete />
        </span>
        <span style={{ marginLeft: 10}}>
          <Edit />
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