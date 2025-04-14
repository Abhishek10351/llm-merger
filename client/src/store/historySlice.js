import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    conversations: [],
};

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        addAllConversations(state, action) {
            state.conversations = action.payload;
        },

        addConversation(state, action) {
            const existingConversation = state.conversations.find(
                (conversation) => conversation.id === action.payload.id
            );
            if (!existingConversation) {
                state.conversations.unshift(action.payload);
            }
        },
        removeConversation(state, action) {
            state.conversations = state.conversations.filter(
                (conversation) => conversation.id !== action.payload.id
            );
        },
        clearHistory(state) {
            state.conversations = [];
        },
    },
});

export const {
    addAllConversations,
    addConversation,
    removeConversation,
    clearHistory,
} = historySlice.actions;
export default historySlice.reducer;
