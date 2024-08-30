import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSinglePlaylist,
  resetPlaylistStatus,
} from "../../core/fetch/fetchSingle";
import { useParams } from "react-router-dom";
import moment from "moment";
import { setPage } from "../../core/features/globalReducer/globalSlices";
import { toggleChecked } from "../../core/features/checkedReducer/checkedSlicer";

function PlaylistScreen() {
  const dispatch = useDispatch();
  // Stato per gestire se la playlist è "cuore" o meno
  const [isHearted, setIsHearted] = useState(false);
  // Stato per gestire quale traccia è attualmente in riproduzione
  const [isPlaying, setIsPlaying] = useState(null);
  // Recupera l'ID della playlist dalla URL
  const params = useParams();
  const playlistId = params.id;
  // Recupera la playlist e lo stato dallo stato globale
  const { playlist, status } = useSelector((state) => state.fetchSingle);
  // Recupera l'elenco degli elementi selezionati dallo stato globale
  const { checked } = useSelector((state) => state.checked);
  // Stato per gestire se una traccia è "cuore" o meno
  const [isHeartedTrack, setIsHeartedTrack] = useState(
    Array(playlist.tracks?.data?.length || 0).fill(false)
  );

  // Gestisce il click sulla checkbox per selezionare le tracce
  const handleClickCheckbox = () => {
    dispatch(toggleChecked());
  };

  useEffect(() => {
    // Resetta lo stato della playlist quando il componente viene montato
    dispatch(resetPlaylistStatus());
  }, [dispatch]);

  useEffect(() => {
    // Effettua il fetch della playlist se lo stato è "idle"
    if (status === "idle") {
      dispatch(fetchSinglePlaylist(playlistId));
    }
  }, [dispatch, status, playlistId]);

  // Formatta la data di creazione della playlist
  const formattedDate = playlist
    ? moment(playlist.creation_date, "YYYY-MM-DD").format("DD/MM/YYYY")
    : null;

  // Gestisce il click sul pulsante "cuore" della playlist
  const handleClick = () => {
    // Cambia lo stato dell'icona del cuore
    setIsHearted(!isHearted);

    // Esegue il dispatch per impostare la pagina su "favourite"
    dispatch(setPage("favourite"));
  };

  // Gestisce il click su una traccia per iniziare a riprodurla
  const handleClickTrack = (index) => {
    setIsPlaying(index);
  };

  // Gestisce il click sul cuore di una traccia
  const handleClickHeartTrack = (index) => {
    setIsHeartedTrack((prevTracks) => {
      const updatedTracks = [...prevTracks];
      updatedTracks[index] = !prevTracks[index];
      return updatedTracks;
    });
  };

  return (
    <>
      {playlist && (
        <div className="flex flex-col gap-10 p-5 md:p-10">
          {/* Sezione delle informazioni della playlist */}
          <div className="flex md:flex-row flex-col md:justify-normal justify-center md:items-start items-center gap-10 text-[#f3f3f3]">
            <div className="w-[250px] h-[250px] lg:w-[350px] lg:h-[350px] rounded-lg overflow-hidden">
              {/* Immagine della playlist */}
              <img
                src={playlist.picture_xl}
                alt="picture playlist"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-10 flex-col items-baseline">
              {/* Titolo della playlist */}
              <h1 className="text-3xl lg:text-5xl font-bold">
                {playlist.title}
              </h1>
              <div className="flex gap-3 items-center">
                <div className="w-[50px] rounded-full overflow-hidden">
                  {/* Immagine del creatore della playlist */}
                  <img src={playlist.picture_small} alt="" />
                </div>
                <p>{playlist.creator?.name}</p>
              </div>
              <div>
                <p className="text-[#6E7271]">{playlist.description}</p>
                <p className="text-[#6E7271]">
                  {new Intl.NumberFormat("it-IT").format(playlist.nb_tracks)}{" "}
                  brani - {new Intl.NumberFormat("it-IT").format(playlist.fans)}{" "}
                  fans - Aggiornato: {formattedDate}
                </p>
                <div className="flex flex-col md:justify-normal justify-center md:flex-row mt-3 gap-5 items-center">
                  {/* Pulsante per ascoltare la playlist */}
                  <button className="button-play-playlist active:bg-[#04db50] active:opacity-80 text-2xl text-center px-6 p-2 bg-[#1ED760] rounded-3xl uppercase flex items-center gap-[15px] text-[#f3f3f3]">
                    <ion-icon name="play-circle-outline"></ion-icon>
                    <span className="font-bold">Ascolta</span>
                  </button>
                  <div className="flex md:justify-normal justify-center three-button-playlist text-2xl w-full gap-10">
                    {/* Pulsante per aggiungere ai preferiti */}
                    <button onClick={handleClick}>
                      {isHearted ? (
                        <ion-icon name="heart"></ion-icon>
                      ) : (
                        <ion-icon name="heart-outline"></ion-icon>
                      )}
                    </button>
                    <button>
                      <ion-icon name="arrow-redo-outline"></ion-icon>
                    </button>
                    <button>
                      <ion-icon name="ellipsis-horizontal"></ion-icon>{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Sezione dei brani della playlist */}
          <div className="flex flex-col text-[#f3f3f3] justify-between">
            <div className="mb-5 text-lg md:text-2xl uppercase flex justify-between">
              <div>Brano</div>
              <div className="flex justify-end gap-10">
                <div className="hidden-div">Artista</div>
                <div>
                  <ion-icon name="stopwatch-outline"></ion-icon>
                </div>
                <div className="hidden-div">
                  {/* Checkbox per selezionare le tracce */}
                  <label
                    htmlFor="hr"
                    className="pr-2 flex flex-row items-center gap-2.5 dark:text-white light:text-black"
                  >
                    <input
                      onClick={handleClickCheckbox}
                      id="hr"
                      type="checkbox"
                      className="peer hidden"
                    />
                    <div
                      htmlFor="hr"
                      className="h-5 w-5 flex rounded-md border border-[#a2a1a833] light:bg-[#e8e8e8] dark:bg-[#212121] peer-checked:bg-[#7152f3] transition"
                    >
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 light:stroke-[#e8e8e8] dark:stroke-[#212121]"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 12.6111L8.92308 17.5L20 6.5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            {/* Elenco dei brani della playlist */}
            <div className="border-t-2 grid container_tracks border-[#60616162]">
              {playlist.tracks &&
                playlist.tracks.data &&
                playlist.tracks.data.map((track, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        onClick={() => handleClickTrack(index)}
                        className={`flex justify-between cursor-pointer hover:bg-[#191922] ${
                          isPlaying === index ? "bg-[#191922]" : ""
                        }`}
                      >
                        <div>
                          <div className="text-[#f3f3f3] gap-10 text-2xl w-full flex items-center justify-between">
                            <div className="flex items-center gap-2 sm:gap-5">
                              {/* Immagine dell'album */}
                              <div className="w-[70px] relative h-[70px] m-2 rounded-lg overflow-hidden">
                                <img
                                  src={track.album.cover}
                                  alt="album cover"
                                  className={`${
                                    isPlaying === index ? "opacity-50" : ""
                                  } w-full h-full object-cover`}
                                />
                                <div
                                  className={`${
                                    isPlaying === index &&
                                    "w-full h-full absolute top-0 text-8xl text-white flex items-center justify-center"
                                  }`}
                                >
                                  <span className="w-[60px] h-[60px] text-3xl text-black flex items-center justify-center rounded-full bg-[#f3f3f3]">
                                    <ion-icon name="play-sharp"></ion-icon>
                                  </span>
                                </div>
                              </div>
                              <div className="grid items-center  height-responsive sm:w-[200px] sm:overflow-hidden md:text-base text-sm">
                                {/* Titolo e artista della traccia */}
                                <p
                                  className="break-all track-title"
                                  style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {track.title}
                                </p>
                                <p className="text-[#6E7271] visible-artist">
                                  {track.artist.name}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="hidden-div lg:visible text-3xl flex items-center justify-center gap-5">
                          {/* Pulsanti per azioni aggiuntive sulla traccia */}
                          <button className="hidden-button">
                            <ion-icon name="barcode-outline"></ion-icon>
                          </button>
                          <button
                            onClick={() => handleClickHeartTrack(index)}
                            className="hidden-button"
                          >
                            {isHeartedTrack[index] ? (
                              <ion-icon name="heart"></ion-icon>
                            ) : (
                              <ion-icon name="heart-outline"></ion-icon>
                            )}
                          </button>
                          <button className="hidden-button">
                            <ion-icon name="ellipsis-horizontal"></ion-icon>
                          </button>
                        </div>
                        <div className="flex items-center md:w-[300px] overflow-hidden justify-end gap-5 md:gap-10">
                          <div className="hidden-div-artist md:text-base text-sm">
                            <p>{track.artist.name}</p>
                          </div>
                          <div>
                            <p className="text-[#6E7271]">
                              {`${Math.floor(track.duration / 60)}:${(
                                track.duration % 60
                              )
                                .toString()
                                .padStart(2, "0")}`}
                            </p>
                          </div>
                          <div className="visible-button">
                            <button>
                              <ion-icon name="ellipsis-horizontal"></ion-icon>
                            </button>
                          </div>
                          <div className="hidden-div">
                            {/* Checkbox per selezionare la traccia */}
                            <label
                              htmlFor={track.id}
                              className="flex pr-2 flex-row items-center gap-2.5 dark:text-white light:text-black"
                            >
                              <input
                                id={track.id}
                                type="checkbox"
                                className="peer hidden"
                                checked={checked ? "checked" : null}
                              />
                              <div
                                htmlFor={track.id}
                                className="h-5 w-5 flex rounded-md border border-[#a2a1a833] light:bg-[#e8e8e8] dark:bg-[#212121] peer-checked:bg-[#7152f3] transition"
                              >
                                <svg
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  className="w-5 h-5 light:stroke-[#e8e8e8] dark:stroke-[#212121]"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M4 12.6111L8.92308 17.5L20 6.5"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                </svg>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PlaylistScreen;
