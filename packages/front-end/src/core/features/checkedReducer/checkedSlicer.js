/**
 * Slice per gestire lo stato della checkbox per selezionare le tracce
 */
import { createSlice } from "@reduxjs/toolkit";

/**
 * Stato iniziale della checkbox
 */
const initialState = {
  checked: false,
};

/**
 * Creazione del slice
 */
export const checkedSlice = createSlice({
  name: "checked",
  initialState,
  /**
   * Reducer per gestire l'azione di toggle della checkbox
   */
  reducers: {
    /**
     * Toggle della checkbox
     * @param {Object} state - Stato attuale della checkbox
     * @returns {Object} - Stato aggiornato della checkbox
     */
    toggleChecked: (state) => {
      state.checked = !state.checked;
    },
  },
});

/**
 * Seleziono l'azione di toggle della checkbox
 */
export const { toggleChecked } = checkedSlice.actions;

/**
 * Esporto il reducer del slice
 */
export default checkedSlice.reducer;
