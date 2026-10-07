import { useMemo, useState } from 'react';

import { mantenimientos } from '../../datos/mantenimientos';

import './Planificacion.scss';

const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const weekDays = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];

const eventIcons = {
    preventivo: 'bi-tools',
    correctivo: 'bi-exclamation-triangle',
};

const eventLabels = {
    preventivo: 'Preventivo',
    correctivo: 'Correctivo',
};

const parseFecha = (fechaTexto) => {
    const [dia, mes, anio] = fechaTexto.split('/').map(Number);
    return new Date(anio, mes - 1, dia);
};

const formatDayKey = (date) =>
    `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

const getMonthDays = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const previousMonthLastDay = new Date(year, month, 0).getDate();

    let startingDay = firstDay.getDay();
    startingDay = startingDay === 0 ? 6 : startingDay - 1;

    const days = [];

    for (let index = startingDay - 1; index >= 0; index -= 1) {
        days.push({
            day: previousMonthLastDay - index,
            currentMonth: false,
        });
    }

    for (let day = 1; day <= lastDay.getDate(); day += 1) {
        days.push({
            day,
            currentMonth: true,
        });
    }

    let nextDay = 1;
    while (days.length < 42) {
        days.push({
            day: nextDay,
            currentMonth: false,
        });
        nextDay += 1;
    }

    return days;
};

const Planificacion = () => {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [filters, setFilters] = useState({
        preventivo: true,
        correctivo: true,
    });

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const programados = useMemo(
        () => mantenimientos.filter((mantenimiento) => mantenimiento.estado === 'Programado'),
        []
    );

    const calendarEvents = useMemo(
        () =>
            programados.map((mantenimiento) => ({
                id: mantenimiento.id,
                title: mantenimiento.activo,
                date: formatDayKey(parseFecha(mantenimiento.fechaProgramada)),
                category: mantenimiento.tipo.toLowerCase() === 'correctivo' ? 'correctivo' : 'preventivo',
                type: mantenimiento.tipo,
                technician: mantenimiento.tecnico,
                branch: mantenimiento.sucursal,
                priority: mantenimiento.prioridad,
                categoryName: mantenimiento.categoria,
            })),
        [programados]
    );

    const days = useMemo(() => getMonthDays(year, month), [year, month]);
    const filteredEvents = useMemo(
        () => calendarEvents.filter((event) => filters[event.category] !== false),
        [calendarEvents, filters]
    );

    const getEventsForDay = (day) => {
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return filteredEvents.filter((event) => event.date === dateKey);
    };

    const changeMonth = (amount) => {
        setCurrentDate(new Date(year, month + amount, 1));
    };

    const goToToday = () => {
        setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    };

    const toggleFilter = (category) => {
        setFilters((current) => ({
            ...current,
            [category]: !current[category],
        }));
    };

    const monthTotal = filteredEvents.filter((event) => {
        const eventDate = new Date(`${event.date}T00:00:00`);
        return eventDate.getMonth() === month && eventDate.getFullYear() === year;
    }).length;

    return (
        <div className="planificacion-pagina">
            <div className="encabezado-mantenimiento">
                <div>
                    <span>Agenda técnica</span>
                    <h1>Planificación</h1>
                    <p>Consulta y gestiona las programaciones del calendario mensual.</p>
                </div>

                <button type="button" className="btn boton-planificar">
                    <i className="bi bi-plus-lg" />
                    Programar mantenimiento
                </button>
            </div>

            <div className="planificacion-resumen">
                <div>
                    <i className="bi bi-calendar-event" />
                    <span>Programados</span>
                    <strong>{programados.length}</strong>
                </div>

                <div>
                    <i className="bi bi-tools" />
                    <span>Mes actual</span>
                    <strong>{monthTotal}</strong>
                </div>

                <div>
                    <i className="bi bi-exclamation-triangle" />
                    <span>Prioridad alta</span>
                    <strong>{mantenimientos.filter((m) => m.prioridad === 'Alta').length}</strong>
                </div>
            </div>

            <section className="calendar-filters">
                <div className="calendar-filters__title">
                    <i className="bi bi-funnel" />
                    <span>Mostrar</span>
                </div>

                <div className="calendar-filters__items">
                    {Object.keys(eventLabels).map((category) => (
                        <label key={category} className="calendar-filter">
                            <input
                                type="checkbox"
                                checked={filters[category]}
                                onChange={() => toggleFilter(category)}
                            />
                            <span>{eventLabels[category]}</span>
                        </label>
                    ))}
                </div>
            </section>

            <section className="calendar-card">
                <div className="calendar-card__header">
                    <button type="button" className="calendar-navigation-btn" onClick={() => changeMonth(-1)} aria-label="Mes anterior">
                        <i className="bi bi-chevron-left" />
                    </button>

                    <h2>
                        {monthNames[month]} {year}
                    </h2>

                    <button type="button" className="calendar-navigation-btn" onClick={() => changeMonth(1)} aria-label="Mes siguiente">
                        <i className="bi bi-chevron-right" />
                    </button>
                </div>

                <div className="calendar-page__controls">
                    <button type="button" className="btn btn-outline-secondary" onClick={goToToday}>
                        <i className="bi bi-calendar-check" />
                        Hoy
                    </button>
                </div>

                <div className="calendar-weekdays">
                    {weekDays.map((day) => (
                        <div key={day} className="calendar-weekday">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="calendar-grid">
                    {days.map((calendarDay, index) => {
                        const dateKey = calendarDay.currentMonth ? `${year}-${String(month + 1).padStart(2, '0')}-${String(calendarDay.day).padStart(2, '0')}` : null;
                        const events = calendarDay.currentMonth ? getEventsForDay(calendarDay.day) : [];
                        const isToday = calendarDay.currentMonth && calendarDay.day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

                        return (
                            <div
                                key={`${dateKey ?? 'outside'}-${index}`}
                                className={`calendar-day ${calendarDay.currentMonth ? '' : 'calendar-day--outside'} ${isToday ? 'calendar-day--today' : ''}`}
                            >
                                <div className="calendar-day__number">{calendarDay.day}</div>

                                <div className="calendar-day__events">
                                    {events.slice(0, 2).map((event) => (
                                        <button
                                            type="button"
                                            key={event.id}
                                            className={`calendar-event calendar-event--${event.category}`}
                                            onClick={() => setSelectedEvent(event)}
                                        >
                                            <i className={`bi ${eventIcons[event.category]}`} />
                                            <span>{event.title}</span>
                                        </button>
                                    ))}

                                    {events.length > 2 && (
                                        <button type="button" className="calendar-more" onClick={() => setSelectedEvent(events[2])}>
                                            +{events.length - 2} más
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {selectedEvent && (
                <div className="calendar-modal-backdrop" onClick={() => setSelectedEvent(null)}>
                    <div className="calendar-modal" onClick={(event) => event.stopPropagation()}>
                        <div className="calendar-modal__header">
                            <div>
                                <span className="calendar-modal__category">{eventLabels[selectedEvent.category]}</span>
                                <h2>{selectedEvent.title}</h2>
                            </div>

                            <button type="button" className="calendar-modal__close" onClick={() => setSelectedEvent(null)} aria-label="Cerrar">
                                <i className="bi bi-x-lg" />
                            </button>
                        </div>

                        <div className="calendar-modal__body">
                            <div className="calendar-modal__info">
                                <i className="bi bi-calendar3" />
                                <span>{selectedEvent.date}</span>
                            </div>
                            <div className="calendar-modal__info">
                                <i className="bi bi-person" />
                                <span>{selectedEvent.technician}</span>
                            </div>
                            <div className="calendar-modal__info">
                                <i className="bi bi-building" />
                                <span>{selectedEvent.branch}</span>
                            </div>
                            <div className="calendar-modal__info">
                                <i className="bi bi-exclamation-triangle" />
                                <span>{selectedEvent.priority}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="agenda mt-4">
                <div className="agenda-titulo">
                    <i className="bi bi-calendar3" />
                    Próximos mantenimientos
                </div>

                {programados.map((mantenimiento) => (
                    <div className="agenda-item" key={mantenimiento.id}>
                        <div className="agenda-fecha">
                            <strong>{mantenimiento.fechaProgramada}</strong>
                            <span>{mantenimiento.tipo}</span>
                        </div>

                        <div className="agenda-contenido">
                            <h3>{mantenimiento.activo}</h3>
                            <p>{mantenimiento.categoria}</p>

                            <div>
                                <span>
                                    <i className="bi bi-person" />
                                    {mantenimiento.tecnico}
                                </span>
                                <span>
                                    <i className="bi bi-building" />
                                    {mantenimiento.sucursal}
                                </span>
                            </div>
                        </div>

                        <span className="agenda-estado">Programado</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Planificacion;
