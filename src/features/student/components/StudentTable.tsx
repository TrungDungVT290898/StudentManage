import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { City, Student } from '../../../models';
import Button from '@mui/material/Button';
import { captializeString, formatCellByMark } from '../../../utils/common';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AlertDialog from './Dialog';
import Portal from '../../../components/common/Portal';
type TStudentTableProps = {
  students: Student[];
  citiesMap: { [code: string]: City };
  onEdit?: (student: string) => void;
  onRemove?: (student: Student) => void;
};

const StudentTable = ({ students, citiesMap, onEdit, onRemove }: TStudentTableProps) => {
  const { t, i18n } = useTranslation();
  const [openRemoveDialog, setOpenRemoveDialog] = React.useState(false);
  const [selectedStudent, setSelectedSutudent] = React.useState<Student>();
  const handleRemoveClick = (student: Student) => {
    setSelectedSutudent(s => (s = student));
    setOpenRemoveDialog(true);
  };

  const handleRemoveDialogClose = (option: 'y' | 'n' | '') => {
    if (option === 'y') {
      onRemove?.(selectedStudent!);
    } else {
      setSelectedSutudent(s => (s = undefined));
    }
    setOpenRemoveDialog(false);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('ID')}</TableCell>
              <TableCell>{t('Name')}</TableCell>
              <TableCell>{t('Gender')}</TableCell>
              <TableCell align="center">{t('Mark')}</TableCell>
              <TableCell>{t('City')}</TableCell>
              <TableCell align="center">{t('Actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map(student => (
              <TableRow
                key={`${student.id}_${student.name}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {student.id}
                </TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{captializeString(student.gender)}</TableCell>
                <TableCell>
                  <Box sx={{ bgcolor: `${formatCellByMark(student.mark)}`, textAlign: 'center' }}>{student.mark}</Box>
                </TableCell>
                <TableCell>{citiesMap[student.city]?.name}</TableCell>
                <TableCell sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                  <Button variant="contained" size="small" onClick={() => onEdit?.(student.id!)}>
                    EDIT
                  </Button>
                  <Button variant="outlined" size="small" onClick={() => handleRemoveClick(student)} color="secondary">
                    REMOVE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AlertDialog
        content={`Are you sure want to remove student ${selectedStudent?.name},all ${selectedStudent?.gender === 'male' ? 'his' : 'her'
          } informations will be
                delete permantly`}
        title="Confirm"
        noText="Cancel"
        yesText="Remove"
        isOpen={openRemoveDialog}
        confirmOption={handleRemoveDialogClose}
      />

    </>
  );
};

export default StudentTable;
