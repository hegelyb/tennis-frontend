import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper, IconButton, Collapse, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'date', label: 'Date' },
  { id: 'location', label: 'Location' },
  { id: 'court', label: 'Court' },
  { id: 'set1', label: '1st Set' },
  { id: 'set2', label: '2nd Set' },
  { id: 'set3', label: '3rd Set' },
  { id: 'winner', label: 'Winner' },
  { id: 'actions', label: 'Actions', disableSorting: true },
];


export default function ResultsTable({ rows, onEdit, onDelete, order, orderBy, onRequestSort }) {
  const [openRow, setOpenRow] = React.useState(null);
  const createSortHandler = (property) => (event) => {
    onRequestSort(property);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                sortDirection={orderBy === headCell.id ? order : false}
                align={headCell.id === 'actions' ? 'center' : 'left'}
              >
                {headCell.disableSorting ? (
                  headCell.label
                ) : (
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(rows, getComparator(order, orderBy)).map((row, idx) => (
            <React.Fragment key={idx}>
              <TableRow>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.court}</TableCell>
                <TableCell>{row.set1 || ''}</TableCell>
                <TableCell>{row.set2 || ''}</TableCell>
                <TableCell>{row.set3 || ''}</TableCell>
                <TableCell>{row.winner}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => setOpenRow(openRow === idx ? null : idx)} size="small" color="inherit" title="Show Story">
                    <ExpandMoreIcon style={{ transform: openRow === idx ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                  </IconButton>
                  <IconButton onClick={() => onEdit(idx)} size="small" color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete(idx)} size="small" color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={headCells.length}>
                  <Collapse in={openRow === idx} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                      <Typography variant="subtitle2" color="secondary">Story</Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          whiteSpace: 'pre-line',
                          wordBreak: 'break-word',
                          maxWidth: '100%',
                        }}
                      >
                        {row.story || <i>No story provided.</i>}
                      </Typography>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
