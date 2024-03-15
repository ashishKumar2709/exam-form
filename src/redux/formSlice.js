import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteRequest, getRequest, postRequest, putRequest } from "../API";
import { toast } from "react-toastify";

export const saveExamData = createAsyncThunk(
  "form/saveExamData",
  // @ts-ignore
  async ({ endpoint, data }) => {
    const response = await postRequest(endpoint, data);
    return response?.data;
  }
);

export const editExamData = createAsyncThunk(
  "form/editExamData",
  // @ts-ignore
  async ({ endpoint, data }) => {
    const response = await putRequest(endpoint, data);
    return response?.data;
  }
);

export const getAllExamFormData = createAsyncThunk(
  "form/getAllExamFormData",
  // @ts-ignore
  async ({ endpoint }) => {
    const response = await getRequest(endpoint);
    return response?.data;
  }
);

export const deleteUserExamData = createAsyncThunk(
  "form/deleteUserExamData",
  // @ts-ignore
  async ({ endpoint }) => {
    const response = await deleteRequest(endpoint);
    return response?.data;
  }
);

const initialState = {
  loading: false,
  saveExamDataResponse: {},
  allFormData: [],
  isEdit: false,
  editRow: {},
};

export const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    setIsEdit(state, action) {
      state.isEdit = action.payload;
    },
    setEditRow(state, action) {
      state.editRow = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveExamData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(saveExamData.fulfilled, (state, action) => {
      state.loading = false;
      const responseData = action.payload;
      state.saveExamDataResponse = action.payload;
      if (responseData.status === 1) {
        toast.success(responseData.message);
      } else {
        toast.error(responseData.message);
      }
    });
    builder.addCase(saveExamData.rejected, (state, action) => {
      state.loading = false;
    });
    //-------------------------------------------------------------
    builder.addCase(getAllExamFormData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllExamFormData.fulfilled, (state, action) => {
      state.loading = false;
      state.allFormData = action.payload;
    });
    builder.addCase(getAllExamFormData.rejected, (state, action) => {
      state.loading = false;
    });
    //----------------------------------------------------------------
    builder.addCase(editExamData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(editExamData.fulfilled, (state, action) => {
      state.loading = false;
      const responseData = action.payload;
      if (responseData.status === 1) {
        toast.success(responseData.message);
      } else {
        toast.error(responseData.message);
      }
    });
    builder.addCase(editExamData.rejected, (state, action) => {
      state.loading = false;
    });
    //----------------------------------------------------------------
    builder.addCase(deleteUserExamData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteUserExamData.fulfilled, (state, action) => {
      state.loading = false;
      const responseData = action.payload;
      if (responseData.status === 1) {
        toast.success(responseData.message);
      } else {
        toast.error(responseData.message);
      }
    });
    builder.addCase(deleteUserExamData.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const formActions = formSlice.actions;
