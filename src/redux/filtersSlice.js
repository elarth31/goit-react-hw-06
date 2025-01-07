import { createSlice } from '@reduxjs/toolkit';

const searchFilterSlice = createSlice({
	name: 'filters',
	initialState: {
		name: '',
	},
	reducers: {
		setSearchTerm(state, action) {
			state.name = action.payload;
		},
	},
});

export const { setSearchTerm } = searchFilterSlice.actions;

export const filtersReducer = searchFilterSlice.reducer;

export const selectNameFilter = (store) => store.filters.name;
