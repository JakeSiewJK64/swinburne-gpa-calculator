import { Select, MenuItem, InputLabel, TextField, Button, Switch, Paper, Card } from '@mui/material';
import Flex from '@react-css/flex';
import { useState } from 'react';
import minus from '../../assets/img/minus.svg';
import IntroductionDialog from './IntroductionDialog';

const HomeComponent = () => {

    const [semesters, setSemesters] = useState([]);
    const [creditHours, setCredithours] = useState(12.5);
    const [results, setResults] = useState({});
    const [lockCreditHours, setLockCreditHours] = useState(true);
    const [defaultNumberOfSubjects, setDefaultNumberOfSubjects] = useState(4);

    const grades = [
        { "grade": "HD", "value": 4, "fullname": "High Distinction" },
        { "grade": "D", "value": 3, "fullname": "Distinction" },
        { "grade": "C", "value": 2, "fullname": "Credit" },
        { "grade": "P", "value": 1, "fullname": "Pass" },
        { "grade": "N", "value": 0, "fullname": "Fail" },
    ];

    const processCGPA = () => {
        let totalgpa = .0;
        let totalcredithours = .0;
        semesters.forEach(x => {
            x.subjects.forEach(subject => {
                totalgpa += (subject.grade * creditHours);
                totalcredithours += creditHours;
            });
        });
        setResults({
            data: {
                totalGpa: totalgpa,
                totalCreditHours: totalcredithours,
                cgpa: (totalgpa / totalcredithours).toFixed(3)
            }
        })
    }

    const removeSemester = (index) => {
        semesters.splice(index, 1);
        setSemesters([...semesters]);
    }

    const setSubjectName = (subject, value) => {
        if (!subject.subjectname) {
            subject.subjectname = ""
        }
        subject.subjectname = value;
        setSemesters([...semesters]);
    }

    const setSubjectGrade = (subject, grade) => {
        if (!subject.grade) {
            subject.grade = 0
        }
        subject.grade = grade;
        setSemesters([...semesters]);
    }

    const removeSubject = (semester, subjectindex) => {
        semester.subjects.splice(subjectindex, 1);
        setSemesters([...semesters]);
    }

    const addSubjectToSemester = (index) => {
        if (!semesters[index].subjects) {
            semesters[index].subjects = [];
        }
        semesters[index].subjects.push({
            subjectname: "",
            grade: grades[0].value
        });
        setSemesters([...semesters]);
        return semesters;
    }

    const resetStatistics = () => {
        setSemesters([]);
        results.data = undefined;
        setResults(results);
    }

    const addSemester = () => {
        let newSemester = {};
        newSemester.subjects = [];

        for (let i = 0; i < defaultNumberOfSubjects; i++) {
            newSemester.subjects.push({
                subjectname: "",
                grade: grades[0].value
            });
        }

        setSemesters(oldArray => [...oldArray, newSemester]);
    }

    return (
        <Paper>
            <IntroductionDialog />
            <div className="m-2">
                <div className='w-100'>
                    <InputLabel className='m-1 mt-4 text-start'>Input Credit Hours</InputLabel>
                    <Flex flexDirection='row' gap={10}>
                        <TextField
                            helperText="*Disclaimer: Do not change this field unless Swinburne has made any explicit changes to all subjects' credit points. Otherwise, the credit points will remain as 12.5 as of 2nd August 2022"
                            variant="outlined"
                            type="number"
                            name='credithours'
                            fullWidth
                            value={creditHours}
                            disabled={lockCreditHours}
                            onChange={(x) => setCredithours(x.target.value)}
                        />
                        <Switch
                            className='mt-2'
                            checked={!lockCreditHours}
                            onChange={() => setLockCreditHours(!lockCreditHours)}
                        />
                    </Flex>
                    <InputLabel className='m-1 mt-4 text-start'>Default Number of Subjects</InputLabel>
                    <TextField
                        helperText="Default number of subjects you take. Will auto generate when you add a new semester. This you can change..."
                        variant="outlined"
                        type="number"
                        name='defaultnumberofsubjects'
                        fullWidth
                        value={defaultNumberOfSubjects}
                        onChange={(x) => setDefaultNumberOfSubjects(x.target.value)}
                    />
                </div>
                <div className='w-100 d-flex'>
                    <Button className='m-1 ms-auto' variant='contained' onClick={_ => {
                        addSemester()
                    }}>Add Semester</Button>
                </div>
                {
                    semesters.length > 0 ? semesters.map((semester, semesterindex) => {
                        return (
                            <Card className='my-3' key={semesterindex}>
                                <h3>Semester {semesterindex + 1}</h3>
                                <Flex flexDirection='column' gap={10} className='m-2'>
                                    <Flex flexDirection='row' gap={10}>
                                        <Button className='ms-auto' variant='outlined' onClick={_ => {
                                            addSubjectToSemester(semesterindex)
                                        }}>Add Subjects</Button>
                                        <Button className='bg-danger text-white' variant="text" onClick={() => removeSemester(semesterindex)}>Remove Semester</Button>
                                    </Flex>
                                    {
                                        semester.subjects ? semester.subjects.map((a, subjectindex) => {
                                            return <Flex flexDirection='row' gap={10} key={subjectindex}>
                                                <div className='w-100'>
                                                    <InputLabel className='m-1 text-start'>Subject Name</InputLabel>
                                                    <TextField
                                                        required
                                                        label="Subject Name"
                                                        variant="outlined"
                                                        type="text"
                                                        name='subjectname'
                                                        value={a.subjectname}
                                                        fullWidth
                                                        onChange={(x) => setSubjectName(a, x.target.value)}
                                                    />
                                                </div>
                                                <div className='w-100'>
                                                    <InputLabel className='m-1 text-start'>Select Grade</InputLabel>
                                                    <Select
                                                        required
                                                        fullWidth
                                                        label="Grade"
                                                        labelId="grade"
                                                        value={a.grade}
                                                        onChange={(x) => setSubjectGrade(a, x.target.value)}
                                                        name="grade"
                                                    >
                                                        {grades.map((x) => (
                                                            <MenuItem value={x.value} key={x.value}>
                                                                {x.fullname} ({x.grade})
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </div>
                                                <img src={minus} alt="minus" style={{ width: "20px", cursor: "pointer" }} className="pt-4 removesubject" onClick={() => removeSubject(semester, subjectindex)} />
                                            </Flex>
                                        }) :
                                            <></>
                                    }
                                </Flex>
                            </Card>
                        );
                    }) : <p>Start by Creating a Semester</p>
                }
                <div className='d-flex flex-row'>
                    <div className='ms-auto'>
                        <Flex gap={10}>
                            {
                                semesters.length > 0 ? <>
                                    <Button className='bg-danger text-white' variant="text" onClick={() => resetStatistics()}>Reset</Button>
                                    <Button className='bg-warning text-black' variant="text" onClick={() => { processCGPA() }}>Calculate CGPA</Button></> : <></>
                            }

                        </Flex>
                    </div>
                </div>
                {
                    results.data ?
                        <>
                            <Flex flexDirection='row'>
                                <strong>Credit Hours: &nbsp;</strong>
                                <p>{creditHours}</p>
                            </Flex>
                            <Flex flexDirection='row'>
                                <strong>Total GPA: &nbsp;</strong>
                                <p>{results.data.totalGpa}</p>
                            </Flex>
                            <Flex flexDirection='row'>
                                <strong>Total Credit Hours: &nbsp;</strong>
                                <p>{results.data.totalCreditHours}</p>
                            </Flex>
                            <Flex flexDirection='row'>
                                <strong>CGPA: &nbsp;</strong>
                                <p>{results.data.cgpa}</p>
                            </Flex>
                        </>
                        :
                        <></>
                }
            </div>
        </Paper>
    )
}

export default HomeComponent;