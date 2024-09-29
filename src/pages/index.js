import React from "react";
import Dashboard from "../components/Dashboard";
import Image from "next/image";
import { Box, Grid, Typography, Paper } from '@mui/material';

const Home = () => {
  const logos = [
    { src: '/avw-logo.png', alt: 'AVW', height: 55, width: 60 },
    { src: '/laguna_logo-1.png', alt: 'Laguna', height: 80, width: 120 },
    { src: '/sonnys-logo.webp', alt: 'Sonny\'s', height: 80, width: 120 },
    { src: '/macneil-logo.png', alt: 'MacNeil', height: 80, width: 120 },
    { src: '/tommys-logo.png', alt: 'Tommy\'s', height: 80, width: 120 },
    { src: '/mcww-logo.webp', alt: 'MCWW', height: 80, width: 100 },
    { src: '/belanger-logo.png', alt: 'Belanger', height: 80, width: 120 },
    { src: '/gardner-denver-logo.png', alt: 'Gardner Denver', height: 80, width: 120 },
    { src: '/fs-curtis-logo.png', alt: 'FS Curtis', height: 80, width: 120 },
    { src: '/drb-logo.svg', alt: 'DRB', height: 80, width: 60 },
  ];

  return (
    <Dashboard>
      {/* Background Image Section */}
      <Box
        sx={{
          backgroundImage: 'url("/bright.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '260px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
          border: '1px solid #e0e0e0',
          py: 5,
          px: 4
        }}
      >
        <Box textAlign="center">
          <Typography
            variant="h3"
            color="white"
            fontWeight="bold"
            sx={{ textTransform: 'uppercase' }}
          >
            Splash Service
          </Typography>
          <Typography variant="body1" color="gray.300">
            Equipment Documentation and Resources
          </Typography>
        </Box>
      </Box>

      {/* Logo Grid Section */}
      <Box py={10} mx={4}>
        <p className="text-center text-gray-400 mb-4">
          Search by Brand Name
        </p>
        <Grid container spacing={3} justifyContent="center">
          {logos.map((logo, index) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100px',
                  p: 2,
                  backgroundColor: 'grey.100',
                  borderRadius: 2,
                }}
              >
                <Image src={logo.src} alt={logo.alt} height={logo.height} width={logo.width} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Dashboard>
  );
};

export default Home;
