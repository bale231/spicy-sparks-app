/**
 * Slice per gestire lo stato globale dell'applicazione
 * 
 * @type {Object}
 */
import { createSlice } from "@reduxjs/toolkit";

/**
 * Stato iniziale del slice
 * 
 * @type {Object}
 */
const initialState = {
  page: "homescreen", // Pagina attuale dell'applicazione
};

/**
 * Creazione del slice
 * 
 * @type {Object}
 */
export const globalSlice = createSlice({
  name: "global", // Nome del slice
  initialState, // Stato iniziale del slice
  /**
   * Reducer per gestire l'azione di set della pagina
   * 
   * @param {Object} state - Stato attuale del slice
   * @param {Object} action - Azione da gestire
   * @returns {Object} - Nuovo stato del slice
   */
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload; // Aggiorna la pagina attuale
    },
  },
});

/**
 * Seleziono l'azione di set della pagina
 * 
 * @type {Function}
 */
export const { setPage } = globalSlice.actions;

/**
 * Esporto il reducer del slice
 * 
 * @type {Function}
 */
export default globalSlice.reducer;
