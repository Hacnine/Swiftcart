import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '../../services';

// Async Thunks
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await productService.getProducts(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await productService.getProduct(id);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
    }
  }
);

export const searchProducts = createAsyncThunk(
  'product/searchProducts',
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await productService.searchProducts(query);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Search failed');
    }
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  'product/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await productService.getFeatured();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch featured');
    }
  }
);

export const fetchNewArrivals = createAsyncThunk(
  'product/fetchNewArrivals',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await productService.getNewArrivals();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch new arrivals');
    }
  }
);

export const fetchBestSellers = createAsyncThunk(
  'product/fetchBestSellers',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await productService.getBestSellers();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch best sellers');
    }
  }
);

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const { data } = await productService.createProduct(productData);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create product');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const { data } = await productService.updateProduct(id, productData);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update product');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await productService.deleteProduct(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
    }
  }
);

const initialState = {
  products: [],
  currentProduct: null,
  featuredProducts: [],
  newArrivals: [],
  bestSellers: [],
  searchResults: [],
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  },
  filters: {
    search: '',
    categoryId: null,
    brandId: null,
    minPrice: null,
    maxPrice: null,
    sortBy: 'createdAt',
    order: 'desc',
  },
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Single Product
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Search Products
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.data;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Featured Products
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featuredProducts = action.payload;
      })
      // New Arrivals
      .addCase(fetchNewArrivals.fulfilled, (state, action) => {
        state.newArrivals = action.payload;
      })
      // Best Sellers
      .addCase(fetchBestSellers.fulfilled, (state, action) => {
        state.bestSellers = action.payload;
      })
      // Create Product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
      })
      // Update Product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        if (state.currentProduct?.id === action.payload.id) {
          state.currentProduct = action.payload;
        }
      })
      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      });
  },
});

export const { setFilters, clearFilters, clearCurrentProduct, clearError } = productSlice.actions;

// Selectors
export const selectProducts = (state) => state.product.products;
export const selectCurrentProduct = (state) => state.product.currentProduct;
export const selectFeaturedProducts = (state) => state.product.featuredProducts;
export const selectNewArrivals = (state) => state.product.newArrivals;
export const selectBestSellers = (state) => state.product.bestSellers;
export const selectSearchResults = (state) => state.product.searchResults;
export const selectProductFilters = (state) => state.product.filters;
export const selectProductPagination = (state) => state.product.pagination;
export const selectProductLoading = (state) => state.product.loading;
export const selectProductError = (state) => state.product.error;

export default productSlice.reducer;
