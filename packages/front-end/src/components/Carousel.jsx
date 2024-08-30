import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * Componente per creare un carosello di immagini
 * 
 * @param {Object} props - Oggetto con le proprietà del componente
 * @param {Array} props.slides - Array di oggetti con le informazioni delle slide
 * @param {String} props.titleCarousel - Titolo del carosello
 * @returns {JSX.Element} - Elemento JSX del carosello
 */
function Carousel({ slides, titleCarousel }) {
  const [current, setCurrent] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const carouselRef = useRef(null);

  /**
   * Funzione per tornare alla slide precedente
   */
  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  /**
   * Funzione per andare alla slide successiva
   */
  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  /**
   * Funzione per avviare il drag
   * @param {MouseEvent} e - Evento del mouse
   */
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPosition(e.pageX - carouselRef.current.offsetLeft);
    setScrollStart(carouselRef.current.scrollLeft);
  };

  /**
   * Funzione per continuare lo scroll durante il drag
   * @param {MouseEvent} e - Evento del mouse
   */
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startPosition) * 1; // Moltiplicatore per la velocità di scroll
    carouselRef.current.scrollLeft = scrollStart - walk;
  };

  /**
   * Funzione per interrompere il drag
   */
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  /**
   * Funzione per gestire il drag su dispositivi touch
   * @param {TouchEvent} e - Evento del touch
   */
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartPosition(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollStart(carouselRef.current.scrollLeft);
  };

  /**
   * Funzione per continuare lo scroll durante il drag su dispositivi touch
   * @param {TouchEvent} e - Evento del touch
   */
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startPosition) * 1; // Moltiplicatore per la velocità di scroll
    carouselRef.current.scrollLeft = scrollStart - walk;
  };

  /**
   * Funzione per interrompere il drag su dispositivi touch
   */
  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  /**
   * Funzione per calcolare il numero di slide visibili
   * @returns {Number} - Numero di slide visibili
   */
  const getVisibleSlides = () => {
    if (window.innerWidth >= 1280) {
      return 4;
    } else if (window.innerWidth >= 1024) {
      return 3;
    } else if (window.innerWidth >= 768) {
      return 2;
    } else {
      return 1;
    }
  };

  const visibleSlides = getVisibleSlides();

  // Ripristina all'inizio dopo l'ultima slide
  useEffect(() => {
    if (current >= slides.length) {
      setCurrent(0); // Torna alla prima slide
    }
  }, [current, slides.length]);

  return (
    <div className="overflow-hidden w-full xl:h-auto h-[600px]">
      <div className="flex gap-4 flex-col lg:flex-row justify-between items-center mb-10">
        <div className="w-full">
          <div className="flex lg:mb-0 text-2xl md:text-3xl justify-center lg:justify-normal items-center text-white w-full">
            <div className="flex justify-center items-center">
              <p className="cursor-pointer text-center border-b-2 border-[#0f0f13] hover:border-white">
                {titleCarousel}
              </p>
            </div>
            <div className="m-0 flex justify-center items-center">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
          </div>
        </div>
        <div className="flex text-2xl md:text-3xl text-white justify-between lg:justify-end items-center w-full h-full">
          <button
            onClick={prevSlide}
            className={`${current === 0 && "opacity-[0.5]"} p-2`}
          >
            <ion-icon name="chevron-back-outline"></ion-icon>
          </button>
          <button onClick={nextSlide} className="p-2">
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`flex gap-6 justify-center items-center max-w-[1440px] overdrop-blur-[10px] xl:h-auto  transition ease-out duration-500 cursor-grab ${
          isDragging ? "cursor-grabbing" : ""
        }`}
        style={{
          transform: `translateX(-${current * (100 / visibleSlides)}%)`,
        }}
      >
        {slides.concat(slides.slice(0, visibleSlides)).map((slide, index) => (
          <div key={index} className="flex flex-col h-full">
            <Link to={`/playlist/${slide.id}`}>
              <div
                className={`sm:w-[300px] sm:h-[300px] w-[250px] h-[250px] transition overflow-hidden rounded-md relative cursor-pointer`}
              >
                <img
                  src={slide.picture_xl}
                  className={`w-full  ${
                    hoveredIndex === index ? "opacity-60" : ""
                  } hover:opacity-60 transition h-full object-cover`}
                />
                <div
                  onMouseOver={() => setHoveredIndex(index)}
                  onMouseOut={() => setHoveredIndex(null)}
                  className="flex justify-center items-center absolute z-[9999] bottom-[10%] left-[10%] cursor-pointer w-[60px] h-[60px] bg-[#f3f3f3] rounded-full"
                >
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[15px] border-l-[#232323]"></div>
                </div>
              </div>
            </Link>
            <div>
              <div className="text-white font-bold">
                <h4>{slide.title}</h4>
              </div>
              <div className="text-[#656C71]">
                <p>
                  {slide.nb_tracks} brani - {Math.floor(Math.random() * 100000)}{" "}
                  fan
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;

