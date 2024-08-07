import { IconButton, FormControl, Input, Stack, Typography, inputClasses } from '@mui/joy';
import React, { useEffect } from 'react';
import {
  Form,
  LoaderFunctionArgs,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { getGlobalClient } from '../api';
import Treatment from '../models/TreatmentModel';
import Treatments from '../components/Treatments';
import ContentWrapper from '../components/ContentWrapper';

export async function loader({ request }: LoaderFunctionArgs) {
  const client = getGlobalClient();
  const url = new URL(request.url);
  const q = url.searchParams.get('q') || '';

  let treatments;
  if (typeof q === 'string' && q !== '') {
    treatments = await client.searchTreatments(q);
  }

  return { treatments, q };
}
type LoaderData = {
  treatments: Treatment[];
  q: string;
};
const Search = () => {
  const { treatments, q } = useLoaderData() as LoaderData;
  const [, setSearchParams] = useSearchParams();

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();
  const submit = useSubmit();

  useEffect(() => {
    let doc = document.getElementById('q') as HTMLInputElement;
    if (doc !== null) {
      doc.value = q;
    }
  }, [q]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      submit(`q=${event.target.value}`);
    }, 1000);
  };

  const clearSearch = () => {
    setSearchParams('');

    if (inputRef.current !== null) {
      inputRef.current.value = '';
    }
  };

  return (
    <ContentWrapper title='Search'>
      <Form id='search-form' role='search'>
        <Stack
          sx={{
            [`& .${inputClasses.root}`]: {
              '--Input-focusedThickness': '1px',
            },
            [`& .${inputClasses.input}`]: {
              width: '100%',
            },
          }}
        >
          <FormControl>
            <Input
              size='lg'
              slotProps={{
                input: {
                  id: 'q',
                  ref: inputRef,
                },
              }}
              defaultValue={q}
              onChange={handleChange}
              startDecorator={<SearchIcon />}
              endDecorator={
                <IconButton
                  aria-label='Clear'
                  variant='plain'
                  color='neutral'
                  type='button'
                  sx={{ borderRadius: '8px' }}
                  onClick={clearSearch}
                >
                  <CancelIcon />
                </IconButton>
              }
            />
          </FormControl>
        </Stack>
      </Form>
      {treatments && <Treatments treatments={treatments} />}
    </ContentWrapper>
  );
};

export default Search;
