import styles from "./css/info.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faWheelchair, faRoad, faSquareParking, faPuzzlePiece, faPersonWalkingWithCane, faInfo, faChevronUp, faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Especificacion_Baño_Discapacitados_1 from "../../../public/img/Especificacion_Baño_Discapacitados_1_.webp";
import Especificacion_Baño_Discapacitados_2 from "../../../public/img/Especificacion_Baño_Discapacitados_2_.webp";
import Especificacion_Baño_Discapacitados_3 from "../../../public/img/Ducha-De-Baño.webp";
import Especificacion_Baño_Discapacitados_4 from "../../../public/img/Objetos-de-Baño.webp";
import Especificacion_Baño_Discapacitados_5 from "../../../public/img/Baranda_Baños.webp";
import Especificacion_Estacionamiento_Discapacitados_8 from "../../../public/img/Especificacion_Estacionamiento_Discapacitados_8_.webp";
import Especificacion_Estacionamiento_Discapacitados_9 from "../../../public/img/Especificacion_Estacionamiento_Discapacitados_9_.webp";
import Especificacion_Rampas_Discapacitados_10 from "../../../public/img/Especificacion_Rampas_Discapacitados_10_.webp";
import Especificacion_Rampas_Discapacitados_11 from "../../../public/img/Especificacion_Rampas_Discapacitados_11_.webp";
import Especificacion_Rampas_Discapacitados_12 from "../../../public/img/Especificacion_Rampas_Discapacitados_12_.webp";
import Especificacion_Señalizacion_Discapacitados_Visual_14 from "../../../public/img/Especificacion_Señalizacion_Discapacitados_Visual_14_.webp";
import Especificacion_Señalizacion_Discapacitados_Visual_15 from "../../../public/img/Especificacion_Señalizacion_Discapacitados_Visual_15_.webp";
import Especificacion_Señalizacion_Discapacitados_Visual_16 from "../../../public/img/Especificacion_Señalizacion_Discapacitados_Visual_16_.webp";
import Especificacion_Zona_de_Calma_17 from "../../../public/img/Especificacion_Zona_de_Calma_17_.webp";
import { useFontSize } from "../../components/Footer/Modificador_Letras";

type InfoProps = {
  onConfirmarLectura?: () => void;
};

function Info({ onConfirmarLectura }: InfoProps) {
  const navigate = useNavigate();
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Función para abrir la imagen en el lightbox
  const openLightbox = (imageSrc: string) => {
    setLightboxImage(imageSrc);
  };

  // Función para cerrar el lightbox
  const closeLightbox = () => {
    setLightboxImage(null);
  };

  type SectionState = {
    [key: string]: boolean;
  };
  const [visibleSections, setVisibleSections] = useState<SectionState>({
    banos: false,
    rampas: false,
    estacionamiento: false,
    zonaCalma: false,
    discapacidadVisual: false
  });

  const toggleSection = (section: string) => {
    setVisibleSections({
      ...visibleSections,
      [section]: !visibleSections[section]
    });
  };
  const [mostrarMensaje, setMostrarMensaje] = useState(true);
  const [ocultarMensaje, setOcultarMensaje] = useState(false);
  const { fontSize } = useFontSize();

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      setOcultarMensaje(true); // inicia la animación de opacidad
    }, 3000); // comienza a desvanecer después de 3s

    const timeout2 = setTimeout(() => {
      setMostrarMensaje(false); // quita el elemento del DOM
    }, 4000); // quita el mensaje después de 4s total

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);
  return (

    <div className={styles.container_principal}>
      {mostrarMensaje && (
        <div className={`${styles.toast} ${ocultarMensaje ? styles.hide : ''}`}>
          ⚠️ Debes leer todo el instructivo antes de continuar.
        </div>
      )}

      {lightboxImage && (
        <div className={styles.lightbox_overlay} onClick={closeLightbox}>
          <div className={styles.lightbox_container} onClick={(e) => e.stopPropagation()}>
            <button className={styles.lightbox_close} onClick={closeLightbox} style={{ border: "1px solid black", marginTop: "5px", marginLeft: "5px", background: "#fff", fontSize: "20px", borderRadius: "15px", width: "30px" }} >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <img src={lightboxImage} alt="Imagen ampliada" className={styles.lightbox_image} />
          </div>
        </div>
      )}

      <div>
        <button className={styles.botonatras} onClick={() => navigate(-1)} aria-label="Volver atrás"><FontAwesomeIcon icon={faReply} /></button>
      </div>
      <div className={styles.container}>
        <div className={styles.titulo}>
          <h1 style={{ fontSize: `${fontSize}rem` }}>Manual de Accesibilidad Universal</h1>
          <h2 style={{ fontSize: `${fontSize}rem` }}>Indicaciones para una colaboración accesible</h2>

        </div>
        <div className={styles.contentenido_principal_Seccion}>
          <section className={styles.Seccion_de_Accesibilidad}>
            <div className={styles.seccion_de_titulos}>
              <h2 style={{ fontSize: `${fontSize}rem` }} >Requisitos para implementar vías de accesibilidad</h2>
            </div>
            <div className={styles.featureHeader}>
              <h3 style={{ fontSize: `${fontSize}rem` }}>Baños Accesibles (Requisitos para su instalación):</h3>
              <FontAwesomeIcon style={{ fontSize: `${fontSize}rem` }} icon={faWheelchair} className={styles.featureIcon_1} />
            </div>

            <div>
              <div className={styles.Pre_Descripcion}>
                <div className={styles.alertaInformativa}>
                  <FontAwesomeIcon icon={faInfo} className={styles.iconoInfo} />
                  <a
                    className={styles.linkArticulo}
                    href="https://www.bcn.cl/leychile/navegar?idNorma=1088117"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Art. 4.1.7 numeral 6
                    <span className={styles.infoExtra}>- Haz clic aquí para más información.</span>
                  </a>
                </div>

                <h4 style={{ fontSize: `${fontSize}rem` }} >Deben cumplir con diseño universal y el recinto debe respetar las siguientes medidas:</h4>
              </div>

              <div className={styles.especificacion_de_contenido}>
                <h5 style={{ fontSize: `${fontSize}rem` }}>Especificaciones Arquitectónicas:</h5>
                <hr />
                <h4 style={{ fontSize: `${fontSize}rem` }}>Dimensiones mínimas del recinto:</h4>
                <h4 style={{ fontSize: `${fontSize}rem` }}>El baño debe permitir un giro de 360° de una silla de ruedas:</h4>
                <ul>
                  <li style={{ fontSize: `${fontSize}rem` }}>Deben incluir mudadores de diseño universal, accesibles para ambos sexos.</li>
                  <li style={{ fontSize: `${fontSize}rem` }}>Diámetro mínimo: 1,50 metros.</li>
                  <li style={{ fontSize: `${fontSize}rem` }}>El espacio puede incluir el área bajo el lavamanos, siempre que no haya pedestal ni elementos que impidan la aproximación frontal.</li>
                </ul>
              </div>

              <div className={styles.especificacion_de_contenido}>
                <h4 style={{ fontSize: `${fontSize}rem` }}>Puertas de acceso:</h4>
                <ul>
                  <li style={{ fontSize: `${fontSize}rem` }}>Vano mínimo de 0,90 m y ancho libre de paso de 0,80 m.</li>
                  <li style={{ fontSize: `${fontSize}rem` }}>Preferiblemente debe abrir hacia el exterior.</li>
                  <li style={{ fontSize: `${fontSize}rem` }}>Si abre hacia el interior, la puerta no debe interferir con el diámetro de giro de 1,50 m.</li>
                </ul>
              </div>

              <div className={styles.especificacion_de_contenido}>
                <h4 style={{ fontSize: `${fontSize}rem` }}>Espacio de transferencia del inodoro:</h4>
                <ul>
                  <li style={{ fontSize: `${fontSize}rem` }}>Debe haber al menos 0,80 m de ancho por 1,20 m de largo junto al inodoro para permitir transferencia lateral.</li>
                </ul>
              </div>

              <div className={styles.contenedor_imagenes}>
                <div className={styles.imagenes} onClick={() => toggleSection("banos")} style={{ cursor: "pointer" }}>
                  <FontAwesomeIcon icon={visibleSections.banos ? faChevronUp : faChevronDown} />
                  <h4 style={{ fontSize: `${fontSize}rem` }} >Imágenes de Accesibilidad Universal</h4>
                </div>
                {visibleSections.banos && (
                  <div className={styles.imagen_container}>
                    <img src={Especificacion_Baño_Discapacitados_1} onClick={() => openLightbox(Especificacion_Baño_Discapacitados_1)} />
                    <img src={Especificacion_Baño_Discapacitados_2} onClick={() => openLightbox(Especificacion_Baño_Discapacitados_2)} />
                    <img src={Especificacion_Baño_Discapacitados_3} onClick={() => openLightbox(Especificacion_Baño_Discapacitados_3)} />
                    <img src={Especificacion_Baño_Discapacitados_4} onClick={() => openLightbox(Especificacion_Baño_Discapacitados_4)} />
                    <img src={Especificacion_Baño_Discapacitados_5} onClick={() => openLightbox(Especificacion_Baño_Discapacitados_5)} />
                  </div>
                )}
              </div>
            </div>
          </section>
          <section className={styles.Seccion_de_Accesibilidad}>
            <div className={styles.featureHeader}>
              <h3 style={{ fontSize: `${fontSize}rem` }}>Rampas Universales:</h3>
              <FontAwesomeIcon style={{ fontSize: `${fontSize}rem` }} icon={faRoad} className={styles.featureIcon_2} />
            </div>

            <div>
              <div className={styles.Pre_Descripcion}>
                <div className={styles.alertaInformativa}>
                  <FontAwesomeIcon icon={faInfo} className={styles.iconoInfo} />
                  <a
                    className={styles.linkArticulo}
                    href="https://www.bcn.cl/leychile/navegar?idNorma=1088117"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Art. 4.1.7 numeral 6
                    <span className={styles.infoExtra}>- Haz clic aquí para más información.</span>
                  </a>
                </div>
                <h4 style={{ fontSize: `${fontSize}rem` }}>Las rampas deben cumplir con diseño universal, y el recinto debe respetar las siguientes medidas:</h4>
                <h4 style={{ fontSize: `${fontSize}rem` }}>En cruces peatonales, accesos y desniveles, debe cumplir con estos requisitos:</h4>
              </div>

              <div className={styles.especificacion_de_contenido}>
                <h5 style={{ fontSize: `${fontSize}rem` }}>Especificaciones Arquitectónicas:</h5>
                <hr />
                <h4 style={{ fontSize: `${fontSize}rem` }}>Pendiente máxima:</h4>
                <ul>
                  <li style={{ fontSize: `${fontSize}rem` }}>Hasta 1,5 m: 12%.</li>
                  <li style={{ fontSize: `${fontSize}rem` }}>Más de 1,5 m: pendiente decreciente según fórmula (ver art. 4.1.7).</li>
                  <li style={{ fontSize: `${fontSize}rem` }}>Ancho mínimo: 1,20 m.</li>
                  <li style={{ fontSize: `${fontSize}rem` }}>Superficie: antideslizante en seco y mojado.</li>
                </ul>
              </div>
            </div>
            <div className={styles.contenedor_imagenes}>
              <div className={styles.imagenes} onClick={() => toggleSection("rampas")} style={{ cursor: "pointer" }}>
                <FontAwesomeIcon style={{ fontSize: `${fontSize}rem` }} icon={visibleSections.rampas ? faChevronUp : faChevronDown} />
                <h4 style={{ fontSize: `${fontSize}rem` }}>Imágenes de Accesibilidad Universal</h4>
              </div>
              {visibleSections.rampas && (
                <div className={styles.imagen_container}>
                  <img src={Especificacion_Rampas_Discapacitados_10} onClick={() => openLightbox(Especificacion_Rampas_Discapacitados_10)} alt="Especificación de accesibilidad 1" />
                  <img src={Especificacion_Rampas_Discapacitados_11} onClick={() => openLightbox(Especificacion_Rampas_Discapacitados_11)} alt="Especificación de accesibilidad 2" />
                  <img src={Especificacion_Rampas_Discapacitados_12} onClick={() => openLightbox(Especificacion_Rampas_Discapacitados_12)} alt="Especificación de accesibilidad 3" />


                </div>
              )}
            </div>
          </section>
          <section className={styles.Seccion_de_Accesibilidad}>
            <div className={styles.featureHeader}>
              <h3 style={{ fontSize: `${fontSize}rem` }}>Estacionamiento para Personas con Discapacidad:</h3>
              <FontAwesomeIcon style={{ fontSize: `${fontSize}rem` }} icon={faSquareParking} className={styles.featureIcon_3} />
            </div>

            <div>
              <div className={styles.Pre_Descripcion}>
                <div className={styles.alertaInformativa}>
                  <FontAwesomeIcon icon={faInfo} className={styles.iconoInfo} />
                  <a
                    className={styles.linkArticulo}
                    href="https://www.ciudadaccesible.cl/wp-content/uploads/2021/04/Ficha-3-Estacionamientos-Accesibles_2021.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Art. 2.2.8 numeral 11
                    <span className={styles.infoExtra}>- Haz clic aquí para más información.</span>
                  </a>
                </div>
                <h4 style={{ fontSize: `${fontSize}rem` }}>Los estacionamientos accesibles deben cumplir con la normativa específica para garantizar su uso adecuado:</h4>
              </div>

              <div className={styles.especificacion_de_contenido}>
                <h5 style={{ fontSize: `${fontSize}rem` }}>Especificaciones Arquitectónicas:</h5>
                <hr />
                <ul>
                  <li style={{ fontSize: `${fontSize}rem` }}>Al menos el 1% del total de estacionamientos debe ser accesible, con un mínimo obligatorio de 2 unidades.</li>
                  <small >* Fuente: Decreto DS N°50 / 2015 - OGUC.</small>

                </ul>

                <h4 style={{ fontSize: `${fontSize}rem` }}>Dimensiones:</h4>
                <ul>
                  <li style={{ fontSize: `${fontSize}rem` }}>5 m de largo x 2,5 m de ancho + franja de circulación de 1,1 m (compartible).</li>
                  <li style={{ fontSize: `${fontSize}rem` }}>Pendiente máxima: 2% en ambos sentidos.</li>
                </ul>

                <h4 style={{ fontSize: `${fontSize}rem` }} >Señalización:</h4>
                <ul>
                  <li style={{ fontSize: `${fontSize}rem` }}>Horizontal: con el símbolo internacional de accesibilidad (SIA).</li>
                  <li style={{ fontSize: `${fontSize}rem` }}>Vertical: visible, pero no puede obstaculizar la apertura de puertas ni la ruta accesible.</li>
                </ul>
              </div>
            </div>
            <div className={styles.contenedor_imagenes}>
              <div className={styles.imagenes} onClick={() => toggleSection("estacionamiento")} style={{ cursor: "pointer" }}>
                <FontAwesomeIcon icon={visibleSections.estacionamiento ? faChevronUp : faChevronDown} />
                <h4 style={{ fontSize: `${fontSize}rem` }}>Imágenes de Accesibilidad Universal</h4>
              </div>
              {visibleSections.estacionamiento && (
                <div className={styles.imagen_container}>
                  <img src={Especificacion_Estacionamiento_Discapacitados_8} onClick={() => openLightbox(Especificacion_Estacionamiento_Discapacitados_8)} alt="Especificación de accesibilidad 1" />
                  <img src={Especificacion_Estacionamiento_Discapacitados_9} onClick={() => openLightbox(Especificacion_Estacionamiento_Discapacitados_9)} alt="Especificación de accesibilidad 2" />
                </div>
              )}
            </div>
          </section>
          <section className={styles.Seccion_de_Accesibilidad}>
            <div className={styles.featureHeader}>
              <h3 style={{ fontSize: `${fontSize}rem` }} >Zonas de Calma (para Personas Neurodivergentes):</h3>
              <FontAwesomeIcon style={{ fontSize: `${fontSize}rem` }} icon={faPuzzlePiece} className={styles.featureIcon_4} />
            </div>

            <div>
              <div className={styles.Pre_Descripcion}>
                <div className={styles.alertaInformativa}>
                  <FontAwesomeIcon icon={faInfo} className={styles.iconoInfo} />
                  <a
                    className={styles.linkArticulo}
                    href="https://www.bcn.cl/leychile/navegar?idNorma=1088117&idParte=10027833"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Art. 2.2.8 y 2.6.17
                    <span className={styles.infoExtra}>- Haz clic aquí para más información.</span>
                  </a>
                </div>
                <h4 style={{ fontSize: `${fontSize}rem` }}>Las zonas de calma son espacios esenciales para personas con trastorno del espectro autista:</h4>
              </div>

              <div className={styles.especificacion_de_contenido}>
                <h5 style={{ fontSize: `${fontSize}rem` }}>Especificaciones Arquitectónicas:</h5>
                <hr />
                <ul>
                  <li style={{ fontSize: `${fontSize}rem` }}>Rutas accesibles claras y señalizadas.</li>
                  <li style={{ fontSize: `${fontSize}rem` }}>Espacios de regulación emocional o descanso sensorial.</li>
                  <li style={{ fontSize: `${fontSize}rem` }}>Acceso conectado mediante la ruta accesible.</li>
                </ul>
              </div>
            </div>
            <div className={styles.contenedor_imagenes}>
              <div className={styles.imagenes} onClick={() => toggleSection("zonaCalma")} style={{ cursor: "pointer" }}>
                <FontAwesomeIcon style={{ fontSize: `${fontSize}rem` }} icon={visibleSections.zonaCalma ? faChevronUp : faChevronDown} />
                <h4 style={{ fontSize: `${fontSize}rem` }}>Imágenes de Accesibilidad Universal</h4>
              </div>
              {visibleSections.zonaCalma && (
                <div className={styles.imagen_container}>
                  <img src={Especificacion_Zona_de_Calma_17} onClick={() => openLightbox(Especificacion_Zona_de_Calma_17)} alt="Especificación de accesibilidad 3" />
                </div>
              )}
            </div>
          </section>
          <section className={styles.Seccion_de_Accesibilidad}>
            <div className={styles.featureHeader}>
              <h3 style={{ fontSize: `${fontSize}rem` }}>Accesibilidad para Personas con Discapacidad Visual</h3>
              <FontAwesomeIcon icon={faPersonWalkingWithCane} className={styles.featureIcon_4} />
            </div>

            <div>
              <div className={styles.Pre_Descripcion}>
                <h4 style={{ fontSize: `${fontSize}rem` }}>Los espacios accesibles también deben considerar a personas con discapacidad visual:</h4>
              </div>

              <div className={styles.especificacion_de_contenido}>
                <h5 style={{ fontSize: `${fontSize}rem` }}>Especificaciones Arquitectónicas:</h5>
                <hr />
                <ul>
                  <li style={{ fontSize: `${fontSize}rem` }}>Señalización en braille en dispositivos (como semáforos peatonales).</li>
                  <h4 style={{ fontSize: `${fontSize}rem` }}>Características de la señalización:</h4>
                  <li style={{ fontSize: `${fontSize}rem` }}>Vibración.</li>
                  <li style={{ fontSize: `${fontSize}rem` }}>Señales auditivas.</li>
                  <li style={{ fontSize: `${fontSize}rem` }}>Flechas en relieve en el botón del semáforo.</li>
                </ul>
              </div>
            </div>
            <div className={styles.contenedor_imagenes}>
              <div className={styles.imagenes} onClick={() => toggleSection("discapacidadVisual")} style={{ cursor: "pointer" }}>
                <FontAwesomeIcon style={{ fontSize: `${fontSize}rem` }} icon={visibleSections.discapacidadVisual ? faChevronUp : faChevronDown} />
                <h4 style={{ fontSize: `${fontSize}rem` }}>Imágenes de Accesibilidad Universal</h4>
              </div>
              {visibleSections.discapacidadVisual && (
                <div className={styles.imagen_container}>
                  <img src={Especificacion_Señalizacion_Discapacitados_Visual_14} onClick={() => openLightbox(Especificacion_Señalizacion_Discapacitados_Visual_14)} alt="Especificación de accesibilidad 1" />
                  <img src={Especificacion_Señalizacion_Discapacitados_Visual_15} onClick={() => openLightbox(Especificacion_Señalizacion_Discapacitados_Visual_15)} alt="Especificación de accesibilidad 2" />
                  <img src={Especificacion_Señalizacion_Discapacitados_Visual_16} onClick={() => openLightbox(Especificacion_Señalizacion_Discapacitados_Visual_16)} alt="Especificación de accesibilidad 3" />
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
      <button style={{ fontSize: `${fontSize}rem`, background: "linear-gradient(55deg, #004d00, #228b22, #90ee90 " }} onClick={onConfirmarLectura} className={styles.confirmButton}>
        He leído el instructivo
      </button>

    </div>
  );
}

export default Info;