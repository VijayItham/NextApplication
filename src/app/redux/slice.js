import { createSlice, nanoid, current, createAsyncThunk} from "@reduxjs/toolkit";

const initialState={
    userApiData:[],
    users: JSON.parse(localStorage.getItem("userDetails"))?JSON.parse(localStorage.getItem("userDetails")):[]
}

export const fetchAPIUser = createAsyncThunk("fetchApiUsers", async ()=>{
    const result  = await fetch('https://jsonplaceholder.typicode.com/users')
    return result.json()
})


const Slice = createSlice({
    name:'adduserSlice',
    initialState,
    reducers:{
        addUser:(state, action)=>{
            const data={
                id:nanoid(),
                name:action.payload
            }
            state.users.push(data)
            const userDetail = JSON.stringify(current(state.users));
            localStorage.setItem('userDetails',userDetail)
        },
        removeUser:(state, action)=>{
            const list = state.users.filter((item)=>item.id!=action.payload)
            state.users = list
            const userDetail = JSON.stringify(list);
            localStorage.setItem('userDetails',userDetail)
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAPIUser.fulfilled,(state,action)=>{
            state.isloading=false,
            state.userApiData = action.payload
        })
    }
});

export  const {addUser, removeUser} = Slice.actions;
export default  Slice.reducer;