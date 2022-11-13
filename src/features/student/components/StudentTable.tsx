import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { City, Student } from '../../../models';
import Button from "@mui/material/Button"
import { captializeString, formatCellByMark } from '../../../utils/common';
import { Box } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
type TStudentTableProps = {
    students: Student[],
    citiesMap: { [code: string]: City }
    onEdit?: (student: Student) => void,
    onRemove?: (student: Student) => void,
}

const StudentTable = ({ students, citiesMap, onEdit, onRemove }: TStudentTableProps) => {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>GENDER</TableCell>
                        <TableCell align='center' >MARK</TableCell>
                        <TableCell >CITY</TableCell>
                        <TableCell align='center'>ACTIONS</TableCell>


                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((student) => (
                        <TableRow
                            key={`${student.id}_${student.name}`}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {student.id}
                            </TableCell>
                            <TableCell >{student.name}</TableCell>
                            <TableCell >{captializeString(student.gender)}</TableCell>
                            <TableCell >
                                <Box sx={{ bgcolor: `${formatCellByMark(student.mark)}`, textAlign: "center" }}>
                                    {student.mark}
                                </Box>
                            </TableCell>
                            <TableCell >{citiesMap[student.city]?.name}</TableCell>
                            <TableCell sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                                <Button variant='contained' onClick={() => onEdit?.(student)}>EDIT</Button>
                                <Button variant='outlined' onClick={() => onRemove?.(student)} color='secondary'>REMOVE</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default StudentTable