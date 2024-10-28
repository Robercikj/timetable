import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
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
  const [currentPage, setCurrentPage] = useState('home');
  const [activeTab, setActiveTab] = useState('home'); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    
    try {
      if (!nickname || !password) {
        setErrorMessage('Nickname i hasło są wymagane.');
        setSuccessMessage('');
        return;
        setIsLoggedIn(true);
      }

      const response = await axios.post('http://localhost:8080/api/v1/timetable/login', {
        username: nickname,
        password: password,
      });

      const userData = response.data;
      localStorage.setItem('jwt-token', 'Bearer ' + userData.token);
      setUser(userData.username);
      localStorage.setItem('username', userData.username);
      setSuccessMessage(`Witaj ${userData.username}! Logowanie udane.`);
      setErrorMessage('');
      
      setActiveTab('home');
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
        username: nickname,
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
      const token = localStorage.getItem('jwt-token');
      const response = await axios.post('http://localhost:8080/api/v1/trainer/add_trainer', {
        name: trainerName,
      },
             {  headers:
                  { 'Authorization': token }
             }
      );

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
      const token = localStorage.getItem('jwt-token');

      const response = await axios.post('http://localhost:8080/api/v1/trainee/add_trainees', {
        name: traineeName,
      },
             {  headers:
                  { 'Authorization': token }
             }
      );

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
      const token = localStorage.getItem('jwt-token');

      const response = await axios.put(`http://localhost:8080/api/v1/trainer/${selectedTrainer}/add_trainee/${selectedTrainee}`,
             {},
             {  headers:
                  { 'Authorization': token }
             }
      );

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
          const token = localStorage.getItem('jwt-token');

      const response = await axios.get(
      'http://localhost:8080/api/v1/trainer/trainers',
       {  headers:
            { 'Authorization': token }
       }
      );
      console.log('Trenerzy:', response.data); // Debug log
      if (response.data) {
        setTrainers(response.data);
      }
    } catch (error) {
      console.error('Błąd pobierania trenerów:', error);
    }
  };

  // Funkcja do pobierania listy podopiecznych
  const fetchTrainees = async () => {
    try {
      const token = localStorage.getItem('jwt-token');
      const response = await axios.get('http://localhost:8080/api/v1/trainee/trainees',
       {  headers:
            { 'Authorization': token }
       }
      );
      console.log('Podopieczni:', response.data); // Debug log
      if (response.data) {
        setTrainees(response.data);
      }
    } catch (error) {
      console.error('Błąd pobierania podopiecznych:', error);
    }
  };

   function logout() {
      setUser(null);
      localStorage.removeItem('jwt-token');
      localStorage.removeItem('username');
      setActiveTab('home');
    }
    const renderHomeTiles = () => (
      <div className="tile">
    <div className="tile" onClick={() => setActiveTab('home')}>
      <h3>Strona główna</h3>
    </div>
    <div className="tile" onClick={() => setActiveTab('trainers')}>
      <h3>Trenerzy</h3>
    </div>
    <div className="tile" onClick={() => setActiveTab('trainees')}>
      <h3>Podopieczni</h3>
    </div>
  </div>
);
     // Funkcja do renderowania treści w zależności od zakładki
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
      return (
        <div>
          <h2>Witaj, {user}!</h2>
          <p>To jest strona główna.</p>
          {renderHomeTiles()}
        </div>
      );
    case 'trainers' :
      return (
        <div>
          <h2>Trenerzy</h2>
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
          {/* Wyświetlanie trenerów */}
          {renderTrainersAndTraineesTable()}
        </div>
      );    
    case 'trainees' :
      return (
        <div>
          <h2>Podopieczni</h2>
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
          {/* Wyświetlanie podopiecznych */}
          {renderTrainersAndTraineesTable()}
        </div>
        
      );  
default:
    return null;
    }
  };

  // Pobierz dane o trenerach i podopiecznych po zalogowaniu
  useEffect(() => {
    if (user) {
      fetchTrainers();
      fetchTrainees();
    }
  }, [user]);

    useEffect(() => {
        setUser(localStorage.getItem("username"));
    }, []);

    const renderHomePage = () => (
      <div>
        <h1>Witaj, {user}!</h1>
        <p>To jest strona główna aplikacji. Wybierz opcje z menu.</p>
      </div>
    );



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
            return (
              <tr key={trainee.id}>
                <td>{trainee.id}</td>
                <td>{trainee.name}</td>
                <td>{trainee.trainer ? trainee.trainer.id : 'Brak'}</td>
                <td>{trainee.trainer ? trainee.trainer.name : 'Brak' }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="App">
      {localStorage.getItem('jwt-token') ? (
        <div>
      
    
      <div className="tiles-container">
  <Card className='tile' onClick={() => setCurrentPage('home')}>
    <CardContent>
      <Typography variant="h6" component="div">
        Strona główna
      </Typography>
    </CardContent>
  </Card>
  <Card className='tile' onClick={() => setCurrentPage('trainers')}>
    <CardContent>
      <Typography variant="h6" component="div">
        Trenerzy
      </Typography>
    </CardContent>
  </Card>
  <Card className='tile' onClick={() => setCurrentPage('trainees')}>
    <CardContent>
      <Typography variant="h6" component="div">
        Podopieczni
      </Typography>
    </CardContent>
  </Card>
  <button className='tile logout-button' onClick={logout}>
    Wyloguj się
  </button>


</div>

        
  
          {/* Renderowanie treści w zależności od wybranej strony */}
          {currentPage === 'home' && (
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', textAlign: 'center' }}>
         <Typography variant="h5" component="div" style={{ fontWeight: 'normal' }}>
           Wybierz opcję w menu, aby zarządzać trenerami lub podopiecznymi
         </Typography>
        </div>
      
          )}


   {/* Formularz dodawania trenera */}

          {/* Formularz dodawania trenera */}
{currentPage === 'trainers' && (
  <div className="form-container">
    <input
      type="text"
      placeholder="Nazwa trenera"
      value={trainerName}
      onChange={(e) => setTrainerName(e.target.value)}
    />
    <button onClick={handleAddTrainer}>Dodaj Trenera</button>
  </div>
)}

{currentPage === 'trainees' && (
  <div className="form-container">
    {/* Formularz dodawania podopiecznego */}
    <input
      type="text"
      placeholder="Nazwa podopiecznego"
      value={traineeName}
      onChange={(e) => setTraineeName(e.target.value)}
    />
    <button onClick={handleAddTrainee}>Dodaj Podopiecznego</button>

    {/* Formularz przypisywania podopiecznego do trenera */}
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

    {/* Wyświetlanie tabeli trenerów i podopiecznych */}
    {renderTrainersAndTraineesTable()}
  </div>
)}

  
          
        </div>
      ) : (
        // Logowanie/Rejestracja, gdy użytkownik nie jest zalogowany
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;