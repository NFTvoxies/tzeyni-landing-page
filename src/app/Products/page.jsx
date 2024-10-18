'use client'
import Head from "next/head";
import Navbar from "../components/navbar";
import ProducstList from "../components/ProductsList";
import ProductFilter from "../components/ProductFilter";
import Footer from "../components/Footer";
import Link from "next/link";
import { 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button,
  Chip,
  Container,
  TextField,
  InputAdornment
} from '@mui/material';
import { useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";

const products = [
  {
    id:1,
    name: "Apple iMac 27\"",
    description: "Apple M3 Octa Core, 27-inch Retina 5K display, RAM 8GB, SSD 256GB.",
    price: "$1,799",
    colors: ["Silver", "Space Gray"],
    images: [
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg",
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-back.svg",
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-side.svg",
    ],
  },
  {
    id:2,
    name: "Samsung Galaxy S21",
    description: "6.2-inch display, 128GB storage, triple camera setup, 4000mAh battery.",
    price: "$799",
    colors: ["Phantom Gray", "Phantom White", "Phantom Violet"],
    images: [
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/samsung-s21-front.svg",
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/samsung-s21-back.svg",
    ],
  },
  {
    id:3,
    name: "Sony WH-1000XM4 Headphones",
    description: "Industry-leading noise cancellation, up to 30 hours of battery life, touch sensor controls.",
    price: "$348",
    colors: ["Black", "Silver"],
    images: [
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/sony-headphones.svg",
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/sony-headphones-angle.svg",
    ],
  },
  {
    id:4,
    name: "Apple MacBook Pro 14\"",
    description: "Apple M1 Pro chip, 16GB RAM, 512GB SSD, Liquid Retina XDR display.",
    price: "$1,999",
    colors: ["Silver", "Space Gray"],
    images: [
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/macbook-pro-front.svg",
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/macbook-pro-side.svg",
    ],
  },
  {
    id:5,
    name: "Nikon D5600 Camera",
    description: "24.2MP DSLR, Full HD video recording, 3.2-inch touchscreen, built-in Wi-Fi.",
    price: "$699",
    colors: ["Black"],
    images: [
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/nikon-camera.svg",
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/nikon-camera-side.svg",
    ],
  },
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(term) || 
      product.description.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };


return (
  <>
    <Head>
      <title>TZEYNI | Products</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="UTF-8" />
    </Head>
    <Navbar />
    <Box 
      sx={{ 
        background: 'linear-gradient(180deg, #e1c7b3 0%, #FCF9F7 50%, #FFFFFF 100%)',
        minHeight: '100vh', 
        pt: 10,
        pb: 6
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Typography variant="h2" component="h1" gutterBottom>
            Nos Produits
          </Typography>
          <Box 
            width={40} 
            height={4} 
            bgcolor="primary.main" 
            mx="auto" 
            mb={3} 
            borderRadius={2}
          />
          <Typography variant="h5" color="text.secondary" paragraph>
            Découvrez notre sélection de produits de beauté et de bien-être
          </Typography>
        </Box>

        <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
          <TextField
            variant="outlined"
            placeholder="Rechercher des produits..."
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="bi:search" color="#b57d56" />
                </InputAdornment>
              ),
            }}
            sx={{ width: 300 }}
          />
          <Button 
            variant="outlined" 
            startIcon={<Icon icon="bi-filter" />}
            sx={{ borderColor: '#b57d56', color: '#b57d56' }}
          >
            Filtrer
          </Button>
        </Box>

        <Grid container spacing={4}>
          {filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card 
                elevation={3}
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.03)' }
                }}
              >
                <CardMedia
                  component="div"
                  sx={{ pt: '75%', position: 'relative' }}
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {product.description}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" color="primary">
                      {product.price}
                    </Typography>
                    <Box>
                      {product.colors.map((color) => (
                        <Chip 
                          key={color} 
                          label={color} 
                          size="small" 
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
                <Box p={2}>
                  <Button 
                    component={Link}
                    href={`/Products/${product.id}`}
                    variant="contained" 
                    fullWidth
                    sx={{ 
                      bgcolor: '#b57d56', 
                      '&:hover': { bgcolor: '#a5673f' }
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
    <Footer />
  </>
);
}