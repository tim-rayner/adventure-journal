import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: "map",
  initialState: {
    value: 0,
    toolBox: {
      layerOpen: false,
      menuOpen: false,
      settingsOpen: false,
      socialOpen: false,
    },
    globe: {
      globeSpeed: 1.5,
      globeAutoRotate: true,
      darkMode: false,
      explorationMode: true,
      showExplorationPercentage: false,
      showCities: false,
      showMapImg: true,
    },
    selectedCountry: {},
    showSelectedCountryModal: false,
    visitedCountries: [],
    visitedCountryCodes: [],
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },

    //reducer to toggle a toolbox layer based on the state name
    toggleLayer: (state, action) => {
      state.toolBox[action.payload] = !state.toolBox[action.payload];
    },

    toggleSelectedCountryModal: (state, action) => {
      state.showSelectedCountryModal = action.payload;
    },

    setStoreSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },

    updatedGlobeSpeed: (state, action) => {
      //TODO: update the globe speed slider value (out of 100) to reflect the speed of the globe in terms of
      //rotation speed with the api.
      state.globe.globeSpeed = action.payload;
    },
    updatedGlobeAutoRotate: (state, action) => {
      state.globe.globeAutoRotate = action.payload;
    },
    toggleDarkMode: (state, action) => {
      state.globe.darkMode = action.payload;
    },
    toggleExplorationMode: (state, action) => {
      state.globe.explorationMode = action.payload;
    },
    toggleShowExplorationPercentage: (state, action) => {
      state.globe.showExplorationPercentage = action.payload;
    },
    toggleShowCities: (state, action) => {
      state.globe.showCities = action.payload;
    },
    toggleMapImg: (state, action) => {
      state.globe.showMapImg = action.payload;
    },

    updateVisitedCountries: (state, action) => {
      state.visitedCountries = action.payload;
      //map the country names to their respective country codes
      state.visitedCountryCodes = action.payload.map(
        (country) => country.country
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  incrementByAmount,
  toggleLayer,
  updatedGlobeSpeed,
  updatedGlobeAutoRotate,
  updateVisitedCountries,
  toggleDarkMode,
  toggleExplorationMode,
  toggleShowExplorationPercentage,
  toggleShowCities,
  toggleMapImg,
  toggleSelectedCountryModal,
  setStoreSelectedCountry,
} = mapSlice.actions;

export default mapSlice.reducer;
