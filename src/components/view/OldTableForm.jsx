import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Edit, Delete } from '@material-ui/icons';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import pink from '@material-ui/core/colors/pink'
import Input from '@material-ui/core/Input';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import FormGroup from '@material-ui/core/FormGroup';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const PinkSwitch = withStyles(theme => ({
  switchBase: {
    color: pink[300],
    '&$checked': {
      color: pink[500],
    },
    '&$checked + $track': {
      backgroundColor: pink[500],
    },
  },
  checked: {},
  track: {},
}))(Switch);

const useStyles = makeStyles(theme => ({
  root: {
    width: 1200,
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 600,
    fontSize: 10
  },
  header: {
    backgroundColor : "rgb(22, 30, 38)"
  },
  editButton: {
    minWidth: 35, 
    backgroundColor: "lightgrey", 
    borderRadius: 22, 
    marginRight: 5
  },
  deleteButton: {
    minWidth: 35, 
    backgroundColor: "lightgrey", 
    borderRadius: 22
  }
}));

const tableForm = ({ tables }) => {
  const classes = useStyles();

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <Paper className={classes.root}>
      {/* <FormControl>
        <InputLabel htmlFor="tableName">
          Table Name
        </InputLabel>
        <Input value='Test' onChange={handleChange}>
        </Input>
      </FormControl> */}
      <Table className={classes.table}>
        <TableHead className={classes.header}>
          <TableRow>
            <StyledTableCell align="center">Actions</StyledTableCell>
            <StyledTableCell align="center">Field Name</StyledTableCell>
            <StyledTableCell align="center">Type</StyledTableCell>
            <StyledTableCell align="center">Default Value</StyledTableCell>
            <StyledTableCell align="center">Primary Key</StyledTableCell>
            <StyledTableCell align="center">Autoincrement</StyledTableCell>
            <StyledTableCell align="center">Unique</StyledTableCell>
            <StyledTableCell align="center">Required</StyledTableCell>
            <StyledTableCell align="center">Multiple Values</StyledTableCell>
            <StyledTableCell align="center">Foreign Key</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(tables[0].fields).map(fieldKey => (
            <StyledTableRow key={fieldKey}>
              <StyledTableCell align="right">
                <Button className={classes.editButton}>
                  <Edit />
                </Button>
                <Button className={classes.deleteButton}>
                  <Delete />
                </Button>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Input />
              </StyledTableCell>
              <StyledTableCell align="right">
                {tables[0].fields[fieldKey].type}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Input />
              </StyledTableCell>
              <StyledTableCell align="right">
                <FormGroup>
                  <PinkSwitch checked={tables[0].fields[fieldKey].primaryKey} />
                </FormGroup>
              </StyledTableCell>
              <StyledTableCell align="right">
                <FormGroup>
                  <PinkSwitch checked={tables[0].fields[fieldKey].autoIncrement} />
                </FormGroup>
              </StyledTableCell>

              <StyledTableCell align="right">
                <FormGroup>
                  <PinkSwitch checked={tables[0].fields[fieldKey].unique} />
                </FormGroup>
              </StyledTableCell>

              <StyledTableCell align="right">
                <FormGroup>
                  <PinkSwitch checked={tables[0].fields[fieldKey].required} />
                </FormGroup>
              </StyledTableCell>

              <StyledTableCell align="right">
                <FormGroup>
                  <PinkSwitch checked={tables[0].fields[fieldKey].multipleValues} />
                </FormGroup>
              </StyledTableCell>
              <StyledTableCell align="right">Foreign Key</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default tableForm;
