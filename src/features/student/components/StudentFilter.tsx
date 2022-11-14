import React from 'react'
import { City, ListParams } from '../../../models'
import { Grid, IconButton, OutlinedInput, TextField, Button } from "@mui/material"
import Box from "@mui/material/Box"

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl } from '@mui/material';
export interface IStudentFilterProps {
    filter?: ListParams,
    onChange: (newFilters: ListParams) => void,
    onSearchChange: (newFilters: ListParams) => void,
    cityList: City[],

}

function StudentFilter({ filter, onChange, onSearchChange, cityList }: IStudentFilterProps) {
    console.log("sort and order:", filter ? `${filter.sort}.${filter?._order}` : "")
    const handleChange = (value: string) => {
        if (!onSearchChange) return;
        const newFilter = {
            ...filter,
            name_like: value,
            _page: 1
        }
        onSearchChange(newFilter);
    }
    const handleFilterChange = (value: string) => {
        if (!onChange) return;
        let newFilter = {
            ...filter,
            city: value ? value : null,
            _page: 1,
        }
        onChange(newFilter);
    }
    const handleSortChange = (value: string) => {
        if (!onChange) return;
        const [_sort, _order] = value.split(".")
        let newFilter: ListParams = {
            ...filter,
            _sort: _sort,
            _order: _order as ("asc" | "desc" | undefined)
        }
        onChange(newFilter);
    }
    const handleClearFilter = () => {
        if (!onChange) return;
        let newFilter: ListParams = {
            ...filter,
            _sort: undefined,
            _order: undefined,
            city: undefined,
            name_like: undefined,
        }
        onChange(newFilter);
    }
    return (
        <Box>
            <Grid container spacing={3} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Grid item xs={12} md={6} lg={3}>
                    <TextField
                        onChange={(e) => handleChange(e.target.value)}
                        label={'Search Keyword'}
                        margin="normal"
                        defaultValue={filter?.["name_like"]}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">

                                <SearchIcon />

                            </InputAdornment>,
                        }} />

                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="filter"
                            fullWidth
                            value={filter?.["city"] || ""}
                            color='info'
                            label="Filter"
                            onChange={(e) => handleFilterChange(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            {
                                cityList.map(city => (
                                    <MenuItem key={`cityFilter_${city.code}`} value={city.code}>{city.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>


                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <FormControl fullWidth>
                        <InputLabel id="sortbyLabel">Sort by</InputLabel>
                        <Select
                            labelId="sortbySelectlabel"
                            id="sortby"
                            fullWidth
                            value={filter ? `${filter._sort}.${filter?._order}` : ""}
                            color='info'
                            label="Sort by"
                            onChange={(e) => handleSortChange(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>No sort</em>
                            </MenuItem>

                            <MenuItem value="name.asc">Name ASC</MenuItem>
                            <MenuItem value="name.desc">Name DSC</MenuItem>
                            <MenuItem value="mark.asc">Mark ASC</MenuItem>
                            <MenuItem value="mark.desc">Mark DSC</MenuItem>
                        </Select>
                    </FormControl>


                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Button variant="outlined" color='primary' fullWidth onClick={() => handleClearFilter()}>
                        Clear Filter
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default StudentFilter