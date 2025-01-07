'use client';
import React from 'react';
import Image from 'next/image';
import { Box, Button, Card, CardActions, CardContent, Grid2, TextField } from '@mui/material';
import Loading from '@/components/Loading';
import { imageWithBasePath } from '@/lib/utils/redirect';
import { useAuth } from '@/hooks/auth/useAuth';

interface Props {}

const Login: React.FC<Props> = ({}) => {
    const { submitting, errors, register, handleSubmit, submitForm } = useAuth();

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: '100vh' }}>
                <Grid2 container spacing={2} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Grid2
                        size={12}
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        sx={{ width: { xs: '90%', sm: '30%' } }}
                    >
                        <Card
                            sx={{ p: '8px', width: '100%', textAlign: 'center', borderRadius: '16px' }}
                            style={{ boxShadow: '1px 1px 5px 3px #cbd5e1' }}
                        >
                            <CardContent sx={{ mt: 0 }}>
                                <Grid2 size={12}>
                                    <Image
                                        src={imageWithBasePath('/assets/images/logo.webp')}
                                        alt='Logo'
                                        width={150}
                                        height={150}
                                        priority
                                        style={{ width: '200px', height: '200px' }}
                                    />
                                </Grid2>
                                <Grid2 size={12} marginBottom={4}>
                                    <TextField
                                        size='small'
                                        fullWidth
                                        label='Email'
                                        type='email'
                                        variant='outlined'
                                        {...register('email')}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                        placeholder='Email'
                                    />
                                </Grid2>
                                <Grid2 size={12}>
                                    <TextField
                                        size='small'
                                        fullWidth
                                        type='password'
                                        label='Contraseña'
                                        {...register('password')}
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                    />
                                </Grid2>
                            </CardContent>

                            <CardActions
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginBottom: 3,
                                    marginTop: 1,
                                    flexDirection: 'column'
                                }}
                            >
                                <Button
                                    type='submit'
                                    color='primary'
                                    variant='contained'
                                    size='large'
                                    sx={{ mb: 2, height: '44px' }}
                                    fullWidth
                                    disabled={submitting}
                                >
                                    {submitting ? <Loading /> : 'Iniciar Sesion'}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid2>
                </Grid2>
            </Box>
        </form>
    );
};

export default Login;
