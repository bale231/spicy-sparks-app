/**
 * Creo lo store per la gestione degli stati dell'applicazione
 * Importo i reducer per la gestione degli stati globali, delle playlist, delle single e delle tracce
 */
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "../features/globalReducer/globalSlices";
import fetchAllReducer from "../fetch/FetchAll";
import fetchSingleReducer from "../fetch/FetchSingle";
import checkedReducer from "../features/checkedReducer/checkedSlicer";

/**
 * Creo lo store e lo configuro con i reducer importati
 */
export const store = configureStore({
  reducer: {
    global: globalReducer,
    playlists: fetchAllReducer,
    fetchSingle: fetchSingleReducer,
    checked: checkedReducer,
  },
});


