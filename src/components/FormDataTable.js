import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserExamData,
  formActions,
  getAllExamFormData,
} from "../redux/formSlice";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scrolling animation
  });
};
const headerStyle = {
  fontSize: "1rem",
  fontStyle: "normal",
  fontWeight: "bolder",
  color: "#000000",
  textTransform: "capitalize",
};

const tableHeaders = [
  { key: "firstName", value: "First Name" },
  { key: "lastName", value: "Last Name" },
  { key: "emailId", value: "Email ID" },
  { key: "examName", value: "Exam Name" },
  { key: "examDate", value: "Exam Date" },
  { key: "subject", value: "Subject" },
  { key: "candidateImage", value: "Image" },
  { key: "candidateSign", value: "Signature" },
  { key: "actions", value: "Actions" },
];

const FormDataTable = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const allFormData = useSelector((state) => state.FORM.allFormData);

  useEffect(() => {
    // @ts-ignore
    dispatch(getAllExamFormData({ endpoint: "form/get-all-form-data" }));
  }, [dispatch]);
  const onEdit = (row) => {
    dispatch(formActions.setIsEdit(true));
    dispatch(formActions.setEditRow(row));
    scrollToTop();
  };
  const onDelete = (id) => {
    if (id) {
      dispatch(
        // @ts-ignore
        deleteUserExamData({ endpoint: `form/delete-form-data?userId=${id}` })
      // @ts-ignore
      ).then(() => dispatch(getAllExamFormData({ endpoint: "form/get-all-form-data" })));
    }
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeaders.map((head) => (
              <TableCell key={head.key} sx={headerStyle}>
                {head.value}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? allFormData.data?.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : allFormData.data
          )?.map((row) => (
            <TableRow key={row?._id}>
              <TableCell>{row?.firstName}</TableCell>
              <TableCell>{row?.lastName}</TableCell>
              <TableCell>{row?.emailId}</TableCell>
              <TableCell>{row?.examName}</TableCell>
              <TableCell>
                {new Date(row?.examDate).toISOString().split("T")[0]}
              </TableCell>
              <TableCell>{row?.subject}</TableCell>
              <TableCell>
                <img
                  src={`http://localhost:5000${row.candidateImage}`}
                  alt="CandidateImage"
                  style={{ width: 50, height: 50 }}
                />
              </TableCell>
              <TableCell>
                <img
                  src={`http://localhost:5000${row.candidateSign}`}
                  alt="CandidateImage"
                  style={{ width: 50, height: 50 }}
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(row)}>
                  <EditIcon color={"action"} />
                </IconButton>
                <IconButton onClick={() => onDelete(row._id)}>
                  <DeleteIcon color="action" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        component="div"
        count={allFormData.data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </TableContainer>
  );
};

export default FormDataTable;
