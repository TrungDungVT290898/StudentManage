import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Student } from '../../../models';
import studentAPI from '../../../api/studentAPI';

function AddEditPage() {
    const { studentId } = useParams<{ studentId: string }>();
    const isEdit = Boolean(studentId);
    const [student, setStudent] = useState<Student>();
    useEffect(() => {
        if (!studentId) return;
        (async () => {
            try {
                const res: Student = await studentAPI.getById(studentId);
                setStudent((s) => (s = res));
                console.log('found student:', res);
            } catch (error) {
                console.log(`Failed to get student detail,studentId: ${studentId}`, error);
            }
        })();
    }, [studentId]);

    return (
        <Box>
            <Link to="/admin/student">
                <Typography variant="caption">
                    <ArrowBackIcon />
                    &nbsp;Back to student list
                </Typography>
            </Link>
            <Typography variant="h4">{isEdit ? 'Edit Student' : 'Add Student'}</Typography>
        </Box>
    );
}

export default AddEditPage;
