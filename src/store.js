import { configureStore } from '@reduxjs/toolkit';
import tablesReducer from './tablesSlice';
//This created a Redux store using configureStore from the Redux Toolkit
 const store = configureStore({
    //This defines the roof reducer object
    reducer: {
        //'tables' is the name of the slice in the store and it's managed by tablesReducer
        tables: tablesReducer,
    },
});
export default store //This exports the store for use in the app (e.g., in <Provider store={store}>)



