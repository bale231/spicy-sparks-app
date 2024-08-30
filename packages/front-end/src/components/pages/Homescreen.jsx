import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylists } from "../../core/fetch/fetchAll";
import Carousel from "../Carousel";

function Homescreen() {
  // Recupera la lista delle playlist dallo stato globale
  const playlists = useSelector((state) => state.playlists.playlists);
  const dispatch = useDispatch();

  // Effettua il fetch delle playlist al montaggio del componente
  useEffect(() => {
    dispatch(fetchPlaylists());
  }, [dispatch]);

  return (
    <>
      {/* Contenitore per la prima carousel */}
      <div className="w-full overflow-hidden p-10">
        {/* Verifica che esistano dati prima di rendere il componente Carousel */}
        {playlists.data && (
          <Carousel
            titleCarousel="Le migliori playlist pop"
            slides={playlists.data}
          />
        )}
      </div>

      {/* Contenitore per la seconda carousel */}
      <div className="w-full flex overflow-hidden p-10">
        {/* Verifica che esistano dati prima di rendere il componente Carousel */}
        {playlists.data && (
          <Carousel
            titleCarousel="Pop per ogni momento"
            slides={playlists.data}
          />
        )}
      </div>
    </>
  );
}

export default Homescreen;
