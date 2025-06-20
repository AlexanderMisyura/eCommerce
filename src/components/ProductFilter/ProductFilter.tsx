import type { Category } from '@commercetools/platform-sdk';
import {
  CATEGORY,
  CATEGORY_SLUG_PRETTY_NAME_MAP,
  PIECES,
  PRICE,
  RECOMMENDED_AGE,
  SORT_OPTIONS,
} from '@constants';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMediaQuery, useTheme } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { UrlPath } from '@ts-enums';
import { useEffect, useRef, useState } from 'react';
import {
  Form,
  useNavigate,
  useNavigation,
  useParams,
  useRouteLoaderData,
  useSearchParams,
} from 'react-router';

export const ProductFilter: React.FC = () => {
  const categories = useRouteLoaderData<Category[]>('catalog');

  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryPath = useParams()['*'] ?? CATEGORY.ALL;

  const [price, setPrice] = useState<number[]>([PRICE.MIN, PRICE.MAX]);
  const [pieces, setPieces] = useState<number[]>([PIECES.MIN, PIECES.MAX]);
  const [ages, setAges] = useState<Record<string, boolean>>({});

  const searchReference = useRef<HTMLInputElement>(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  let checkboxSize: 'small' | 'medium' | 'large';
  if (isSmallScreen) {
    checkboxSize = 'medium';
  } else if (isLargeScreen) {
    checkboxSize = 'medium';
  } else {
    checkboxSize = 'small';
  }

  useEffect(() => {
    setPrice([
      Number(searchParams.get('minPrice')) || PRICE.MIN,
      Number(searchParams.get('maxPrice')) || PRICE.MAX,
    ]);
    setPieces([
      Number(searchParams.get('minPieces')) || PIECES.MIN,
      Number(searchParams.get('maxPieces')) || PIECES.MAX,
    ]);

    const ageInitial: Record<string, boolean> = {};
    RECOMMENDED_AGE.forEach((age) => {
      ageInitial[age] = searchParams.getAll('age').includes(age);
    });
    setAges(ageInitial);
  }, [searchParams]);

  const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCategoryPath = event.target.value;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('page');
    void navigate(`/${UrlPath.CATALOG}/${newCategoryPath}?${newSearchParams.toString()}`);
  };

  const handleAgeChange = (age: string) => {
    setAges((previousAge) => ({
      ...previousAge,
      [age]: !previousAge[age],
    }));
  };

  const handleReset = () => {
    setPrice([PRICE.MIN, PRICE.MAX]);
    setPieces([PIECES.MIN, PIECES.MAX]);
    setAges({});
    if (searchReference.current) {
      searchReference.current.value = '';
    }

    void navigate(`/${UrlPath.CATALOG}/all`);
  };

  return (
    <Box minWidth={{ sm: '200px', lg: '250px' }} width={{ sm: '200px', lg: '250px' }}>
      <Form
        action={categoryPath ? `/${UrlPath.CATALOG}/${categoryPath}` : `/${UrlPath.CATALOG_ALL}`}
      >
        <input type="hidden" name="sort" value={searchParams.get('sort') ?? SORT_OPTIONS.DEFAULT} />
        <Grid container justifyContent="space-between">
          <Grid size={{ xs: 5.8, sm: 12 }}>
            <Typography variant="h4" fontSize={{ xs: '1rem', sm: '1.25rem' }} gutterBottom>
              Categories
            </Typography>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <TextField
                select
                id="category"
                value={categoryPath}
                onChange={handleChangeCategory}
                disabled={isLoading}
              >
                <MenuItem sx={{ fontSize: '1.25rem' }} value={CATEGORY.ALL}>
                  All Lego Sets
                </MenuItem>
                {categories
                  ?.filter((category) => !category.parent)
                  .map((category) => {
                    return [
                      <MenuItem sx={{ pl: 6 }} key={category.id} value={category.slug['en-US']}>
                        {CATEGORY_SLUG_PRETTY_NAME_MAP[category.slug['en-US']]}
                      </MenuItem>,

                      ...categories
                        .filter((subCategory) => subCategory.parent?.id === category.id)
                        .map((subCategory) => {
                          return (
                            <MenuItem
                              key={subCategory.id}
                              value={`${category.slug['en-US']}/${subCategory.slug['en-US']}`}
                              sx={{ pl: 8, fontSize: '0.9rem' }}
                            >
                              {`${CATEGORY_SLUG_PRETTY_NAME_MAP[category.slug['en-US']]} > ${CATEGORY_SLUG_PRETTY_NAME_MAP[subCategory.slug['en-US']]}`}
                            </MenuItem>
                          );
                        }),
                    ];
                  })}
              </TextField>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 5.8, sm: 12 }}>
            <Typography variant="h4" fontSize={{ xs: '1rem', sm: '1.25rem' }} gutterBottom>
              Search and Filters
            </Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <TextField
                inputRef={searchReference}
                type="search"
                id="search-query"
                name="q"
                label="Find your Lego Set"
                variant="outlined"
                defaultValue={searchParams.get('q') ?? ''}
                disabled={isLoading}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container columnGap={2} justifyContent="space-around">
          <Grid size={{ xs: 5, sm: 11 }}>
            <Typography gutterBottom>Price Range ($)</Typography>
            <input type="hidden" name="minPrice" value={price[0]} />
            <input type="hidden" name="maxPrice" value={price[1]} />
            <Slider
              value={price}
              valueLabelDisplay="auto"
              min={PRICE.MIN}
              max={PRICE.MAX}
              onChange={(_, newValue) => setPrice(newValue)}
              step={PRICE.STEP}
              sx={{ mb: 4, maxWidth: '300px' }}
              disabled={isLoading}
            />
          </Grid>
          <Grid size={{ xs: 5, sm: 11 }}>
            <Typography gutterBottom>Number of Pieces</Typography>
            <input type="hidden" name="minPieces" value={pieces[0]} />
            <input type="hidden" name="maxPieces" value={pieces[1]} />
            <Slider
              value={pieces}
              valueLabelDisplay="auto"
              min={PIECES.MIN}
              max={PIECES.MAX}
              onChange={(_, newValue) => setPieces(newValue)}
              step={PIECES.STEP}
              sx={{ mb: 4, maxWidth: '300px' }}
              disabled={isLoading}
            />
          </Grid>
        </Grid>

        <Accordion sx={{ maxWidth: '350px', placeSelf: 'center' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography component="span">Recommended Age</Typography>
          </AccordionSummary>
          <FormGroup>
            <Grid
              container
              padding={{ xs: '16px', sm: '10px', lg: '16px' }}
              paddingTop={{ xs: 0, sm: 0, md: 0, lg: 0 }}
              paddingLeft={{ xs: '10%', sm: '10%', lg: '10%' }}
            >
              {RECOMMENDED_AGE.map((age) => (
                <Grid size={{ xs: 3, sm: 4 }} key={age}>
                  <FormControlLabel
                    name="age"
                    value={age}
                    control={
                      <Checkbox
                        checked={ages[age] ?? false}
                        size={checkboxSize}
                        onChange={() => handleAgeChange(age)}
                        sx={{ mr: -1 }}
                      />
                    }
                    label={age}
                    disabled={isLoading}
                  />
                </Grid>
              ))}
            </Grid>
          </FormGroup>
        </Accordion>

        <Box marginTop={6} display="flex" gap={6}>
          <Button
            fullWidth
            type="button"
            variant="outlined"
            color="error"
            onClick={handleReset}
            loading={isLoading}
            loadingPosition="start"
          >
            Reset
          </Button>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            loading={isLoading}
            loadingPosition="start"
          >
            Apply
          </Button>
        </Box>
      </Form>
    </Box>
  );
};
