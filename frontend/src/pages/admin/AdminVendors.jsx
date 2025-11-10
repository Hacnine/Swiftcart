import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchUsers,
  approveVendor,
  rejectVendor,
  selectAdminUsers,
} from '../../store/slices/adminSlice';
import { showToast } from '../../store/slices/uiSlice';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tabs,
  Tab,
} from '@mui/material';

const AdminVendors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectAdminUsers);
  const [tabValue, setTabValue] = useState(0);
  const [rejectDialog, setRejectDialog] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    const filters = tabValue === 0 ? { role: 'SELLER' } : { role: 'SELLER', vendorStatus: 'PENDING' };
    dispatch(fetchUsers(filters));
  }, [dispatch, tabValue]);

  const handleApprove = async (vendorId) => {
    const result = await dispatch(approveVendor(vendorId));
    if (approveVendor.fulfilled.match(result)) {
      dispatch(showToast({ message: 'Vendor approved successfully', type: 'success' }));
      dispatch(fetchUsers({ role: 'SELLER' }));
    }
  };

  const handleRejectClick = (vendor) => {
    setSelectedVendor(vendor);
    setRejectDialog(true);
  };

  const handleRejectConfirm = async () => {
    if (!rejectReason.trim()) {
      dispatch(showToast({ message: 'Please provide a reason', type: 'error' }));
      return;
    }

    const result = await dispatch(rejectVendor({ 
      vendorId: selectedVendor.vendor.id, 
      reason: rejectReason 
    }));
    
    if (rejectVendor.fulfilled.match(result)) {
      dispatch(showToast({ message: 'Vendor rejected', type: 'success' }));
      setRejectDialog(false);
      setRejectReason('');
      setSelectedVendor(null);
      dispatch(fetchUsers({ role: 'SELLER' }));
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'warning',
      APPROVED: 'success',
      REJECTED: 'error',
      SUSPENDED: 'default',
    };
    return colors[status] || 'default';
  };

  const filteredVendors = tabValue === 1 
    ? users.filter(u => u.vendor?.status === 'PENDING')
    : users;

  return (
    <>
      <Header />
      <Box className="wrapper min-h-screen py-10">
        <Box className="mb-6 flex justify-between items-center">
          <Typography variant="h4" className="font-bold">
            Vendor Management
          </Typography>
          <Button
            variant="outlined"
            sx={{ borderColor: '#BA55D3', color: '#BA55D3' }}
            onClick={() => navigate('/admin/dashboard')}
          >
            Back to Dashboard
          </Button>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
            <Tab label="All Vendors" />
            <Tab label="Pending Approval" />
          </Tabs>
        </Box>

        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ bgcolor: '#F3E5F5' }}>
              <TableRow>
                <TableCell><strong>Vendor Name</strong></TableCell>
                <TableCell><strong>Business Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Phone</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Joined</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredVendors.length > 0 ? (
                filteredVendors.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.vendor?.businessName || 'N/A'}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.vendor?.phone || 'N/A'}</TableCell>
                    <TableCell>
                      <Chip 
                        label={user.vendor?.status || 'N/A'} 
                        color={getStatusColor(user.vendor?.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {user.vendor?.status === 'PENDING' && (
                        <Box className="flex gap-2">
                          <Button
                            size="small"
                            variant="contained"
                            sx={{ 
                              bgcolor: '#4CAF50',
                              '&:hover': { bgcolor: '#45A049' },
                            }}
                            onClick={() => handleApprove(user.vendor.id)}
                          >
                            Approve
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            color="error"
                            onClick={() => handleRejectClick(user)}
                          >
                            Reject
                          </Button>
                        </Box>
                      )}
                      {user.vendor?.status === 'APPROVED' && (
                        <Typography variant="caption" color="text.secondary">
                          Active
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography color="text.secondary" py={4}>
                      No vendors found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Reject Dialog */}
        <Dialog open={rejectDialog} onClose={() => setRejectDialog(false)}>
          <DialogTitle>Reject Vendor Application</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Please provide a reason for rejecting {selectedVendor?.name}'s application:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Rejection Reason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setRejectDialog(false)}>Cancel</Button>
            <Button 
              onClick={handleRejectConfirm} 
              color="error"
              variant="contained"
            >
              Reject Vendor
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Footer />
    </>
  );
};

export default AdminVendors;
