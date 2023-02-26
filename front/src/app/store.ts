import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {artistsReducer} from "../features/artists/artistsSlice";
import {albumsReducer} from "../features/albums/albumsSlice";
import {tracksReducer} from "../features/tracks/tracksSlice";
import {usersReducer} from "../features/users/usersSlice";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";

const usersPersistConfig = {
    key: 'music:users',
    storage,
    whitelist: ['user'],
}

const rootReducer = combineReducers({
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
    users: persistReducer(usersPersistConfig, usersReducer),
})
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;