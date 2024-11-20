import React, { useState, useEffect } from 'react';

const Time = () => {
  const [seconds, setSeconds] = useState(0); // Estado para los segundos totales
  const [isRunning, setIsRunning] = useState(false); // Estado para controlar si el cronómetro está corriendo
  const [laps, setLaps] = useState([]); // Estado para almacenar las vueltas
  const [lapTime, setLapTime] = useState(0); // Estado para el tiempo de la vuelta actual

  // Efecto para iniciar y detener el cronómetro
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds((prev) => prev + 1); // Aumentar los segundos cada 1 segundo
        setLapTime((prev) => prev + 1); // Aumentar el tiempo parcial de la vuelta
      }, 1000);
    } else {
      clearInterval(intervalId); // Detener el intervalo cuando no esté corriendo
    }

    // Limpiar intervalo al desmontar el componente o cuando se cambie el estado
    return () => clearInterval(intervalId);
  }, [isRunning]); // Solo depende de 'isRunning'

  // Función para alternar entre iniciar y pausar el cronómetro
  const startStop = () => {
    setIsRunning((prev) => !prev); // Alternar entre corriendo y pausado
  };

  // Función para reiniciar el cronómetro
  const reset = () => {
    setIsRunning(false); // Pausar el cronómetro
    setSeconds(0); // Reiniciar los segundos a 0
    setLaps([]); // Borrar las vueltas registradas
    setLapTime(0); // Reiniciar el tiempo de la vuelta actual
  };

  // Función para registrar una vuelta
  const recordLap = () => {
    setLaps((prevLaps) => [...prevLaps, formatTime(lapTime)]); // Agregar la vuelta a la lista
    setLapTime(0); // Reiniciar el tiempo de la vuelta
  };

  // Convertir los segundos a formato de minutos:segundos
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="timer">
      <div className="time-display">
        <h1>Total: {formatTime(seconds)}</h1>
        <h2>Vuelta: {formatTime(lapTime)}</h2>
      </div>
      <div className="controls">
        <button onClick={startStop}>{isRunning ? 'Pausar' : 'Iniciar'}</button>
        <button onClick={reset}>Reiniciar</button>
        {isRunning && <button onClick={recordLap}>Registrar Vuelta</button>}
      </div>
      <div className="laps">
        <h3>Vueltas</h3>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>Vuelta {index + 1}: {lap}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Time;
