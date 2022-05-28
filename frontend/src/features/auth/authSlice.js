import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../auth/authApi'

//LocalStorage

const user = JSON.parse(localStorage.getItem('user'));


const initialState = {

    user: user ? user : null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',

}

//Register
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authApi.register(user);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//Login
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authApi.login(user);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})


export const logout = createAsyncThunk('auth/logout', async () => {
    await authApi.logout()
})

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {

        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })


            //login
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })

            //logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            }
            )

    },


});

export const { reset } = auth.actions;
export default auth.reducer;