import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import axios from 'axios';
import useGeoLocation from 'react-ipgeolocation';
import jwt from 'jwt-decode';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material

import {
  Link,
  Stack,
  Typography,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { apiLink } from '../../../config';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  // const [data, setData] = useState({ amount: 0, no_of_months: 0, total_return_amount: 0 });
  // const [percentage, setPercentage] = useState(0);

  const LoanSchema = Yup.object().shape({
    amount: Yup.number().required('Amount is required'),
    no_of_months: Yup.number().required('No of months is required'),
  });

  const formik = useFormik({
    initialValues: {
      amount: 1000,
      interest: 10,
      no_of_months: 12,
      total_return_amount: 0.0,
      monthly_interest: 0.0,
    },
    validationSchema: LoanSchema,
    onSubmit: async () => {
      values.total_return_amount = (values.amount / values.no_of_months + 10).toFixed(2);

      values.monthly_interest = ((values.amount * (10 * 0.01)) / values.no_of_months).toFixed(2);
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            type="number"
            label="Required Amount"
            {...getFieldProps('amount')}
            error={Boolean(touched.amount && errors.amount)}
            helperText={touched.amount && errors.amount}
          />
          <TextField
            fullWidth
            type="number"
            {...getFieldProps('no_of_months')}
            label="No of months"
            error={Boolean(touched.no_of_months && errors.no_of_months)}
            helperText={touched.no_of_months && errors.no_of_months}
          />
          <Typography gutterBottom>Interest rate : 10%</Typography>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ my: 2 }}>
          Calculate
        </LoadingButton>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <TextField
            sx={{ mx: 1 }}
            mb-5
            fullWidth
            type="number"
            {...getFieldProps('total_return_amount')}
            label="Total interest"
            helperText={touched.total_return_amount && errors.total_return_amount}
          />
          <TextField
            sx={{ mx: 2 }}
            mb-5
            fullWidth
            type="number"
            {...getFieldProps('monthly_interest')}
            label="Monthly interest"
            helperText={touched.monthly_interest && errors.monthly_interest}
          />
        </Stack>
      </Form>
    </FormikProvider>
  );
}
