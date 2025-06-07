import styles from './css/List.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faMagnifyingGlass, faFilter, faSort, faCheck, faX, faInfo } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Solicitudes } from '../../interfaces/Solicitudes';
import { supabase } from '../../services/supabase';
import { useNavigate, useParams } from "react-router-dom";
import NavbarAdmin from '../../components/NavbarAdmin';
function ListSolicitudes() {
  
    const [solicitudes, setSolicitudes] = useState<Solicitudes[]>([]);
    const [busqueda, setBusqueda] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');
    const [orden, setOrden] = useState('desc');
    const navigate = useNavigate()
    const { estado } = useParams<{ estado?: string }>();

    useEffect(() => {
        if (estado) {
            setFiltroEstado(estado);
        }
    }, [estado]);
    useEffect(() => {
        const fetchSolicitudes = async () => {
            const { data, error } = await supabase
                .from('solicitudes')
                .select('*')
                .order('fecha_ingreso', { ascending: orden === 'asc' });

            if (error) console.error('Error al obtener solicitudes:', error);
            else setSolicitudes(data);
        };

        fetchSolicitudes();
    }, [orden]);

    function iconos(tipo: string) {
        switch (tipo) {
            case 'pendiente':
                return faEye;
            case 'aprobada':
                return faCheck;
            case 'rechazada':
                return faX;
            default:
                return faInfo;
        }
    }

    function bgcolor(tipo: string) {
        switch (tipo) {
            case 'pendiente':
                return 'rgb(223, 171, 0)';
            case 'aprobada':
                return 'rgb(65, 170, 17)';
            case 'rechazada':
                return 'rgb(170, 17, 17)';
            default:
                return 'rgb(97, 97, 97)';
        }
    }

    function handleBusquedaChange(e: React.ChangeEvent<HTMLInputElement>) {
        setBusqueda(e.target.value);
    }

    const solicitudesFiltradas = solicitudes
        .filter((sol) =>
            sol.nombre_locacion.toLowerCase().includes(busqueda.toLowerCase())
        )
        .filter((sol) =>
            filtroEstado ? sol.estado === filtroEstado : true
        );

    const handleFiltroCambio = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const nuevoEstado = e.target.value;
        setFiltroEstado(nuevoEstado);
        navigate(`/panel-administrativo/solicitudes/${nuevoEstado}`);
    };
    return (
        <>
            <NavbarAdmin />
            <div className={styles.container}>
                <header className={styles.header} style={{ paddingTop: '40px', gap: '15px' }}>
                    <hr style={{ flexGrow: "1" }} />
                    <h2 style={{ textAlign: 'right', paddingRight: "15px", whiteSpace: "nowrap" }} >Gestión de solicitudes</h2>
                </header>

                <div className={styles.filtros}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <div className={styles.filtroCard} style={{ position: 'relative' }}>
                            <label>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </label>
                            <input
                                type="text"
                                placeholder="Buscar por nombre..."
                                value={busqueda}
                                onChange={handleBusquedaChange}
                                style={{
                                    width: '150px',
                                    padding: '5px',
                                    border: 'none',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <div className={styles.filtroCard} style={{display: 'flex', alignItems: 'center'}}>
                            <label htmlFor="filtro"><FontAwesomeIcon icon={faFilter} /> </label>
                            <select id="filtro" value={filtroEstado} onChange={handleFiltroCambio} >
                                <option value="">Todos</option>
                                <option value="pendiente">Pendiente</option>
                                <option value="aprobada">Aprobado</option>
                                <option value="rechazada">Rechazado</option>
                            </select>
                        </div>

                        <div className={styles.filtroCard} style={{display: 'flex', alignItems: 'center'}}>
                            <label htmlFor="orden"><FontAwesomeIcon icon={faSort} /></label>
                            <select id="orden" onChange={(e) => setOrden(e.target.value)}>
                                <option value="desc">Más reciente</option>
                                <option value="asc">Más antiguo</option>
                            </select>
                        </div>
                    </div>


                </div>

                <div className={styles.SubTitulo}>
                    <p>Listado de solicitudes <span style={{ fontWeight: 400 }}>{estado}</span></p>
                    <hr style={{ width: '25%', marginTop: '10px', marginBottom: '10px ', opacity: '50%' }} />
                </div>
                <div className={styles.content}>

                    {solicitudesFiltradas.length === 0 && (<p style={{ color: 'gray', margin: 'auto' }}> - Sin registros {estado}s -</p>)}
                    {solicitudesFiltradas.map((solicitud) => (
                        <div className={styles.card} key={solicitud.id} style={{ cursor: 'pointer' }} onClick={() => { navigate(`/panel-administrativo/solicitud/${solicitud.id}`) }}>
                            <div className={styles.estado}
                                style={{ backgroundColor: bgcolor(solicitud.estado) }}
                            >
                                <FontAwesomeIcon icon={iconos(solicitud.estado)} size='xl' style={{ color: 'white' }} />
                            </div>
                            <div className={styles.cardContent}>
                                <p style={{ color: bgcolor(solicitud.estado), fontSize: '0.7rem', fontWeight: '500', textTransform: 'capitalize' }}>{solicitud.estado}</p>
                                <p style={{ color: solicitud.nombre_locacion.length > 0 ? 'black' : 'red' }}>
                                    {solicitud.nombre_locacion.length > 0 ? solicitud.nombre_locacion : 'Sin nombre'}
                                </p>
                                <p style={{ color: solicitud.direccion.length > 0 ? 'gray' : 'red', fontSize: '0.9rem' }}>
                                    {solicitud.direccion.length > 0 ? solicitud.direccion : 'Sin dirección'}
                                </p>
                                <p style={{ color: 'gray', fontSize: '0.8rem' }}>
                                    Fecha Ingreso: {new Date(solicitud.fecha_ingreso).toLocaleDateString('es-CL', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    })}
                                </p>


                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </>

    )
}

export default ListSolicitudes;
