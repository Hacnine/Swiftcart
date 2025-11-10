import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  fetchVendorStats, 
  selectVendorStats,
  selectVendorProfile 
} from '../../store/slices/vendorSlice';
import { selectUser } from '../../store/slices/authSlice';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button 
} from '@mui/material';
import { 
  TrendingUp, 
  ShoppingCart, 
  AttachMoney, 
  Inventory 
} from '@mui/icons-material';

const VendorDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const stats = useSelector(selectVendorStats);
  const profile = useSelector(selectVendorProfile);

  useEffect(() => {
    dispatch(fetchVendorStats());
  }, [dispatch]);

  const statCards = [
    {
      title: 'Total Products',
      value: stats?.totalProducts || 0,
      icon: <Inventory sx={{ fontSize: 40, color: '#BA55D3' }} />,
      color: '#E6CEF5',
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: <ShoppingCart sx={{ fontSize: 40, color: '#4CAF50' }} />,
      color: '#C8E6C9',
    },
    {
      title: 'Total Revenue',
      value: `$${stats?.totalRevenue?.toFixed(2) || '0.00'}`,
      icon: <AttachMoney sx={{ fontSize: 40, color: '#FF9800' }} />,
      color: '#FFE0B2',
    },
    {
      title: 'Avg Rating',
      value: stats?.averageRating?.toFixed(1) || '0.0',
      icon: <TrendingUp sx={{ fontSize: 40, color: '#2196F3' }} />,
      color: '#BBDEFB',
    },
  ];

  return (
    <>
      <Header />
      <Box className="wrapper min-h-screen py-10">
        <Box className="mb-8">
          <Typography variant="h4" className="font-bold mb-2">
            Vendor Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back, {user?.name || 'Vendor'}!
          </Typography>
          {profile && profile.status === 'PENDING' && (
            <Box className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-4">
              <Typography>
                Your vendor account is pending approval. You'll be notified once approved.
              </Typography>
            </Box>
          )}
        </Box>

        <Grid container spacing={3} className="mb-8">
          {statCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  backgroundColor: card.color,
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Box className="flex justify-between items-start">
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {card.title}
                      </Typography>
                      <Typography variant="h4" className="font-bold">
                        {card.value}
                      </Typography>
                    </Box>
                    {card.icon}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" className="font-bold mb-4">
                  Quick Actions
                </Typography>
                <Box className="space-y-3">
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ 
                      bgcolor: '#BA55D3', 
                      '&:hover': { bgcolor: '#9932CC' },
                      py: 1.5,
                    }}
                    onClick={() => navigate('/vendor/products/new')}
                  >
                    Add New Product
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{ 
                      borderColor: '#BA55D3', 
                      color: '#BA55D3',
                      '&:hover': { borderColor: '#9932CC', bgcolor: '#F3E5F5' },
                      py: 1.5,
                    }}
                    onClick={() => navigate('/vendor/products')}
                  >
                    Manage Products
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{ 
                      borderColor: '#BA55D3', 
                      color: '#BA55D3',
                      '&:hover': { borderColor: '#9932CC', bgcolor: '#F3E5F5' },
                      py: 1.5,
                    }}
                    onClick={() => navigate('/vendor/orders')}
                  >
                    View Orders
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" className="font-bold mb-4">
                  Recent Activity
                </Typography>
                <Box className="space-y-3">
                  {stats?.recentOrders?.slice(0, 5).map((order, index) => (
                    <Box 
                      key={index} 
                      className="flex justify-between items-center p-3 bg-gray-50 rounded"
                    >
                      <Box>
                        <Typography variant="body2" className="font-semibold">
                          Order #{order.id?.slice(0, 8)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Typography 
                        variant="body2" 
                        className="font-bold"
                        sx={{ color: '#BA55D3' }}
                      >
                        ${order.total?.toFixed(2)}
                      </Typography>
                    </Box>
                  )) || (
                    <Typography variant="body2" color="text.secondary">
                      No recent orders
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default VendorDashboard;
