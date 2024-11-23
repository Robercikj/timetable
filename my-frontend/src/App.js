import React, {useState, useEffect} from 'react';
import {Card, CardContent, Typography, Button} from '@mui/material';
import axios from 'axios';
import './App.css';

const App = () => {
    const [role, setRole] = useState('');
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
    const [trainerId, setTrainerId] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [maxCapacity, setMaxCapacity] = useState("");
    const [message, setMessage] = useState("");
    const [successAddTrainerMessage, setSuccessAddTrainerMessage] = useState("");
    const [errorAddTrainerMessage, setErrorAddTrainerMessage] = useState("");
    const [successCreateLessonMessage, setSuccessCreateLessonMessage] = useState("");
    const [errorCreateLessonMessage, setErrorCreateLessonMessage] = useState("");
    const [successAddTraineeMessage, setSuccessAddTraineeMessage] = useState("");
    const [errorAddTraineeMessage, setErrorAddTraineeMessage] = useState("");
    const [successRegistrationMessage, setSuccessRegistrationMessage] = useState('');
    const [errorRegistrationMessage, setErrorRegistrationMessage] = useState('');
    const [lessons, setLessons] = useState([]);
    const [messageLesson, setMessageLesson] = useState("");
    const [selectedLessonId, setSelectedLessonId] = useState('');
    const [selectedTraineeId, setSelectedTraineeId] = useState('');


    const handleLogin = async () => {

        try {
            if (!nickname || !password) {
                setErrorMessage('Nickname i hasło są wymagane.');
                setSuccessMessage('');
                return;
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

            setIsLoggedIn(true);

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
            if (!nickname || !password ||!role) {
                setErrorRegistrationMessage('Nickname i hasło i opjca są wymagane.');
                setSuccessRegistrationMessage('');
                return;
            }

            const response = await axios.post('http://localhost:8080/api/v1/timetable/register', {
                username: nickname,
                password: password,
                role: role,

            });

            setSuccessRegistrationMessage('Rejestracja udana! Możesz się teraz zalogować.');
            setErrorRegistrationMessage('');
            localStorage.setItem('userRole', role);

        } catch (error) {
            if (error.response) {
                setErrorRegistrationMessage(`Błąd rejestracji: ${error.response.data.message || 'Spróbuj ponownie.'}`);
            } else if (error.request) {
                setErrorRegistrationMessage('Brak odpowiedzi od serwera.');
            } else {
                setErrorRegistrationMessage(`Błąd: ${error.message}`);
            }
            setSuccessRegistrationMessage('');
        }
    };


    // Funkcja obsługująca dodanie trenera
    const handleAddTrainer = async () => {

        try {
            if (!trainerName) {
                setErrorAddTrainerMessage('Nazwa trenera jest wymagana.');
                setSuccessAddTrainerMessage('');
                return;
            }
            const token = localStorage.getItem('jwt-token');
            console.log("Token:", token);
            const response = await axios.post('http://localhost:8080/api/v1/trainer/add_trainer', {
                    name: trainerName,
                    surname: trainerName
                },
                {
                    headers:
                        {'Authorization': token}
                }
            );

            console.log(response)

            setSuccessAddTrainerMessage('Trener dodany pomyślnie.');
            setErrorAddTrainerMessage('');
            setTrainerName('');
            fetchTrainers();

        } catch (error) {

            if (error.response) {
                setErrorAddTrainerMessage(`Błąd dodawania trenera: ${error.response.data.message || 'Spróbuj ponownie.'}`);
            } else if (error.request) {
                setErrorAddTrainerMessage('Brak odpowiedzi od serwera.');
            } else {
                setErrorAddTrainerMessage(`Błąd: ${error.message}`);
            }
            setSuccessAddTrainerMessage('');
        }
    };

    // Funkcja obsługująca dodanie podopiecznego
    const handleAddTrainee = async () => {
        try {
            if (!traineeName) {
                setErrorAddTraineeMessage('Nazwa podopiecznego jest wymagana.');
                setSuccessAddTraineeMessage('');
                return;
            }
            const token = localStorage.getItem('jwt-token');

            const response = await axios.post('http://localhost:8080/api/v1/trainee/add_trainees', {
                    name: traineeName,
                },
                {
                    headers:
                        {'Authorization': token}
                }
            );

            setSuccessAddTraineeMessage('Podopieczny dodany pomyślnie.');
            setErrorAddTraineeMessage('');
            setTraineeName('');
            fetchTrainees();

        } catch (error) {
            if (error.response) {
                setErrorAddTraineeMessage(`Błąd dodawania podopiecznego: ${error.response.data.message || 'Spróbuj ponownie.'}`);
            } else if (error.request) {
                setErrorAddTraineeMessage('Brak odpowiedzi od serwera.');
            } else {
                setErrorAddTraineeMessage(`Błąd: ${error.message}`);
            }
            setSuccessAddTraineeMessage('');
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

            console.log('Przypisywanie:', selectedTrainer, selectedTrainee);
            const token = localStorage.getItem('jwt-token');

            const response = await axios.put(`http://localhost:8080/api/v1/trainer/${selectedTrainer}/add_trainee/${selectedTrainee}`,
                {},
                {
                    headers:
                        {'Authorization': token}
                }
            );

            setSuccessMessage('Podopieczny przypisany do trenera pomyślnie.');
            setErrorMessage('');
            setSelectedTrainer('');
            setSelectedTrainee('');
            fetchTrainees();
            fetchTrainers();

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
                {
                    headers:
                        {'Authorization': token}
                }
            );
            console.log('Trenerzy:', response.data);
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
                {
                    headers:
                        {'Authorization': token}
                }
            );
            console.log('Podopieczni:', response.data);
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
            <div className="tile" onClick={() => setCurrentPage('home')}>
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

// Definicja funkcji fetchLessons
    const fetchLessons = async () => {
        try {
            const token = localStorage.getItem('jwt-token');
            if (!token) {
                setMessageLesson("Brak tokenu autoryzacji. Zaloguj się ponownie.");
                return;
            }

            const response = await axios.get("http://localhost:8080/api/v1/lesson", {
                headers: {'Authorization': token}
            });

            setLessons(response.data);
            setMessageLesson("Lista lekcji została załadowana.");
        } catch (error) {
            setMessageLesson("Wystąpił błąd podczas pobierania lekcji.");
            console.error(error);
        }
    };

// Hook useEffect do pobierania lekcji przy pierwszym renderowaniu
    useEffect(() => {
        fetchLessons();
    }, []);

// Funkcja do tworzenia lekcji
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!trainerId || !startTime || !endTime || isNaN(maxCapacity) || maxCapacity <= 0) {
            setMessage('Wszystkie pola muszą być wypełnione. Sprawdź, czy podano prawidłowego trenera, czas rozpoczęcia, czas zakończenia oraz maksymalną pojemność.');
            return;
        }

        const lessonData = {
            trainerId: trainerId,
            startTime: startTime.replace("T", " "),
            endTime: endTime.replace("T", " "),
            maxCapacity: parseInt(maxCapacity),
        };

        if (new Date(startTime) >= new Date(endTime)) {
            setMessage('Czas zakończenia musi być późniejszy niż czas rozpoczęcia.');
            return;
        }

        const token = localStorage.getItem('jwt-token');
        if (!token) {
            setMessage("Brak tokenu autoryzacji. Zaloguj się ponownie.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/v1/lesson", lessonData, {
                headers: {'Authorization': token},
            });

            setMessage("Lekcja została pomyślnie utworzona!");
            fetchLessons(); // Odśwież listę lekcji po utworzeniu nowej
            console.log(response.data);
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(`Błąd: ${error.response.data.message || 'Spróbuj ponownie.'}`);
            } else {
                setMessage("Wystąpił błąd podczas tworzenia lekcji.");
            }
            console.error(error);
        }
    };
    const assignTraineeToLesson = async () => {
        try {
            const token = localStorage.getItem('jwt-token');
            if (!token) {
                setMessage("Brak tokenu autoryzacji. Zaloguj się ponownie.");
                return;
            }

            const response = await axios.put(`http://localhost:8080/api/v1/lesson/${selectedLessonId}/assignTrainee/${selectedTraineeId}`, null, {
                headers: {'Authorization': token},
            });
            if (response.status === 200) {
                setMessage(`Podopieczny został przypisany do lekcji.`);
                // Możesz odświeżyć listę zajęć tutaj, jeśli to konieczne
            }
        } catch (error) {
            console.error('Błąd podczas przypisywania podopiecznego do lekcji:', error);
            setMessage(`Nie udało się przypisać podopiecznego do lekcji: ${error.response.data.message}`);
        }
    };


// Funkcja do renderowania tabeli trenerów i podopiecznych
    const renderTrainersAndTraineesTable = () => (
        <div className="table-container">
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
                            <td>{trainee.trainer ? trainee.trainer.name : 'Brak'}</td>
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
                        <div className="flex-container">
                            <div className="form-container">
                                <h2 className="form-header">Przypisz Podopiecznego do Lekcji</h2>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    assignTraineeToLesson();
                                }} style={{textAlign: "left"}}>
                                    <div>
                                        <label>ID Lekcji: </label>
                                        <input
                                            type="text"
                                            value={selectedLessonId}
                                            onChange={(e) => setSelectedLessonId(e.target.value)}
                                            required
                                            className="select-input"
                                        />
                                    </div>
                                    <div>
                                        <label>ID Podopiecznego: </label>
                                        <input
                                            type="text"
                                            value={selectedTraineeId}
                                            onChange={(e) => setSelectedTraineeId(e.target.value)}
                                            required
                                            className="select-input"
                                        />
                                    </div>
                                    <button type="submit" className="button">
                                        Przypisz Podopiecznego
                                    </button>
                                </form>
                                {message && <p className="message">{message}</p>}
                            </div>

                            <div className="list-container">
                                <h2>Lista Zajęć</h2>
                                {messageLesson && <p>{messageLesson}</p>}
                                {lessons.length > 0 ? (
                                    <ul>
                                        {lessons.map((lesson) => (
                                            <li key={lesson.id}>
                                                Trener ID: {lesson.trainerId}, Start: {lesson.startTime},
                                                Koniec: {lesson.endTime}, Pojemność: {lesson.maxCapacity}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Brak zajęć do wyświetlenia.</p>
                                )}
                            </div>
                        </div>
                    )}


                    {currentPage === 'trainers' && (
                        <div className="container"
                             style={{display: "flex", flexDirection: "column", alignItems: "center", padding: "20px"}}>

                            {/* Formularz dodawania trenera */}
                            <div className="form-container" style={{width: "300px", marginBottom: "20px"}}>
                                <h2 className="form-header" style={{textAlign: "center"}}>Dodaj Trenera</h2>
                                <input
                                    type="text"
                                    placeholder="Nazwa trenera"
                                    value={trainerName}
                                    onChange={(e) => setTrainerName(e.target.value)}
                                    className="select-input"
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        marginBottom: "10px",
                                        border: "1px solid #ccc",
                                        borderRadius: "4px"
                                    }}
                                />
                                <button onClick={handleAddTrainer} className={`button button-add-trainer`} style={{
                                    width: "100%",
                                    padding: "10px",
                                    backgroundColor: "#4CAF50",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer"
                                }}>
                                    Dodaj Trenera
                                </button>
                                {successAddTrainerMessage && <p className="message" style={{
                                    color: "green",
                                    textAlign: "center"
                                }}>{successAddTrainerMessage}</p>}
                                {errorAddTrainerMessage && <p className="message" style={{
                                    color: "red",
                                    textAlign: "center"
                                }}>{errorAddTrainerMessage}</p>}
                            </div>

                            {/* Formularz tworzenia lekcji */}
                            <div className="form-container" style={{width: "300px", marginBottom: "20px"}}>
                                <h2 className="form-header" style={{textAlign: "center"}}>Utwórz Lekcję</h2>
                                <form onSubmit={handleSubmit} style={{textAlign: "left"}}>
                                    <div>
                                        <label>ID Trenera: </label>
                                        <input
                                            type="text"
                                            value={trainerId}
                                            onChange={(e) => setTrainerId(e.target.value)}
                                            required
                                            className="select-input"
                                            style={{
                                                width: "100%",
                                                padding: "10px",
                                                marginBottom: "10px",
                                                border: "1px solid #ccc",
                                                borderRadius: "4px"
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label>Godzina rozpoczęcia: </label>
                                        <input
                                            type="datetime-local"
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                            required
                                            className="select-input"
                                            style={{
                                                width: "100%",
                                                padding: "10px",
                                                marginBottom: "10px",
                                                border: "1px solid #ccc",
                                                borderRadius: "4px"
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label>Godzina zakończenia: </label>
                                        <input
                                            type="datetime-local"
                                            value={endTime}
                                            onChange={(e) => setEndTime(e.target.value)}
                                            required
                                            className="select-input"
                                            style={{
                                                width: "100%",
                                                padding: "10px",
                                                marginBottom: "10px",
                                                border: "1px solid #ccc",
                                                borderRadius: "4px"
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label>Maksymalna liczba uczestników: </label>
                                        <input
                                            type="number"
                                            value={maxCapacity}
                                            onChange={(e) => setMaxCapacity(e.target.value)}
                                            required
                                            className="select-input"
                                            style={{
                                                width: "100%",
                                                padding: "10px",
                                                marginBottom: "10px",
                                                border: "1px solid #ccc",
                                                borderRadius: "4px"
                                            }}
                                        />
                                    </div>
                                    <button type="submit" className={`button button-create-lesson`} style={{
                                        width: "100%",
                                        padding: "10px",
                                        backgroundColor: "#2196F3",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer"
                                    }}>
                                        Utwórz Lekcję
                                    </button>
                                </form>
                                {message && <p className="message">{message}</p>}
                            </div>
                        </div>
                    )}


                    {currentPage === 'trainees' && (
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "20px",
                            backgroundColor: "#f9f9f9"
                        }}>

                            {/* Formularz dodawania podopiecznego */}
                            <div className="form-container" style={{
                                width: "300px",
                                padding: "20px",
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                backgroundColor: "#fff",
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                marginBottom: "20px"
                            }}>
                                <h2 style={{textAlign: "center"}}>Dodaj Podopiecznego</h2>
                                <input
                                    type="text"
                                    placeholder="Nazwa podopiecznego"
                                    value={traineeName}
                                    onChange={(e) => setTraineeName(e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        marginBottom: "10px",
                                        border: "1px solid #ccc",
                                        borderRadius: "4px"
                                    }}
                                />
                                <button onClick={handleAddTrainee} style={{
                                    width: "100%",
                                    padding: "10px",
                                    backgroundColor: "#4CAF50",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer"
                                }}>
                                    Dodaj Podopiecznego
                                </button>
                                {successAddTraineeMessage && <p className="message" style={{
                                    color: "green",
                                    textAlign: "center"
                                }}>{successAddTraineeMessage}</p>}
                                {errorAddTraineeMessage && <p className="message" style={{
                                    color: "red",
                                    textAlign: "center"
                                }}>{errorAddTraineeMessage}</p>}
                            </div>

                            {/* Formularz przypisywania podopiecznego do trenera */}
                            <div className="form-container" style={{
                                width: "300px",
                                padding: "20px",
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                backgroundColor: "#fff",
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                marginBottom: "20px"
                            }}>
                                <h2 style={{textAlign: "center"}}>Przypisz Podopiecznego do Trenera</h2>
                                <select value={selectedTrainer} onChange={(e) => setSelectedTrainer(e.target.value)}
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            marginBottom: "10px",
                                            border: "1px solid #ccc",
                                            borderRadius: "4px"
                                        }}>
                                    <option value="">Wybierz trenera</option>
                                    {trainers.map((trainer) => (
                                        <option key={trainer.id} value={trainer.id}>
                                            {trainer.name}
                                        </option>
                                    ))}
                                </select>

                                <select value={selectedTrainee} onChange={(e) => setSelectedTrainee(e.target.value)}
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            marginBottom: "10px",
                                            border: "1px solid #ccc",
                                            borderRadius: "4px"
                                        }}>
                                    <option value="">Wybierz podopiecznego</option>
                                    {trainees.map((trainee) => (
                                        <option key={trainee.id} value={trainee.id}>
                                            {trainee.name}
                                        </option>
                                    ))}
                                </select>

                                <button onClick={handleAssignTraineeToTrainer} style={{
                                    width: "100%",
                                    padding: "10px",
                                    backgroundColor: "#2196F3",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer"
                                }}>
                                    Przypisz podopiecznego do trenera
                                </button>
                                {successMessage && <p className="message" style={{
                                    color: "green",
                                    textAlign: "center"
                                }}>{successMessage}</p>}
                                {errorMessage && <p className="message"
                                                    style={{color: "red", textAlign: "center"}}>{errorMessage}</p>}
                            </div>

                            {/* Wyświetlanie tabeli trenerów i podopiecznych */}
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                marginTop: "20px"
                            }}>
                                <h2 style={{textAlign: "center"}}>Tabela Trenerów i Podopiecznych</h2>
                                <div style={{overflowX: "auto", width: "100%", maxWidth: "600px"}}>
                                    <table style={{width: "100%", borderCollapse: "collapse"}}>
                                        <thead>
                                        <tr>
                                            <th style={{
                                                border: "1px solid #ccc",
                                                padding: "8px",
                                                textAlign: "center"
                                            }}>ID Podopiecznego
                                            </th>
                                            <th style={{
                                                border: "1px solid #ccc",
                                                padding: "8px",
                                                textAlign: "center"
                                            }}>Nazwa Podopiecznego
                                            </th>
                                            <th style={{
                                                border: "1px solid #ccc",
                                                padding: "8px",
                                                textAlign: "center"
                                            }}>ID Trenera
                                            </th>
                                            <th style={{
                                                border: "1px solid #ccc",
                                                padding: "8px",
                                                textAlign: "center"
                                            }}>Nazwa Trenera
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {trainees.map((trainee) => (
                                            <tr key={trainee.id}>
                                                <td style={{
                                                    border: "1px solid #ccc",
                                                    padding: "8px",
                                                    textAlign: "center"
                                                }}>{trainee.id}</td>
                                                <td style={{
                                                    border: "1px solid #ccc",
                                                    padding: "8px",
                                                    textAlign: "center"
                                                }}>{trainee.name}</td>
                                                <td style={{
                                                    border: "1px solid #ccc",
                                                    padding: "8px",
                                                    textAlign: "center"
                                                }}>{trainee.trainer ? trainee.trainer.id : 'Brak'}</td>
                                                <td style={{
                                                    border: "1px solid #ccc",
                                                    padding: "8px",
                                                    textAlign: "center"
                                                }}>{trainee.trainer ? trainee.trainer.name : 'Brak'}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
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
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value=" "> Wybierz opcje</option>
                                <option value="trainer">Trener</option>
                                <option value="trainee">Podopieczny</option>

                            </select>
                            <button onClick={handleRegister}>Zarejestruj się </button>
                            <button onClick={() => setIsRegistering(false)}>Masz już konto? Zaloguj się</button>
                            {errorRegistrationMessage && <p style={{ color: 'red' }}>{errorRegistrationMessage}</p>}
                            {successRegistrationMessage && <p style={{ color: 'green' }}>{successRegistrationMessage}</p>}
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