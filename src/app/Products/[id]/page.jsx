"use client";

import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/navbar';
import Footer from '../../components/Footer';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { CartContext } from '../../../context/CartContext';
import { 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Grid, 
  Paper, 
  Chip
} from '@mui/material';
import { Icon } from '@iconify/react';

// This would typically come from an API or database, but for a static site, we'll keep it here
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
  {
    id:6,
    name: "Fitbit Charge 5",
    description: "Fitness tracker with built-in GPS, heart rate monitor, sleep tracking.",
    price: "$179",
    colors: ["Black", "Lunar White", "Steel Blue"],
    images: [
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/fitbit-charge5-front.svg",
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/fitbit-charge5-back.svg",
    ],
  },
];

export default function ProductPage({ params }) {
  const router = useRouter();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    const productId = parseInt(params.id);
    const foundProduct = products.find((p) => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedColor(foundProduct.colors[0]);
    } else {
      router.push('/404');
    }
  }, [params.id, router]);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  const handleAddToBag = () => {
    addToCart({ ...product, selectedColor });
    router.push('/checkout');
  };

  return (
    <>
      <Navbar />
      <Box 
        sx={{ 
          background: 'linear-gradient(180deg, #e1c7b3 0%, #FCF9F7 50%, #FFFFFF 100%)',
          minHeight: '100vh', 
          pt: 10
        }}
      >
        <Box maxWidth="lg" mx="auto" p={4}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2, borderRadius: 2, overflow: 'hidden' }}>
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={500}
                  height={500}
                  layout="responsive"
                  objectFit="cover"
                />
              </Paper>
              <Box mt={2} display="flex" justifyContent="center" gap={2}>
                {product.images.slice(1).map((image, index) => (
                  <Paper 
                    key={index} 
                    elevation={2} 
                    sx={{ 
                      width: 80, 
                      height: 80, 
                      cursor: 'pointer',
                      '&:hover': { transform: 'scale(1.05)' },
                      transition: 'transform 0.3s'
                    }}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} thumbnail ${index + 2}`}
                      width={80}
                      height={80}
                      objectFit="cover"
                    />
                  </Paper>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom>{product.name}</Typography>
              <Typography variant="h4" color="primary" gutterBottom>{product.price}</Typography>
              <Typography variant="body1" paragraph>{product.description}</Typography>
              
              <Box my={3}>
                <Typography variant="subtitle1" gutterBottom>Color:</Typography>
                <Box display="flex" gap={1}>
                  {product.colors.map((color) => (
                    <Chip
                      key={color}
                      label={color}
                      onClick={() => setSelectedColor(color)}
                      variant={selectedColor === color ? "filled" : "outlined"}
                      sx={{ 
                        bgcolor: selectedColor === color ? '#b57d56' : 'transparent',
                        color: selectedColor === color ? 'white' : 'inherit',
                        '&:hover': { bgcolor: '#a5673f' }
                      }}
                    />
                  ))}
                </Box>
              </Box>
              
              <Box display="flex" gap={2} mt={4}>
                <Button
                  variant="contained"
                  startIcon={<ShoppingBag />}
                  onClick={handleAddToBag}
                  sx={{ 
                    bgcolor: '#b57d56', 
                    '&:hover': { bgcolor: '#a5673f' },
                    flex: 1
                  }}
                >
                  Add to bag
                </Button>
                <IconButton 
                  aria-label="add to favorites"
                  sx={{ 
                    border: '1px solid #b57d56', 
                    '&:hover': { bgcolor: '#FCF9F7' } 
                  }}
                >
                  <Icon icon="ic:twotone-favorite" />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer />
    </>
  );
}