import { createSlice, nanoid, current} from "@reduxjs/toolkit";

const initialState={
    users: []
}

const Slice = createSlice({
    name:'todoList',
    initialState,
    reducers:{
        addTodos:(state, action)=>{
            const data={
                id:nanoid(),
                name:action.payload
            }
            state.users.push(data)
        },
        removeTodos:(state, action)=>{
            const list = state.users.filter((item)=>item.id!=action.payload)
            state.users = list
        }
    }
});

export  const {addTodos, removeTodos} = Slice.actions;
export default  Slice.reducer;