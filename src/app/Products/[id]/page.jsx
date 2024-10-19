"use client";

import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
import Navbar from '@/app/components/Navbar';

// This would typically come from an API or database, but for a static site, we'll keep it here
const products = [
  {
    id: 1,
    name: "L'Oréal Paris Revitalift Cream",
    description: "Anti-wrinkle and firming face cream, 50ml.",
    price: "$25",
    colors: ["White"],
    images: [
      "/assets/image/revitalift-front.png",
      "/assets/image/revitalift-front.png",
    ],
  },
  {
    id: 2,
    name: "Neutrogena Hydro Boost Water Gel",
    description: "Hydrating water gel for dry skin, 50g.",
    price: "$20",
    colors: ["Blue"],
    images: [
      "/assets/image/hydro-boost-front.png",
      "/assets/image/hydro-boost-front.png",
    ],
  },
  {
    id: 3,
    name: "Olay Regenerist Micro-Sculpting Cream",
    description: "Advanced anti-aging moisturizer, 50g.",
    price: "$30",
    colors: ["Red"],
    images: [
      "/assets/image/regenerist-front.png",
      "/assets/image/regenerist-front.png",
    ],
  },
  {
    id: 4,
    name: "Philips Norelco Electric Shaver",
    description: "Wet and dry electric shaver with precision trimmer.",
    price: "$120",
    colors: ["Black"],
    images: [
      "/assets/image/norelco-front.png",
      "/assets/image/norelco-front.png",
    ],
  },
  {
    id: 5,
    name: "Dyson Supersonic Hair Dryer",
    description: "Fast drying, controlled styling, with heat protection.",
    price: "$400",
    colors: ["Iron/Fuchsia"],
    images: [
      "/assets/image/supersonic-front.png",
      "/assets/image/supersonic-front.png",
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