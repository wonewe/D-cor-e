import React, { createContext, useContext, useMemo, useReducer } from 'react';

const initialState = {
  locale: 'fr',
  travelerProfile: {
    name: 'Invité',
    interests: ['k-pop', 'fashion'],
    proficiency: 'beginner',
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_LOCALE':
      return { ...state, locale: action.payload };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        travelerProfile: { ...state.travelerProfile, ...action.payload },
      };
    default:
      return state;
  }
}

const AppContext = createContext({
  state: initialState,
  dispatch: () => {},
});

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
