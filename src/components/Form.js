// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Input,
  InputLabel,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  saveExamData,
  getAllExamFormData,
  editExamData,
} from "../redux/formSlice";

const subjects = [
  {
    value: "math",
    label: "Math",
  },
  {
    value: "english",
    label: "English",
  },
  {
    value: "socialStudies",
    label: "Social Studies",
  },
  {
    value: "science",
    label: "Science",
  },
  {
    value: "hindi",
    label: "Hindi",
  },
  {
    value: "economics",
    label: "Economics",
  },
  {
    value: "computers",
    label: "Computers",
  },
];

const Form = () => {
  const dispatch = useDispatch();
  const isEdit = useSelector((state) => state.FORM.isEdit);
  const editRow = useSelector((state) => state.FORM.editRow);
  const formRef = useRef(null);

  const initialState = {
    firstName: "",
    lastName: "",
    emailId: "",
    examName: "",
    examDate: "",
    subject: "",
    candidateImage: null,
    candidateSign: null,
  };
  const [examDetails, setExamDetails] = useState(initialState);
  const [examDetailsError, setExamDetailsError] = useState({
    firstNameError: false,
    lastNameError: false,
    emailIdError: false,
    examNameError: false,
    examDateError: false,
    subjectError: false,
  });

  useEffect(() => {
    if (isEdit && editRow) {
      setExamDetails({
        firstName: editRow.firstName,
        lastName: editRow.lastName,
        emailId: editRow.emailId,
        examName: editRow.examName,
        examDate: new Date(editRow.examDate).toISOString().split("T")[0],
        subject: editRow.subject,
        candidateImage: editRow.candidateImage,
        candidateSign: editRow.candidateSign,
      });
    }
  }, [editRow, isEdit]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setExamDetails((prevDetails) => ({
        ...prevDetails,
        [event.target.name]: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (examDetails.emailId === "") {
      setExamDetailsError((prevDetailsError) => ({
        ...prevDetailsError,
        emailIdError: true,
      }));
      return false;
    }
    if (examDetails.firstName === "") {
      setExamDetailsError((prevDetailsError) => ({
        ...prevDetailsError,
        firstNameError: true,
      }));
      return false;
    }
    if (examDetails.lastName === "") {
      setExamDetailsError((prevDetailsError) => ({
        ...prevDetailsError,
        lastNameError: true,
      }));
      return false;
    }
    if (examDetails.examName === "") {
      setExamDetailsError((prevDetailsError) => ({
        ...prevDetailsError,
        examNameError: true,
      }));
      return false;
    }
    if (examDetails.subject === "") {
      setExamDetailsError((prevDetailsError) => ({
        ...prevDetailsError,
        subjectError: true,
      }));
      return false;
    }
    if (examDetails.examDate === "") {
      setExamDetailsError((prevDetailsError) => ({
        ...prevDetailsError,
        examDateError: true,
      }));
      return false;
    }
    if (isEdit) {
      const newExamDetails = { ...examDetails, userId: editRow._id };
      dispatch(
        editExamData({ endpoint: "form/edit-form-data", data: newExamDetails })
      ).then(() => {
        dispatch(getAllExamFormData({ endpoint: "form/get-all-form-data" }));
        formRef.current.reset();
        setExamDetails(initialState);
      });
    } else {
      dispatch(
        saveExamData({ endpoint: "form/save-form-data", data: examDetails })
      ).then(() => {
        dispatch(getAllExamFormData({ endpoint: "form/get-all-form-data" }));
        formRef.current.reset();
        setExamDetails(initialState);
      });
    }
  };
  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          justifyContent: "space-between",
          margin: "1rem",
          gap: "2rem",
          padding: "1rem",
        }}
      >
        <TextField
          fullWidth
          size="small"
          label="First Name"
          name="firstName"
          value={examDetails.firstName}
          onChange={(event) => {
            const { value } = event.target;
            setExamDetailsError((prevDetailsError) => ({
              ...prevDetailsError,
              firstNameError: false,
            }));
            setExamDetails((prevDetails) => ({
              ...prevDetails,
              firstName: value,
            }));
          }}
          variant="outlined"
          margin="normal"
          error={examDetailsError.firstNameError}
          helperText={
            examDetailsError.firstNameError ? "Please enter first name" : ""
          }
        />
        <TextField
          fullWidth
          size="small"
          label="Last Name"
          name="lastName"
          value={examDetails.lastName}
          onChange={(event) => {
            const { value } = event.target;
            setExamDetailsError((prevDetailsError) => ({
              ...prevDetailsError,
              lastNameError: false,
            }));
            setExamDetails((prevDetails) => ({
              ...prevDetails,
              lastName: value,
            }));
          }}
          variant="outlined"
          margin="normal"
          error={examDetailsError.lastNameError}
          helperText={
            examDetailsError.lastNameError ? "Please enter Last name" : ""
          }
        />
        <TextField
          fullWidth
          size="small"
          label="Email Id"
          name="emailId"
          type="email"
          value={examDetails.emailId}
          onChange={(event) => {
            const { value } = event.target;
            setExamDetailsError((prevDetailsError) => ({
              ...prevDetailsError,
              emailIdError: false,
            }));
            setExamDetails((prevDetails) => ({
              ...prevDetails,
              emailId: value,
            }));
          }}
          variant="outlined"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          error={examDetailsError.emailIdError}
          helperText={
            examDetailsError.emailIdError ? "Please enter Email Id" : ""
          }
        />
        <TextField
          fullWidth
          size="small"
          label="Exam Name"
          name="examName"
          value={examDetails.examName}
          onChange={(event) => {
            const { value } = event.target;
            setExamDetailsError((prevDetailsError) => ({
              ...prevDetailsError,
              examNameError: false,
            }));
            setExamDetails((prevDetails) => ({
              ...prevDetails,
              examName: value,
            }));
          }}
          variant="outlined"
          margin="normal"
          error={examDetailsError.examNameError}
          helperText={
            examDetailsError.examNameError ? "Please enter Exam Name" : ""
          }
        />
        <TextField
          fullWidth
          size="small"
          label="Exam Date"
          name="examDate"
          type="date"
          value={examDetails.examDate}
          onChange={(event) => {
            const { value } = event.target;
            setExamDetailsError((prevDetailsError) => ({
              ...prevDetailsError,
              examDateError: false,
            }));
            setExamDetails((prevDetails) => ({
              ...prevDetails,
              examDate: value,
            }));
          }}
          variant="outlined"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          error={examDetailsError.examDateError}
          helperText={
            examDetailsError.examDateError ? "Please enter Exam Date" : ""
          }
        />
        <TextField
          fullWidth
          label="Subject"
          size="small"
          id="subject"
          name="subject"
          value={examDetails.subject}
          onChange={(event) => {
            const { value } = event.target;
            setExamDetailsError((prevDetailsError) => ({
              ...prevDetailsError,
              subjectError: false,
            }));
            setExamDetails((prevDetails) => ({
              ...prevDetails,
              subject: value,
            }));
          }}
          variant="outlined"
          margin="normal"
          select
          error={examDetailsError.subjectError}
          helperText={
            examDetailsError.subjectError ? "Please select subject" : ""
          }
        >
          {subjects.map((option) => (
            <MenuItem value={option.value}>{option.label}</MenuItem>
          ))}
        </TextField>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <InputLabel htmlFor="image-upload1">
            Upload Candidate Image
          </InputLabel>
          <Input
            onClick={(e) => (e.target.value = null)}
            id="candidateImage"
            name="candidateImage"
            type="file"
            onChange={handleImageUpload}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <InputLabel htmlFor="image-upload2">
            Upload Candidate Signature
          </InputLabel>
          <Input
            onClick={(e) => (e.target.value = null)}
            id="candidateSign"
            name="candidateSign"
            type="file"
            onChange={handleImageUpload}
          />
        </Box>
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ width: "50%", margin: "1rem", padding: "0.5rem" }}
      >
        Submit
      </Button>
    </form>
  );
};

export default Form;
