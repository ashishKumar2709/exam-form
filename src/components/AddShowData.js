import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import Form from "./Form";
import FormDataTable from "./FormDataTable";

const AddShowData = () => {
  return (
    <Box>
      <Paper className="App" sx={{ margin: "1rem" }}>
        <Typography
          sx={{
            margin: "1rem",
            fontSize: "1rem",
            fontStyle: "normal",
            fontWeight: "bolder",
            color: "#000000",
            textTransform: "capitalize",
          }}
        >
          Exam Form
        </Typography>
        <Form />
      </Paper>
      <FormDataTable />
    </Box>
  );
};

export default AddShowData;
