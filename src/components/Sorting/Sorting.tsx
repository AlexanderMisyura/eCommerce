import { SORT_OPTIONS } from '@constants';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

export const Sorting: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const handleChange = (event: SelectChangeEvent<string>): void => {
    const newSearchParams = new URLSearchParams(searchParams);
    const newSortingValue = event.target.value;

    if (newSortingValue === '') {
      newSearchParams.delete('sort');
    } else {
      newSearchParams.set('sort', newSortingValue);
    }

    void navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <FormControl>
      <Typography>Sort by:</Typography>
      <Select value={searchParams.get('sort') ?? ''} onChange={handleChange}>
        <MenuItem value={SORT_OPTIONS.DEFAULT}>Default Order</MenuItem>
        <MenuItem value={SORT_OPTIONS.PRICE_ASC}>Price: Low to High</MenuItem>
        <MenuItem value={SORT_OPTIONS.PRICE_DESC}>Price: High to Low</MenuItem>
        <MenuItem value={SORT_OPTIONS.NAME_ASC}>Name: A-Z</MenuItem>
        <MenuItem value={SORT_OPTIONS.NAME_DESC}>Name: Z-A</MenuItem>
      </Select>
    </FormControl>
  );
};
