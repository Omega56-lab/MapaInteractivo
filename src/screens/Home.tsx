import { useEffect, useState, CSSProperties, useCallback } from "react";
import Map from "../components/Map";
import Footer from "../components/Footer/Footer";
import Buscador from "../components/Buscador";
import BotonEventos from "../components/botoneventos";
import VerMarcador from "../components/VerMarcador";
import NavbarUser from "../components/NavbarUser";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../components/Footer/Modo_Nocturno";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export default function Home() {
  const [marcadorSeleccionadoId, setMarcadorSeleccionadoId] = useState<number | null>(null);
  const [mostrarMarcador, setMostrarMarcador] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isStreetViewActive, setIsStreetViewActive] = useState(false);
  const [modoViaje, setModoViaje] = useState<'DRIVING' | 'BICYCLING' | 'WALKING' | 'TRANSIT'>('DRIVING');
  const [destino, setDestino] = useState<{ lat: number; lng: number } | null>(null);
  const [ubicacionActiva, setUbicacionActiva] = useState(false);
  const [Idrutamarcador, setIdrutamarcador] = useState<number | null>(null);
  const [onIndicaciones, setOnIndicaciones] = useState<string[]>([]);
  const { userEstado, signOut } = useAuth()
  const [yaVerificado, setYaVerificado] = useState(false);
  const [mapacentrado, setMapacentrado] = useState(false);
  const {modoNocturno} = useTheme ();

  useEffect(() => {
    if (userEstado === false && !yaVerificado) {
      setYaVerificado(true);
      signOut();
      alert("Su cuenta está desactivada, por favor contacta a soporte");
    }
  }, [userEstado]);


  const establecerDestino = useCallback((lat: number | null, lng: number | null) => {
    if (lat !== null && lng !== null) {
      setDestino({ lat, lng });
    } else {
      setDestino(null);
    }
  }, []);

  const handleUbicacionActiva = (activa: boolean) => {
    setUbicacionActiva(activa);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleResize = () => {
      setIsMobile(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    handleResize();

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const estilosMarcador: CSSProperties = {
    position: "absolute",
    zIndex: 1,
    bottom: isMobile ? "0px" : "60px",
    left: isMobile ? "0px" : "25px",
    width: isMobile ? "100%" : "auto",
    height: isMobile ? "85%" : "auto",
    transition: "bottom 0.3s ease-in-out",
  };

  return (

    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Map
        onSeleccionMarcador={(id: number) => {
          setMarcadorSeleccionadoId(id);
          setMostrarMarcador(true);
        }}
        onStreetViewChange={(isActive) => setIsStreetViewActive(isActive)}
        modoViaje={modoViaje}
        destinoRuta={destino}
        onUbicacionActiva={handleUbicacionActiva}
        onIndicaciones={setOnIndicaciones}
        mapacentrado={mapacentrado}
        setMapacentrado={setMapacentrado}

      />

      {!isStreetViewActive && (
        <>
          <div style={{
            position: 'absolute', top: 0, right: 0, zIndex: 1, width: '100%', display: 'flex', justifyContent: 'space-between', padding: 25, pointerEvents: 'none'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 10, pointerEvents: 'auto', width: "85%" }}>
              <Buscador onSeleccionMarcador={(id: number) => {
                setMarcadorSeleccionadoId(id);
                setMostrarMarcador(true);
              }} />
              <BotonEventos />
            </div>
            <div style={{ position: "absolute", right: "25px" }}>
              <NavbarUser />

            </div>

          </div>

          <Footer onSeleccionMarcador={(id: number) => {
            setMarcadorSeleccionadoId(id);
            setMostrarMarcador(true);
          }}
            cambiarModoViaje={setModoViaje}
            establecerDestino={establecerDestino}
            ubicacionActiva={ubicacionActiva}
            Idrutamarcador={Idrutamarcador}
            limpiarRutaMarcador={() => setIdrutamarcador(null)}
            InformacionDestino={destino}
            onIndicaciones={onIndicaciones}
          />

          <div style={{
            position: "absolute",
            bottom: window.innerWidth < 768 ? "20%" : "15%",
            right: "15px",
          }}>
            <button
              onClick={() => {
                if (ubicacionActiva) {
                  setMapacentrado(!mapacentrado);
                }
              }}
              title={
                !ubicacionActiva
                  ? "Ubicación desactivada"
                  : mapacentrado
                    ? "Desactivar seguimiento"
                    : "Activar seguimiento"
              }
              disabled={!ubicacionActiva}
              style={{
                background: modoNocturno ? "#2d2d2d" : "",
                backgroundColor: !ubicacionActiva
                ? modoNocturno ? "#666" : "#ccc" : mapacentrado ? "#4285F4" : modoNocturno ? "#2d2d2d" : "#fff" ,
                border: "none",
                borderRadius: "5px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                width: "40px",
                height: "40px",
                cursor: ubicacionActiva ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.3s",
              }}
            >
              <FontAwesomeIcon
                icon={faLocationCrosshairs}
                color={!ubicacionActiva ? "#888" : mapacentrado ? "#fff" :( modoNocturno ? "#ddd" : "#666")}
                style={{ width: "22px", height: "22px" }}
              />
            </button>
          </div>

          {mostrarMarcador && marcadorSeleccionadoId !== null && (
            <div style={estilosMarcador}>
              <VerMarcador
                MarcadorSelectId={marcadorSeleccionadoId}
                CerrarMarcador={() => setMostrarMarcador(false)}
                establecerIdRutaMarcador={(id) => setIdrutamarcador(id)}
              />
            </div>
          )}

        </>
      )
      }
    </div >
  );
}
