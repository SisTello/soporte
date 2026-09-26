import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './NuevaSolicitud.scss';

const NuevaSolicitud = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        categoria: '',
        prioridad: 'Media',
        asunto: '',
        descripcion: '',
        sucursal: '',
        area: '',
        ubicacion: '',
        tipoActivo: '',
        codigoActivo: '',
        disponibilidad: ''
    });

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    const handleSubmit = (event) => {

        event.preventDefault();

        /*
         * Por ahora solamente simulamos el registro.
         * Más adelante enviaremos formData al backend.
         */

        console.log('Solicitud:', formData);

        alert(
            'Solicitud registrada correctamente.\n\n' +
            'Esta operación actualmente es simulada.'
        );

        navigate('/solicitudes/mis-solicitudes');
    };


    const handleCancel = () => {

        navigate('/inicio');
    };


    return (

        <div className="new-request-page">

            {/* ========================================
                ENCABEZADO
            ========================================= */}

            <div className="page-header">

                <div>

                    <div className="breadcrumb-custom">

                        <span>
                            Solicitudes
                        </span>

                        <i className="bi bi-chevron-right"></i>

                        <strong>
                            Nueva solicitud
                        </strong>

                    </div>

                    <h1>
                        Nueva solicitud
                    </h1>

                    <p>
                        Registra una solicitud de soporte o mantenimiento.
                    </p>

                </div>

            </div>


            {/* ========================================
                FORMULARIO
            ========================================= */}

            <form
                className="request-form"
                onSubmit={handleSubmit}
            >

                {/* ========================================
                    INFORMACIÓN PRINCIPAL
                ========================================= */}

                <div className="form-section">

                    <div className="section-header">

                        <div className="section-icon blue">
                            <i className="bi bi-ticket-perforated"></i>
                        </div>

                        <div>

                            <h2>
                                Información de la solicitud
                            </h2>

                            <p>
                                Describe brevemente el problema o requerimiento.
                            </p>

                        </div>

                    </div>


                    <div className="row g-4">

                        {/* Categoría */}

                        <div className="col-md-6">

                            <label
                                htmlFor="categoria"
                                className="form-label"
                            >
                                Categoría
                                <span className="required">*</span>
                            </label>

                            <select
                                id="categoria"
                                name="categoria"
                                className="form-select"
                                value={formData.categoria}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Seleccione una categoría
                                </option>

                                <option value="hardware">
                                    Hardware
                                </option>

                                <option value="software">
                                    Software
                                </option>

                                <option value="redes">
                                    Redes y conectividad
                                </option>

                                <option value="sistemas">
                                    Sistemas / Aplicaciones
                                </option>

                                <option value="impresoras">
                                    Impresoras
                                </option>

                                <option value="mantenimiento">
                                    Mantenimiento
                                </option>

                                <option value="accesos">
                                    Accesos y cuentas
                                </option>

                                <option value="otro">
                                    Otro
                                </option>

                            </select>

                        </div>


                        {/* Prioridad */}

                        <div className="col-md-6">

                            <label
                                htmlFor="prioridad"
                                className="form-label"
                            >
                                Prioridad
                                <span className="required">*</span>
                            </label>

                            <select
                                id="prioridad"
                                name="prioridad"
                                className="form-select"
                                value={formData.prioridad}
                                onChange={handleChange}
                                required
                            >

                                <option value="Baja">
                                    Baja
                                </option>

                                <option value="Media">
                                    Media
                                </option>

                                <option value="Alta">
                                    Alta
                                </option>

                                <option value="Critica">
                                    Crítica
                                </option>

                            </select>

                        </div>


                        {/* Asunto */}

                        <div className="col-12">

                            <label
                                htmlFor="asunto"
                                className="form-label"
                            >
                                Asunto
                                <span className="required">*</span>
                            </label>

                            <input
                                type="text"
                                id="asunto"
                                name="asunto"
                                className="form-control"
                                placeholder="Ej.: Computadora no enciende"
                                value={formData.asunto}
                                onChange={handleChange}
                                maxLength="150"
                                required
                            />

                        </div>


                        {/* Descripción */}

                        <div className="col-12">

                            <label
                                htmlFor="descripcion"
                                className="form-label"
                            >
                                Descripción del problema o requerimiento
                                <span className="required">*</span>
                            </label>

                            <textarea
                                id="descripcion"
                                name="descripcion"
                                className="form-control"
                                rows="5"
                                placeholder="Describa el problema, mensaje de error, comportamiento observado o detalle del requerimiento..."
                                value={formData.descripcion}
                                onChange={handleChange}
                                required
                            />

                            <div className="field-help">
                                Mientras más información proporciones,
                                más fácil será atender la solicitud.
                            </div>

                        </div>

                    </div>

                </div>


                {/* ========================================
                    UBICACIÓN
                ========================================= */}

                <div className="form-section">

                    <div className="section-header">

                        <div className="section-icon green">
                            <i className="bi bi-geo-alt"></i>
                        </div>

                        <div>

                            <h2>
                                Ubicación
                            </h2>

                            <p>
                                Indica dónde se encuentra el equipo o servicio.
                            </p>

                        </div>

                    </div>


                    <div className="row g-4">

                        <div className="col-md-4">

                            <label
                                htmlFor="sucursal"
                                className="form-label"
                            >
                                Sucursal
                                <span className="required">*</span>
                            </label>

                            <select
                                id="sucursal"
                                name="sucursal"
                                className="form-select"
                                value={formData.sucursal}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Seleccione
                                </option>

                                <option value="central">
                                    Casa Matriz
                                </option>

                                <option value="sucursal-1">
                                    Sucursal 1
                                </option>

                                <option value="sucursal-2">
                                    Sucursal 2
                                </option>

                            </select>

                        </div>


                        <div className="col-md-4">

                            <label
                                htmlFor="area"
                                className="form-label"
                            >
                                Área / Departamento
                            </label>

                            <input
                                type="text"
                                id="area"
                                name="area"
                                className="form-control"
                                placeholder="Ej.: Administración"
                                value={formData.area}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="col-md-4">

                            <label
                                htmlFor="ubicacion"
                                className="form-label"
                            >
                                Ubicación específica
                            </label>

                            <input
                                type="text"
                                id="ubicacion"
                                name="ubicacion"
                                className="form-control"
                                placeholder="Ej.: Oficina 204"
                                value={formData.ubicacion}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                </div>


                {/* ========================================
                    ACTIVO RELACIONADO
                ========================================= */}

                <div className="form-section">

                    <div className="section-header">

                        <div className="section-icon yellow">
                            <i className="bi bi-pc-display"></i>
                        </div>

                        <div>

                            <h2>
                                Activo relacionado
                            </h2>

                            <p>
                                Opcional. Indica el equipo involucrado en la solicitud.
                            </p>

                        </div>

                    </div>


                    <div className="row g-4">

                        <div className="col-md-6">

                            <label
                                htmlFor="tipoActivo"
                                className="form-label"
                            >
                                Tipo de activo
                            </label>

                            <select
                                id="tipoActivo"
                                name="tipoActivo"
                                className="form-select"
                                value={formData.tipoActivo}
                                onChange={handleChange}
                            >

                                <option value="">
                                    No especificado
                                </option>

                                <option value="computadora">
                                    Computadora
                                </option>

                                <option value="impresora">
                                    Impresora
                                </option>

                                <option value="biomedico">
                                    Equipo biomédico
                                </option>

                                <option value="camara">
                                    Cámara
                                </option>

                                <option value="red">
                                    Equipo de red
                                </option>

                                <option value="otro">
                                    Otro
                                </option>

                            </select>

                        </div>


                        <div className="col-md-6">

                            <label
                                htmlFor="codigoActivo"
                                className="form-label"
                            >
                                Código / Número de inventario
                            </label>

                            <input
                                type="text"
                                id="codigoActivo"
                                name="codigoActivo"
                                className="form-control"
                                placeholder="Ej.: ACT-00125"
                                value={formData.codigoActivo}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                </div>


                {/* ========================================
                    DISPONIBILIDAD
                ========================================= */}

                <div className="form-section">

                    <div className="section-header">

                        <div className="section-icon red">
                            <i className="bi bi-clock"></i>
                        </div>

                        <div>

                            <h2>
                                Disponibilidad
                            </h2>

                            <p>
                                Información útil para coordinar la atención.
                            </p>

                        </div>

                    </div>


                    <div className="row g-4">

                        <div className="col-md-8">

                            <label
                                htmlFor="disponibilidad"
                                className="form-label"
                            >
                                Horario o disponibilidad para atención
                            </label>

                            <input
                                type="text"
                                id="disponibilidad"
                                name="disponibilidad"
                                className="form-control"
                                placeholder="Ej.: Disponible de 08:00 a 17:00"
                                value={formData.disponibilidad}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                </div>


                {/* ========================================
                    ADJUNTOS
                ========================================= */}

                <div className="form-section">

                    <div className="section-header">

                        <div className="section-icon blue">
                            <i className="bi bi-paperclip"></i>
                        </div>

                        <div>

                            <h2>
                                Archivos adjuntos
                            </h2>

                            <p>
                                Puedes adjuntar imágenes o documentos relacionados.
                            </p>

                        </div>

                    </div>


                    <div className="upload-box">

                        <i className="bi bi-cloud-arrow-up"></i>

                        <strong>
                            Adjuntar archivos
                        </strong>

                        <span>
                            Arrastra archivos aquí o selecciona desde tu equipo.
                        </span>

                        <input
                            type="file"
                            className="form-control mt-3"
                            multiple
                        />

                        <small>
                            Esta función será conectada al almacenamiento
                            cuando implementemos el backend.
                        </small>

                    </div>

                </div>


                {/* ========================================
                    ACCIONES
                ========================================= */}

                <div className="form-actions">

                    <button
                        type="button"
                        className="btn btn-light btn-cancel"
                        onClick={handleCancel}
                    >
                        <i className="bi bi-x-lg me-2"></i>
                        Cancelar
                    </button>


                    <button
                        type="submit"
                        className="btn btn-submit"
                    >
                        <i className="bi bi-send me-2"></i>
                        Registrar solicitud
                    </button>

                </div>

            </form>

        </div>
    );
};

export default NuevaSolicitud;