import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "Tarea 1",
    completed: false,
    description: "Esta es una tarea",
    date: "2023-01-01"
  },
  {
    id: "2",
    title: "Tarea 2 2",
    completed: true,
    description: "Esta es una tarea",
    date: "2023-01-01"
  },
];

const userSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    editTask: (state, action) => {
      const { id, title, description, date } = action.payload;
      const foundTask = state.find((task) => task.id === id);
      if (foundTask) {
        foundTask.title = title;
        foundTask.description = description;
        foundTask.date = date;
      }
    },
    deleteTask: (state, action) => {
      const foundTask = state.find((task) => task.id === action.payload);
      if (foundTask) {
        state.splice(state.indexOf(foundTask), 1);
      }
    },
  },
});

export const { addTask, editTask, deleteTask } = userSlice.actions;
export default userSlice.reducer;
