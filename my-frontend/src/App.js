import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(true);
  const [trainerName, setTrainerName] = useState('');
  const [traineeName, setTraineeName] = useState('');
  const [trainers, setTrainers] = useState([]);
  const [trainees, setTrainees] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [selectedTrainee, setSelectedTrainee] = useState('');

  // Funkcja obsługująca logowanie
  const handleLogin = async () => {
    try {
      if (!nickname || !password) {
        setErrorMessage('Nickname i hasło są wymagane.');
        setSuccessMessage('');
        return;
      }

      const response = await axios.post('http://localhost:8080/api/v1/timetable/login', {
        nickname: nickname,
        password: password,
      });

      const userData = response.data;
      setUser(userData);
      setSuccessMessage(`Witaj ${userData.nickname}! Logowanie udane.`);
      setErrorMessage('');

      // Po zalogowaniu, pobierz dane o trenerach i podopiecznych
      fetchTrainers();
      fetchTrainees();

    } catch (error) {
      if (error.response) {
        setErrorMessage(`Błąd logowania: ${error.response.data.message || 'Spróbuj ponownie.'}`);
      } else if (error.request) {
        setErrorMessage('Brak odpowiedzi od serwera.');
      } else {
        setErrorMessage(`Błąd: ${error.message}`);
      }
      setSuccessMessage('');
    }
  };

  // Funkcja obsługująca rejestrację
  const handleRegister = async () => {
    try {
      if (!nickname || !password) {
        setErrorMessage('Nickname i hasło są wymagane.');
        setSuccessMessage('');
        return;
      }

      const response = await axios.post('http://localhost:8080/api/v1/timetable/register', {
        nickname: nickname,
        password: password,
      });

      setSuccessMessage('Rejestracja udana! Możesz się teraz zalogować.');
      setErrorMessage('');

    } catch (error) {
      if (error.response) {
        setErrorMessage(`Błąd rejestracji: ${error.response.data.message || 'Spróbuj ponownie.'}`);
      } else if (error.request) {
        setErrorMessage('Brak odpowiedzi od serwera.');
      } else {
        setErrorMessage(`Błąd: ${error.message}`);
      }
      setSuccessMessage('');
    }
  };

  // Funkcja obsługująca dodanie trenera
  const handleAddTrainer = async () => {
    try {
      if (!trainerName) {
        setErrorMessage('Nazwa trenera jest wymagana.');
        setSuccessMessage('');
        return;
      }

      const response = await axios.post('http://localhost:8080/api/v1/trainer/add_trainer', {
        name: trainerName,
      });

      setSuccessMessage('Trener dodany pomyślnie.');
      setErrorMessage('');
      setTrainerName('');
      fetchTrainers(); // Odśwież listę trenerów

    } catch (error) {
      if (error.response) {
        setErrorMessage(`Błąd dodawania trenera: ${error.response.data.message || 'Spróbuj ponownie.'}`);
      } else if (error.request) {
        setErrorMessage('Brak odpowiedzi od serwera.');
      } else {
        setErrorMessage(`Błąd: ${error.message}`);
      }
      setSuccessMessage('');
    }
  };

  // Funkcja obsługująca dodanie podopiecznego
  const handleAddTrainee = async () => {
    try {
      if (!traineeName) {
        setErrorMessage('Nazwa podopiecznego jest wymagana.');
        setSuccessMessage('');
        return;
      }

      const response = await axios.post('http://localhost:8080/api/v1/trainee/add_trainees', {
        name: traineeName,
      });

      setSuccessMessage('Podopieczny dodany pomyślnie.');
      setErrorMessage('');
      setTraineeName('');
      fetchTrainees(); // Odśwież listę podopiecznych

    } catch (error) {
      if (error.response) {
        setErrorMessage(`Błąd dodawania podopiecznego: ${error.response.data.message || 'Spróbuj ponownie.'}`);
      } else if (error.request) {
        setErrorMessage('Brak odpowiedzi od serwera.');
      } else {
        setErrorMessage(`Błąd: ${error.message}`);
      }
      setSuccessMessage('');
    }
  };

  // Funkcja obsługująca przypisanie podopiecznego do trenera
  const handleAssignTraineeToTrainer = async () => {
    try {
      if (!selectedTrainer || !selectedTrainee) {
        setErrorMessage('Wybierz trenera i podopiecznego.');
        setSuccessMessage('');
        return;
      }

      console.log('Przypisywanie:', selectedTrainer, selectedTrainee); // Debug log

      const response = await axios.put(`http://localhost:8080/api/v1/trainer/${selectedTrainer}/add_trainee/${selectedTrainee}`);

      setSuccessMessage('Podopieczny przypisany do trenera pomyślnie.');
      setErrorMessage('');
      setSelectedTrainer('');
      setSelectedTrainee('');
      fetchTrainees(); // Odśwież listę podopiecznych
      fetchTrainers(); // Odśwież listę trenerów

    } catch (error) {
      if (error.response) {
        setErrorMessage(`Błąd przypisywania podopiecznego do trenera: ${error.response.data.message || 'Spróbuj ponownie.'}`);
      } else if (error.request) {
        setErrorMessage('Brak odpowiedzi od serwera.');
      } else {
        setErrorMessage(`Błąd: ${error.message}`);
      }
      setSuccessMessage('');
    }
  };

  // Funkcja do pobierania listy trenerów
  const fetchTrainers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/trainer/trainers');
      console.log('Trenerzy:', response.data); // Debug log
      setTrainers(response.data);
    } catch (error) {
      console.error('Błąd pobierania trenerów:', error);
    }
  };

  // Funkcja do pobierania listy podopiecznych
  const fetchTrainees = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/trainee/trainees');
      console.log('Podopieczni:', response.data); // Debug log
      setTrainees(response.data);
    } catch (error) {
      console.error('Błąd pobierania podopiecznych:', error);
    }
  };

  // Pobierz dane o trenerach i podopiecznych po zalogowaniu
  useEffect(() => {
    if (user) {
      fetchTrainers();
      fetchTrainees();
    }
  }, [user]);

  // Funkcja do renderowania tabeli trenerów i podopiecznych
  const renderTrainersAndTraineesTable = () => (
    <div>
      <h2>Trenerzy i Podopieczni</h2>
      <table>
        <thead>
          <tr>
            <th>ID Podopiecznego</th>
            <th>Nazwa Podopiecznego</th>
            <th>ID Trenera</th>
            <th>Nazwa Trenera</th>
          </tr>
        </thead>
        <tbody>
          {trainees.map((trainee) => {
            // Znajdź trenera przypisanego do danego podopiecznego
            const trainer = trainers.find((trainer) => trainer.id === trainee.trainerId);
            return (
              <tr key={trainee.id}>
                <td>{trainee.id}</td>
                <td>{trainee.name}</td>
                <td>{trainer ? trainer.id : 'Brak'}</td>
                <td>{trainer ? trainer.name : 'Brak'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="App">
      {user ? (
        <div>
          {/* Formularz dodawania trenera */}
          <div>
            <input
              type="text"
              placeholder="Nazwa trenera"
              value={trainerName}
              onChange={(e) => setTrainerName(e.target.value)}
            />
            <button onClick={handleAddTrainer}>Dodaj Trenera</button>
          </div>

          {/* Formularz dodawania podopiecznego */}
          <div>
            <input
              type="text"
              placeholder="Nazwa podopiecznego"
              value={traineeName}
              onChange={(e) => setTraineeName(e.target.value)}
            />
            <button onClick={handleAddTrainee}>Dodaj Podopiecznego</button>
          </div>

          {/* Formularz przypisywania podopiecznego do trenera */}
          <div>
            <select value={selectedTrainer} onChange={(e) => setSelectedTrainer(e.target.value)}>
              <option value="">Wybierz trenera</option>
              {trainers.map((trainer) => (
                <option key={trainer.id} value={trainer.id}>
                  {trainer.name}
                </option>
              ))}
            </select>

            <select value={selectedTrainee} onChange={(e) => setSelectedTrainee(e.target.value)}>
              <option value="">Wybierz podopiecznego</option>
              {trainees.map((trainee) => (
                <option key={trainee.id} value={trainee.id}>
                  {trainee.name}
                </option>
              ))}
            </select>

            <button onClick={handleAssignTraineeToTrainer}>Przypisz podopiecznego do trenera</button>
          </div>

          {/* Komunikaty */}
          {successMessage && <div className="success-message">{successMessage}</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          {/* Wyświetlanie tabeli trenerów i podopiecznych */}
          {renderTrainersAndTraineesTable()}
        </div>
      ) : (
        <div>
          {isRegistering ? (
            <div>
              <h2>Rejestracja</h2>
              <input
                type="text"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <input
                type="password"
                placeholder="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleRegister}>Zarejestruj</button>
              <button onClick={() => setIsRegistering(false)}>Masz już konto? Zaloguj się</button>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              {successMessage && <div className="success-message">{successMessage}</div>}
            </div>
          ) : (
            <div>
              <h2>Logowanie</h2>
              <input
                type="text"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <input
                type="password"
                placeholder="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleLogin}>Zaloguj</button>
              <button onClick={() => setIsRegistering(true)}>Nie masz konta? Zarejestruj się</button>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              {successMessage && <div className="success-message">{successMessage}</div>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
