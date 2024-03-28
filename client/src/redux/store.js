import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
// import notificationReducer from "./notification/notificationSlice";

// import selectedChatReducer from "./chat/selectedChatSlice";

// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import chatsReducer from "./chats/chatsSlice";

// const rootReducer = combineReducers({
//   user: userReducer,
//   notifications: notificationReducer,
//   chats: chatsReducer,
//   selectedChat: selectedChatReducer,
// });

// const persistConfig = {
//   key: "root",
//   storage,
//   version: 1,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
