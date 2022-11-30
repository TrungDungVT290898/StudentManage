import React from 'react';
import { City, ListParams } from '../../../models';
import { Grid, Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';




import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export interface StudentFilterProps {
  filter?: ListParams;
  onChange: (newFilters: ListParams) => void;
  onSearchChange: (value: string) => void;
  cityList: City[];
}

function StudentFilter({ filter, onChange, onSearchChange, cityList }: StudentFilterProps) {
  const handleSearchKeywordChange = (value: string) => {
    if (!onSearchChange) return;

    onSearchChange(value);
  };
  const handleFilterChange = (value: string) => {
    if (!onChange) return;
    const newFilter = {
      ...filter,
      city: value ? value : null,
      _page: 1,
    };
    onChange(newFilter);
  };
  const handleSortChange = (value: string) => {
    if (!onChange) return;
    const [_sort, _order] = value.split('.');
    const newFilter: ListParams = {
      ...filter,
      _sort: _sort,
      _order: _order as 'asc' | 'desc' | undefined,
    };
    onChange(newFilter);
  };
  const handleClearFilter = () => {
    if (!onChange) return;
    const newFilter: ListParams = {
      ...filter,
      _sort: undefined,
      _order: undefined,
      city: undefined,
      name_like: undefined,
    };
    onChange(newFilter);
  };
  return (
    <Box>
      <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            onChange={e => handleSearchKeywordChange(e.target.value)}
            label={'Search Keyword'}
            margin="normal"
            defaultValue={(filter?.['name_like'] as string) ? filter?.['name_like'].replace('+', ' ') : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <div >
            <h4 className='text-slate-400 text-sm'>Filter By City</h4>
            <select
              id="filter"
              value={filter?.['city'] || ''}
              className='border-purple-600 border-2 rounded-lg min-w-full min-h-full  border-solid'
              onChange={e => { e.preventDefault(); handleFilterChange(e.target.value); }}
            >
              <option value=''>
                <em>All</em>
              </option>
              {cityList?.map(city => (
                <option key={`cityFilter_${city.code}`} value={city.code}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>


        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <div>
            <h1 className='text-slate-400 text-sm'>Filter By Name,Mark</h1>
            <select

              id="sortby"
              className='border-purple-600 border-2 rounded-lg min-w-full  border-solid'
              value={filter ? `${filter._sort}.${filter?._order}` : ''}
              onChange={e => handleSortChange(e.target.value)}
            >
              <option value=''>
                <em>No sort</em>
              </option>

              <option value="name.asc">Name ASC</option>
              <option value="name.desc">Name DSC</option>
              <option value="mark.asc">Mark ASC</option>
              <option value="mark.desc">Mark DSC</option>
            </select>
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Button variant="outlined" color="primary" fullWidth onClick={() => handleClearFilter()}>
            Clear Filter
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StudentFilter;
