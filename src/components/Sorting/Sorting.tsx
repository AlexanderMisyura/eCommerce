import { SORT_OPTIONS } from '@constants';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

export const Sorting: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newSearchParams = new URLSearchParams(searchParams);
    const newSortingValue = event.target.value;

    if (newSortingValue === SORT_OPTIONS.DEFAULT) {
      newSearchParams.delete('sort');
    } else {
      newSearchParams.set('sort', newSortingValue);
    }

    void navigate(`${location.pathname}?${newSearchParams.toString()}`);
  };

  return (
    <FormControl>
      <TextField
        select
        size="small"
        label="Sort by:"
        value={searchParams.get('sort') ?? SORT_OPTIONS.DEFAULT}
        onChange={handleChange}
      >
        <MenuItem value={SORT_OPTIONS.DEFAULT}>Default Order</MenuItem>
        <MenuItem value={SORT_OPTIONS.PRICE_ASC}>Price: Low to High</MenuItem>
        <MenuItem value={SORT_OPTIONS.PRICE_DESC}>Price: High to Low</MenuItem>
        <MenuItem value={SORT_OPTIONS.NAME_ASC}>Name: A-Z</MenuItem>
        <MenuItem value={SORT_OPTIONS.NAME_DESC}>Name: Z-A</MenuItem>
      </TextField>
    </FormControl>
  );
};
