import { Select, MenuItem, InputLabel, TextField, Button, Switch, Paper, Card, FormHelperText } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Flex from '@react-css/flex';
import IntroductionDialog from '../IntroductionDialog/IntroductionDialog';
import SharedAlertDialog from '../../shared/SharedAlertDialog/SharedAlertDialog';
import minus from '../../../assets/img/minus.svg';
import malaysia from '../../../assets/img/country_flags/malaysia.png';
import australia from '../../../assets/img/country_flags/australia.png';
import komaruman from '../../../assets/img/kaisya_komaru_man.png'
import './HomeComponent.css';

const HomeComponent = () => {

    const { t } = useTranslation();
    const [semesters, setSemesters] = useState([]);
    const [creditHours, setCredithours] = useState(12.5);
    const [results, setResults] = useState({});
    const [lockCreditHours, setLockCreditHours] = useState(true);
    const [format, setformat] = useState("australian");
    const [userSelect, setuserSelect] = useState("australian");
    const [alertReset, setAlertReset] = useState(false);
    const [defaultNumberOfSubjects, setDefaultNumberOfSubjects] = useState(4);
    const [showSubjectName, setShowSubjectName] = useState(true);
    const [showGradeValue, setShowGradeValue] = useState(false);

    let isAustralia = format === "australian";

    const formats = [
        { "name": t('Australia'), "value": "australian" },
        { "name": t('Malaysian'), "value": "malaysian" },
    ]

    const grades = [
        { "grade": "HD", "value": 4, "fullname": "High Distinction" },
        { "grade": "D", "value": isAustralia ? 3 : 3.67, "fullname": "Distinction" },
        { "grade": "C", "value": isAustralia ? 2 : 3, "fullname": "Credit" },
        { "grade": "P", "value": isAustralia ? 1 : 2.33, "fullname": "Pass" },
        { "grade": "N", "value": isAustralia ? 0 : 1.67, "fullname": "Fail (45 -  49)" },
        { "grade": "N", "value": isAustralia ? 0 : 1.33, "fullname": "Fail (30 - 44)" },
        { "grade": "N", "value": 0, "fullname": "Fail (0 - 29)" },
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
        results.data = null;
        setResults(results);
        addSemester();
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

    const handleOK = () => {
        setformat(userSelect);
        setResults();
        resetStatistics();
        setAlertReset(false);
    }

    const handleCancel = () => {
        setAlertReset(false);
    }

    const toggleFormat = (value) => {
        setuserSelect(value);
        setAlertReset(true);
    }

    return (
        <Paper>
            <IntroductionDialog />
            <SharedAlertDialog
                title={t('ChangeFormatDialogTitle')}
                handleOK={handleOK}
                message={t('ChangeFormatDialogMessage')}
                handleCancel={handleCancel}
                open={alertReset}
            />
            <div className="m-2">
                <div className='w-100'>
                    <InputLabel className='m-1 text-start'>{t('CreditHours')}</InputLabel>
                    <Flex flexDirection='row' gap={10}>
                        <TextField
                            helperText={t('DisclaimerCreditHours')}
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
                    <Flex flexDirection='row' gap={10}>
                        <div className='w-100'>
                            <InputLabel className='m-1 mt-4 text-start'>{t('DefaultNoSubjectsLabel')}</InputLabel>
                            <TextField
                                helperText={t('DefaultNoSubjectsHelperText')}
                                variant="outlined"
                                type="number"
                                name='defaultnumberofsubjects'
                                fullWidth
                                value={defaultNumberOfSubjects}
                                onChange={(x) => setDefaultNumberOfSubjects(x.target.value)}
                            />
                        </div>
                        <div className='w-100'>
                            <InputLabel className='m-1 mt-4 text-start'>{t('Format')}</InputLabel>
                            <Select
                                required
                                fullWidth
                                label="Format"
                                style={{ maxHeight: "55px" }}
                                labelId="format"
                                value={format}
                                onChange={(x) => { toggleFormat(x.target.value) }}
                                name="format"
                            >
                                {
                                    formats.map(myFormat => {
                                        return (
                                            <MenuItem key={myFormat.name} value={myFormat.value}>
                                                <img src={myFormat.value === "australian" ? australia : malaysia} alt="country_flag" className='format-container me-1' />
                                                {myFormat.name}
                                            </MenuItem>
                                        )
                                    })
                                }

                            </Select>
                            <FormHelperText>{t('ToggleFormatHelperText')}</FormHelperText>
                        </div>
                    </Flex>
                    <Flex flexDirection='row'>
                        <p className='pt-3 ms-auto'>{t('ShowSubjectName')}</p>
                        <Switch
                            className='mt-2'
                            checked={showSubjectName}
                            onChange={() => setShowSubjectName(!showSubjectName)}
                        />
                    </Flex>
                    <Flex flexDirection='row'>
                        <p className='pt-3 ms-auto'>{t('ShowGradeValue')}</p>
                        <Switch
                            className='mt-2'
                            checked={showGradeValue}
                            onChange={() => setShowGradeValue(!showGradeValue)}
                        />
                    </Flex>
                </div>
                <div className='w-100 d-flex'>
                    <Button className='m-1 ms-auto' variant='contained' onClick={_ => {
                        addSemester()
                    }}>{t('AddSemester')}</Button>
                </div>
                {
                    semesters.length > 0 ? semesters.map((semester, semesterindex) => {
                        return (
                            <Card className='my-3' key={semesterindex}>
                                <h3>{t('Semester')} {semesterindex + 1}</h3>
                                <Flex flexDirection='column' gap={10} className='m-2'>
                                    <Flex flexDirection='row' gap={10}>
                                        <Button className='ms-auto' variant='outlined' onClick={_ => {
                                            addSubjectToSemester(semesterindex)
                                        }}>{t('AddSubjects')}</Button>
                                        <Button className='bg-danger text-white' variant="text" onClick={() => removeSemester(semesterindex)}>{t('RemoveSemester')}</Button>
                                    </Flex>
                                    {
                                        semester.subjects ? semester.subjects.map((a, subjectindex) => {
                                            return <Flex flexDirection='row' gap={10} key={subjectindex}>
                                                {
                                                    showSubjectName ? <div className='w-100'>
                                                        <InputLabel className='m-1 text-start'>{t('SubjectName')}</InputLabel>
                                                        <TextField
                                                            required
                                                            variant="outlined"
                                                            type="text"
                                                            name='subjectname'
                                                            value={a.subjectname}
                                                            fullWidth
                                                            onChange={(x) => setSubjectName(a, x.target.value)}
                                                        />
                                                    </div> : <></>
                                                }
                                                <div className='w-100'>
                                                    <InputLabel className='m-1 text-start'>{t('SelectGrade')}</InputLabel>
                                                    <Select
                                                        required
                                                        fullWidth
                                                        labelId="grade"
                                                        value={a.grade}
                                                        onChange={(x) => setSubjectGrade(a, x.target.value)}
                                                        name="grade"
                                                    >
                                                        {grades.map((x, gradeIndex) => (
                                                            <MenuItem value={x.value} key={gradeIndex}>
                                                                {x.fullname} ({x.grade})
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </div>
                                                {
                                                    showGradeValue ?
                                                        <div className='w-100'>
                                                            <InputLabel className='m-1 text-start'>{t('GradeValue')}</InputLabel>
                                                            <TextField
                                                                required
                                                                variant="outlined"
                                                                type="text"
                                                                disabled
                                                                name='gradevalue'
                                                                value={a.grade}
                                                                fullWidth
                                                                onChange={(x) => { }}
                                                            />
                                                        </div> : <></>
                                                }
                                                <img src={minus} alt="minus" style={{ width: "20px", cursor: "pointer" }} className="pt-4 removesubject" onClick={() => removeSubject(semester, subjectindex)} />
                                            </Flex>
                                        }) :
                                            <></>
                                    }
                                </Flex>
                            </Card>
                        );
                    }) :
                        <Flex flexDirection='column'>
                            <img src={komaruman} className="mx-auto empty-container" alt="alternative" />
                            <strong>
                                <h4>{t('EmptySemester')}</h4>
                            </strong>
                        </Flex>
                }
                <div className='d-flex flex-row'>
                    <div className='ms-auto'>
                        <Flex gap={10}>
                            {
                                semesters.length > 0 ? <>
                                    <Button className='bg-danger text-white' variant="text" onClick={() => resetStatistics()}>{t('Reset')}</Button>
                                    <Button className='bg-warning text-black' variant="text" onClick={() => { processCGPA() }}>{t('ProcessGPA')}</Button></> : <></>
                            }

                        </Flex>
                    </div>
                </div>
                {
                    results && results.data ?
                        <>
                            <Flex flexDirection='row'>
                                <strong>{t('Format')}: &nbsp;</strong>
                                <p> {isAustralia ? t('Australia') : t('Malaysia')} </p>
                                <img src={isAustralia ? australia : malaysia} style={{ width: "30px" }} alt="flag" className='m-1 pb-2' />
                            </Flex>
                            <Flex flexDirection='row'>
                                <strong>{t('CreditHours')}: &nbsp;</strong>
                                <p>{creditHours}</p>
                            </Flex>
                            <Flex flexDirection='row'>
                                <strong>{t('TotalGPA')}: &nbsp;</strong>
                                <p>{results.data.totalGpa}</p>
                            </Flex>
                            <Flex flexDirection='row'>
                                <strong>{t('TotalCreditHours')}: &nbsp;</strong>
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