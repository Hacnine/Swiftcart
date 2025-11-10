import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  fetchVendorOrders,
  updateOrderStatus,
  selectVendorOrders 
} from '../../store/slices/vendorSlice';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  MenuItem,
  Select,
  FormControl,
} from '@mui/material';

const VendorOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector(selectVendorOrders);

  useEffect(() => {
    dispatch(fetchVendorOrders());
  }, [dispatch]);

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'warning',
      CONFIRMED: 'info',
      PROCESSING: 'primary',
      SHIPPED: 'secondary',
      DELIVERED: 'success',
      CANCELLED: 'error',
    };
    return colors[status] || 'default';
  };

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ 
      orderId, 
      statusData: { status: newStatus } 
    }));
  };

  return (
    <>
      <Header />
      <Box className="wrapper min-h-screen py-10">
        <Box className="mb-6 flex justify-between items-center">
          <Typography variant="h4" className="font-bold">
            Orders Management
          </Typography>
          <Button
            variant="outlined"
            sx={{ borderColor: '#BA55D3', color: '#BA55D3' }}
            onClick={() => navigate('/vendor/dashboard')}
          >
            Back to Dashboard
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ bgcolor: '#F3E5F5' }}>
              <TableRow>
                <TableCell><strong>Order ID</strong></TableCell>
                <TableCell><strong>Customer</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Items</strong></TableCell>
                <TableCell><strong>Total</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell>#{order.id?.slice(0, 8)}</TableCell>
                    <TableCell>{order.user?.name || 'N/A'}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{order.items?.length || 0}</TableCell>
                    <TableCell className="font-bold">
                      ${order.total?.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={order.status} 
                        color={getStatusColor(order.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <FormControl size="small" sx={{ minWidth: 120 }}>
                        <Select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          sx={{ fontSize: '0.875rem' }}
                        >
                          <MenuItem value="PENDING">Pending</MenuItem>
                          <MenuItem value="CONFIRMED">Confirmed</MenuItem>
                          <MenuItem value="PROCESSING">Processing</MenuItem>
                          <MenuItem value="SHIPPED">Shipped</MenuItem>
                          <MenuItem value="DELIVERED">Delivered</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography color="text.secondary" py={4}>
                      No orders found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Footer />
    </>
  );
};

export default VendorOrders;
