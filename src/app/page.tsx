'use client';

import { LoadingButton } from '@mui/lab';
import { TextField, Alert, Snackbar } from '@mui/material';
import { useState } from 'react';

const URL = 'http://localhost:4000/login';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    status: null,
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());

    setEmail('');
    setPassword('');

    setAlert({
      open: true,
      status: data.status,
      message: data.msg,
    });

    setLoading(false);
  };

  const closeAlert = () => {
    setAlert({
      open: false,
      status: null,
      message: '',
    });
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-center container mx-auto'>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={closeAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={closeAlert}
          severity={alert.status ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
      <h1 className='text-4xl font-bold'>Capco Interview Test</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='email'
          type='email'
          name='email'
          label='Email'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='password'
          name='password'
          label='Password'
          type='password'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <LoadingButton
          loading={loading}
          loadingIndicator='Loading...'
          type='submit'
          fullWidth
          variant='outlined'
          color='primary'
        >
          Sign In
        </LoadingButton>
      </form>
    </main>
  );
}
