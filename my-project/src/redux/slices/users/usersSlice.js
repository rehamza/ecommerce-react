import {createAsynThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";

//initial state 
const initialState = {
    loading: false,
    error: null,
    users: [],
    user: {},
    profile: {},
    userAuth: {
        loading: false,
        error: null,
        userInfo: {},
    },
};

//Login Action
export const loginUserAction = createAsynThunk(
    "users/login",
    async({email, password},{rejectWithValue, getState, dispatch}) => {
        try {
            //making http request
            const {data} = await axios.post(`${baseURL}/users/login`,{
                email,
                password,
            })
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
)

const usersSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: (builder) => {
        //handle actions
        //login
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.userAuth.loading = true;
        });
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.userAuth.userInfo = action.payload;
            state.userAuth.loading = false;
        })
        builder.addCase(loginUserAction.rejected, (state, action) =>{
            state.userAuth.error = action.payload;
            state.userAuth.loading = false;
        })
    }
})

//generate reducer
const usersReducer = usersSlice.reducer;

export default usersReducer;