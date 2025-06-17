import { createSlice, createAsyncThunk, type PayloadAction, type ActionReducerMapBuilder,} from '@reduxjs/toolkit';
import axios from 'axios';
import type { Draft } from 'immer';


export interface CrudState<T> {
  entities: Record<string, T>;
  selected: T | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}


export interface CrudThunks<T, CreatePayload = Partial<T>, UpdatePayload = Partial<T>> {
  fetchList: ReturnType<typeof createAsyncThunk<T[], void, { rejectValue: string }>>;
  fetchById: ReturnType<typeof createAsyncThunk<T, string, { rejectValue: string }>>;
  createItem: ReturnType<typeof createAsyncThunk<T, CreatePayload, { rejectValue: string }>>;
  updateItem: ReturnType<
    typeof createAsyncThunk<T, { uuid: string; data: UpdatePayload }, { rejectValue: string }>
  >;
  deleteItem: ReturnType<typeof createAsyncThunk<string, string, { rejectValue: string }>>;
}

export function createCrudThunks<
  T extends { uuid: string },
  CreatePayload = Omit<T, 'uuid'>,
  UpdatePayload = Partial<Omit<T, 'uuid'>>
>( baseUrl: string, resourceName: string): CrudThunks<T, CreatePayload, UpdatePayload> {
  //
  // If baseUrl is provided, use it as-is; otherwise, default to `${resourceName}`
  //
  const prefix = baseUrl?.replace(/\/$/, '') ?? `${resourceName.replace(/^\//, '')}`;

  // 1) GET  prefix              → fetchList
  const fetchPath = `${prefix}/${resourceName}`; 
  console.log(fetchPath)
  const fetchList = createAsyncThunk<T[], void, { rejectValue: string }>(
    fetchPath,
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get<T[]>(`${fetchPath}`);
        console.log(response.data);
        return response.data;
      } catch (err: any) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );

  // 2) GET  prefix/{uuid}       → fetchById
  const fetchById = createAsyncThunk<T, string, { rejectValue: string }>(
    `${resourceName}/fetchById`,
    async (uuid, { rejectWithValue }) => {
      try {
        const response = await axios.get<T>(`${prefix}/${uuid}`);
        return response.data;
      } catch (err: any) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );

  // 3) POST prefix              → createItem
  const createItem = createAsyncThunk<T, CreatePayload, { rejectValue: string }>(
    `${resourceName}/createItem`,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await axios.post<T>(`${prefix}`, payload);
        return response.data;
      } catch (err: any) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );

  // 4) PUT  prefix/{uuid}       → updateItem
  const updateItem = createAsyncThunk<
    T,
    { uuid: string; data: UpdatePayload },
    { rejectValue: string }
  >(
    `${resourceName}/updateItem`,
    async ({ uuid, data }, { rejectWithValue }) => {
      try {
        const response = await axios.put<T>(`${prefix}/${uuid}`, data);
        return response.data;
      } catch (err: any) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );

  // 5) DELETE  prefix/{uuid}    → deleteItem
  const deleteItem = createAsyncThunk<string, string, { rejectValue: string }>(
    `${resourceName}/deleteItem`,
    async (uuid, { rejectWithValue }) => {
      try {
        await axios.delete(`${prefix}/${uuid}`);
        return uuid;
      } catch (err: any) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );

  return { fetchList, fetchById, createItem, updateItem, deleteItem };
}

export interface CreateCrudSliceOptions<
  T extends { uuid: string },
  CreatePayload = Omit<T, 'uuid'>,
  UpdatePayload = Partial<Omit<T, 'uuid'>>,
  ExtraState extends object = {}
> {
  baseUrl: string;
  name: string;
  extraInitialState?: ExtraState;

  extraReducers?: (builder: ActionReducerMapBuilder<CrudState<T> & ExtraState>) => void;
}

export interface CrudSliceResult<
  T extends { uuid: string },
  CreatePayload,
  UpdatePayload,
  ExtraState extends object
> {
  /** The slice’s reducer (to plug into configureStore). */
  reducer: (state: (CrudState<T> & ExtraState) | undefined, action: any) => CrudState<T> & ExtraState;
  /** Plain (non‐async) actions, if any were defined. */
  actions: Record<string, any>;
  /** The five standard CRUD thunks, keyed by function name. */
  thunks: CrudThunks<T, CreatePayload, UpdatePayload>;
}

export function createCrudSlice<
  T extends { uuid: string },
  CreatePayload = Omit<T, 'uuid'>,
  UpdatePayload = Partial<Omit<T, 'uuid'>>,
  ExtraState extends object = {}
>(
  {
    name,
    baseUrl,
    extraInitialState,
    extraReducers,
  }: CreateCrudSliceOptions<T, CreatePayload, UpdatePayload, ExtraState>
): CrudSliceResult<T, CreatePayload, UpdatePayload, ExtraState> {
  // 1) Create the five generic CRUD thunks, passing in `baseUrl`
  const thunks = createCrudThunks<T, CreatePayload, UpdatePayload>(baseUrl, name);

  // 2) Build the initial state
  const baseState: CrudState<T> = {
    entities: {},
    selected: null,
    status: 'idle',
    error: null,
  };
  const initialState: CrudState<T> & ExtraState = {
    ...baseState,
    ...(extraInitialState || ({} as ExtraState)),
  };

  // 3) Create the slice, mutating the `entities` draft instead of reassigning
  const slice = createSlice({
    name,
    initialState,
    reducers: {
      // (If you want to define plain reducers, put them here.)
    },
    extraReducers: (builder: ActionReducerMapBuilder<typeof initialState>) => {
      // --- fetchList ---
      builder
        .addCase(thunks.fetchList.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(thunks.fetchList.fulfilled, (state, action: PayloadAction<T[]>) => {
          state.status = 'succeeded';
          // Clear existing keys, then repopulate from action.payload
          Object.keys(state.entities).forEach((key) => {
            delete state.entities[key];
          });
          console.log(action.payload);
          action.payload.forEach((item) => {
            state.entities[item.uuid] = item as Draft<T>;
          });
          state.error = null;
        })
        .addCase(thunks.fetchList.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload || action.error.message || null;
        });

      // --- fetchById ---
      builder
        .addCase(thunks.fetchById.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(thunks.fetchById.fulfilled, (state, action: PayloadAction<T>) => {
          state.status = 'succeeded';
          state.selected = action.payload as Draft<T>;
          state.error = null;
        })
        .addCase(thunks.fetchById.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload || action.error.message || null;
        });

      // --- createItem ---
      builder
        .addCase(thunks.createItem.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(thunks.createItem.fulfilled, (state, action: PayloadAction<T>) => {
          state.status = 'succeeded';
          const newItem = action.payload;
          state.entities[newItem.uuid] = newItem as Draft<T>;
          state.error = null;
        })
        .addCase(thunks.createItem.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload || action.error.message || null;
        });

      // --- updateItem ---
      builder
        .addCase(thunks.updateItem.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(thunks.updateItem.fulfilled, (state, action: PayloadAction<T>) => {
          state.status = 'succeeded';
          const updated = action.payload;
          state.entities[updated.uuid] = updated as Draft<T>;
          state.error = null;
        })
        .addCase(thunks.updateItem.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload || action.error.message || null;
        });

      // --- deleteItem ---
      builder
        .addCase(thunks.deleteItem.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(thunks.deleteItem.fulfilled, (state, action: PayloadAction<string>) => {
          state.status = 'succeeded';
          delete state.entities[action.payload];
          state.error = null;
        })
        .addCase(thunks.deleteItem.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload || action.error.message || null;
        });

      // --- Hook in any resource-specific extraReducers ---
      if (extraReducers) {
        extraReducers(builder);
      }
    },
  });

  return {
    reducer: slice.reducer,
    actions: slice.actions,
    thunks,
  };
}
