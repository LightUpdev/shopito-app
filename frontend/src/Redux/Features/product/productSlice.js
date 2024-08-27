import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

const initialState = {
  product: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create Product
export const createdProduct = createAsyncThunk(
  "product/createdProduct",
  async (productData, thunkAPI) => {
    try {
      return await productService.createdProduct(productData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Product
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ productData, id }, thunkAPI) => {
    try {
      return await productService.updateProduct(productData, id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get Products
export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, thunkAPI) => {
    try {
      return productService.getProducts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get Products
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, thunkAPI) => {
    try {
      return productService.deleteProduct(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    RESET_DATA(state) {
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
      state.isError = false;
      state.product = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // create product
      .addCase(createdProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createdProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = [...state.product, action.payload];
        toast.success("Product Created Successfully");
      })

      .addCase(createdProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.product = null;
        toast.error(action.payload);
      })

      // update product
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = [...state.product, action.payload];
        toast.success("Product update is Successful");
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.product = null;
        toast.error(action.payload);
      })

      // get products
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      })

      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.product = null;
        toast.error(action.payload);
      })
      // delete products
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.product = [...state.product];
        toast(action.payload)
      })

      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.product = null;
        toast.error(action.payload);
      });
  },
});

export const { RESET_DATA } = productSlice.actions;

export default productSlice.reducer;
