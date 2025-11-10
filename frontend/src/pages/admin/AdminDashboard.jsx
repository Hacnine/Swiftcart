import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  fetchAdminStats, 
  selectAdminStats 
} from '../../store/slices/adminSlice';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import {
  People,
  Store,
  ShoppingCart,
  AttachMoney,
  TrendingUp,
  Category,
} from '@mui/icons-material';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stats = useSelector(selectAdminStats);

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: <People sx={{ fontSize: 40, color: '#BA55D3' }} />,
      color: '#E6CEF5',
      link: '/admin/users',
    },
    {
      title: 'Total Vendors',
      value: stats?.totalVendors || 0,
      icon: <Store sx={{ fontSize: 40, color: '#4CAF50' }} />,
      color: '#C8E6C9',
      link: '/admin/vendors',
    },
    {
      title: 'Total Products',
      value: stats?.totalProducts || 0,
      icon: <Category sx={{ fontSize: 40, color: '#2196F3' }} />,
      color: '#BBDEFB',
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: <ShoppingCart sx={{ fontSize: 40, color: '#FF9800' }} />,
      color: '#FFE0B2',
    },
    {
      title: 'Platform Revenue',
      value: `$${stats?.totalRevenue?.toFixed(2) || '0.00'}`,
      icon: <AttachMoney sx={{ fontSize: 40, color: '#F44336' }} />,
      color: '#FFCDD2',
    },
    {
      title: 'Pending Vendors',
      value: stats?.pendingVendors || 0,
      icon: <TrendingUp sx={{ fontSize: 40, color: '#9C27B0' }} />,
      color: '#F3E5F5',
      link: '/admin/vendors',
    },
  ];

  return (
    <>
      <Header />
      <Box className="wrapper min-h-screen py-10">
        <Box className="mb-8">
          <Typography variant="h4" className="font-bold mb-2">
            Admin Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Platform Management & Analytics
          </Typography>
        </Box>

        <Grid container spacing={3} className="mb-8">
          {statCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  backgroundColor: card.color,
                  boxShadow: 3,
                  cursor: card.link ? 'pointer' : 'default',
                  '&:hover': card.link ? { boxShadow: 6 } : {},
                }}
                onClick={() => card.link && navigate(card.link)}
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
                    onClick={() => navigate('/admin/vendors')}
                  >
                    Manage Vendors
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
                    onClick={() => navigate('/admin/users')}
                  >
                    Manage Users
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
                    onClick={() => navigate('/admin/analytics')}
                  >
                    View Analytics
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
                  {stats?.pendingVendors > 0 && (
                    <Box className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
                      <Typography variant="body2" className="font-semibold">
                        {stats.pendingVendors} vendor(s) awaiting approval
                      </Typography>
                      <Button 
                        size="small" 
                        sx={{ mt: 1, color: '#BA55D3' }}
                        onClick={() => navigate('/admin/vendors')}
                      >
                        Review Now
                      </Button>
                    </Box>
                  )}
                  <Box className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                    <Typography variant="body2" className="font-semibold">
                      Platform Health: Good
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      All systems operational
                    </Typography>
                  </Box>
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

export default AdminDashboard;
