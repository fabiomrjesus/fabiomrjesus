// src/store/companySlice.ts
import { createAsyncThunk, type ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  createCrudSlice,
  createCrudThunks,
  type CrudState,
} from '../genericApiSlice';
import type { Company } from '../../../models/work/company';




interface CompanyStateExtras {
  activeProjects: Company[];
}

const url = "https://localhost:7199/api/";
const {
  fetchList: _fetchCompanies,
  fetchById: _fetchCompanyById,
  createItem: _createCompany,
  updateItem: _updateCompany,
  deleteItem: _deleteCompany,
} = createCrudThunks<Company, Omit<Company, 'uuid'>, Partial<Omit<Company, 'uuid'>>>(
  'company', url
);


export const fetchCompaniesWithActiveProjects = createAsyncThunk<
  Company[],
  void,
  { rejectValue: string }
>(
  'company/fetchActiveProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Company[]>(`company/activeProjects`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


const { reducer, actions, thunks } = createCrudSlice<
  Company,
  Omit<Company, 'uuid'>,
  Partial<Omit<Company, 'uuid'>>,
  CompanyStateExtras
>({
    baseUrl: url,
  name: 'company',
  extraInitialState: {
    activeProjects: [],
  },
  extraReducers: (builder: ActionReducerMapBuilder<CrudState<Company> & CompanyStateExtras>) => {
    builder
      .addCase(fetchCompaniesWithActiveProjects.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCompaniesWithActiveProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.activeProjects = action.payload;
        state.error = null;
      })
      .addCase(fetchCompaniesWithActiveProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message || null;
      });
  },
});

export const fetchCompanies = thunks.fetchList;
export const fetchCompanyById = thunks.fetchById;
export const createCompany = thunks.createItem;
export const updateCompany = thunks.updateItem;
export const deleteCompany = thunks.deleteItem;


export default reducer;
