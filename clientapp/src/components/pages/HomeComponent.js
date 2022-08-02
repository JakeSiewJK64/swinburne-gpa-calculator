import { FormikProvider, useFormik } from 'formik';
import { Select, MenuItem, InputLabel, TextField, Button } from '@mui/material';
import Flex from '@react-css/flex';
import { useState } from 'react';

const HomeComponent = () => {

    const [semesters, setSemesters] = useState([]);
    var creditHours = 12.5;

    const grades = [
        { "grade": "HD", "value": 4 },
        { "grade": "D", "value": 3 },
        { "grade": "C", "value": 2 },
        { "grade": "P", "value": 1 },
    ];

    const formik = useFormik({
        initialValues: {
            "grade": grades[0].value,
            "credithours": creditHours
        },
        onSubmit: (val) => {
            console.log(val);
        },
    });

    const addSubjectToSemester = (index) => {
        if (!semesters[index].subjects) {
            semesters[index].subjects = [];
        }
        semesters[index].subjects.push([]);
        setSemesters([...semesters]);
        return semesters;
    }

    return (
        <>
            <div className="m-2">
                <FormikProvider value={formik}>
                    <Flex flexDirection='row' gap={10}>
                        <div className='w-100'>
                            <InputLabel className='m-1 mt-4 text-start'>Input Credit Hours</InputLabel>
                            <TextField
                                label="Credit Hours"
                                variant="outlined"
                                type="number"
                                name='credithours'
                                value={formik.values.credithours}
                                fullWidth
                                onChange={formik.handleChange}
                            />
                        </div>
                    </Flex>
                    <div className='w-100 d-flex'>
                        <Button className='m-1 ms-auto' variant='outlined' onClick={_ => {
                            setSemesters(oldArray => [...oldArray, {}])
                        }}>Add Semester</Button>
                    </div>
                    {
                        semesters.length > 0 ? semesters.map((x, i) => {
                            return (
                                <div className='card my-3' key={i}>
                                    <h3>Semester {i + 1}</h3>
                                    <Flex flexDirection='column' gap={10} className='m-2'>
                                        <Button className='ms-auto' variant='outlined' onClick={_ => {
                                            addSubjectToSemester(i)
                                        }}>Add Subjects</Button>
                                        {
                                            x.subjects ? x.subjects.map((a, i) => {
                                                return <Flex flexDirection='row' gap={10} key={i}>
                                                    <div className='w-100'>
                                                        <InputLabel className='m-1 text-start'>Subject Name</InputLabel>
                                                        <TextField
                                                            label="Subject Name"
                                                            variant="outlined"
                                                            type="text"
                                                            name='subjectname'
                                                            value={formik.values.credithours}
                                                            fullWidth
                                                            onChange={formik.handleChange}
                                                        />
                                                    </div>
                                                    <div className='w-100'>
                                                        <InputLabel className='m-1 text-start'>Select Grade</InputLabel>
                                                        <Select
                                                            fullWidth
                                                            label="Grade"
                                                            labelId="grade"
                                                            value={formik.values.grade}
                                                            onChange={formik.handleChange}
                                                            name="grade"
                                                        >
                                                            {grades.map((x) => (
                                                                <MenuItem value={x.value} key={x.value}>
                                                                    {x.grade}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </div>
                                                </Flex>
                                            }) :
                                                <></>
                                        }
                                    </Flex>
                                </div>
                            );
                        }) : <p>Start by Creating a Semester</p>
                    }
                </FormikProvider>
            </div>
        </>
    )
}

export default HomeComponent;