import { CATEGORY, PIECES, PRICE, RECOMMENDED_AGE } from '@constants';
import { ApiController } from '@controllers';
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
import { useEffect, useState } from 'react';
import { Form, useNavigate, useNavigation, useParams, useSearchParams } from 'react-router';

const controller = ApiController.getInstance();

const categories = await controller.getCategories();

export const ProductFilter: React.FC = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { categorySlug } = useParams();

  const [price, setPrice] = useState<number[]>([PRICE.MIN, PRICE.MAX]);
  const [pieces, setPieces] = useState<number[]>([PIECES.MIN, PIECES.MAX]);
  const [ages, setAges] = useState<Record<string, boolean>>({});

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
    const newCategory = event.target.value;
    void navigate(`/${UrlPath.CATALOG}/${newCategory}?${searchParams.toString()}`);
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

    void navigate(`/${UrlPath.CATALOG}/all`);
  };

  return (
    <Box minWidth={{ sm: '200px', lg: '250px' }} width={{ sm: '200px', lg: '250px' }}>
      <Form
        action={categorySlug ? `/${UrlPath.CATALOG}/${categorySlug}` : `/${UrlPath.CATALOG_ALL}`}
      >
        <Grid container justifyContent="space-between">
          <Grid size={{ xs: 5.8, sm: 12 }}>
            <Typography variant="h4" fontSize={{ xs: '1rem', sm: '1.25rem' }} gutterBottom>
              Categories
            </Typography>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <TextField
                select
                id="category"
                name="category"
                value={categorySlug ?? CATEGORY.ALL}
                onChange={handleChangeCategory}
                disabled={isLoading}
              >
                <MenuItem value={CATEGORY.ALL}>All Lego Sets</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.slug['en-US']}>
                    {category.name['en-US']}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 5.8, sm: 12 }}>
            <Typography variant="h4" fontSize={{ xs: '1rem', sm: '1.25rem' }} gutterBottom>
              Search and Filters
            </Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <TextField
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
