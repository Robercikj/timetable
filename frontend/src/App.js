import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import './App.css';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import background from './background.jpg';
import { loginUser, registerUser } from './api'; // Importujemy funkcje z pliku api.js

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await loginUser({ email, password });
      localStorage.setItem('token', response.data.token);
      history.push('/'); // Przekieruj na stronę główną po zalogowaniu
    } catch (error) {
      console.error('Błąd logowania:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Zaloguj się</button>
    </div>
  );
}

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const history = useHistory();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Hasła nie są zgodne!');
      return;
    }
    try {
      await registerUser({ email, password });
      history.push('/login'); // Przekieruj na stronę logowania po rejestracji
    } catch (error) {
      console.error('Błąd rejestracji:', error);
    }
  };

  return (
    <div>
      <h2>Rejestracja</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Zarejestruj się</button>
    </div>
  );
}

function App() {
  const [trainers, setTrainers] = useState([]);
  const [trainee, setTrainee] = useState([]);
  const [isTrainerModalOpen, setIsTrainerModalOpen] = useState(false);
  const [isTraineeModalOpen, setIsTraineeModalOpen] = useState(false);
  const [newTrainer, setNewTrainer] = useState('');
  const [newTrainee, setNewTrainee] = useState('');

  const handleOpenTrainerModal = () => {
    setIsTrainerModalOpen(true);
  };

  const handleCloseTrainerModal = () => {
    setIsTrainerModalOpen(false);
    setNewTrainer('');
  };

  const handleOpenTraineeModal = () => {
    setIsTraineeModalOpen(true);
  };

  const handleCloseTraineeModal = () => {
    setIsTraineeModalOpen(false);
    setNewTrainee('');
  };

  const handleAddTrainer = () => {
    if (newTrainer.trim()) {
      setTrainers([...trainers, newTrainer]);
      handleCloseTrainerModal();
    }
  };

  const handleAddTrainee = () => {
    if (newTrainee.trim()) {
      setTrainee([...trainee, newTrainee]);
      handleCloseTraineeModal();
    }
  };

  const handleRemoveTrainer = (index) => {
    setTrainers(trainers.filter((_, i) => i !== index));
  };

  const handleRemoveTrainee = (index) => {
    setTrainee(trainee.filter((_, i) => i !== index));
  };

  return (
    <Router>
      <div className="App" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <header className="App-header">
          <nav>
            <Link to="/login">
              <Button variant="contained" color="primary">Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="contained" color="secondary">Register</Button>
            </Link>
          </nav>

          <p>Witaj sportowcu</p>

          {/* Sekcja dodawania trenera */}
          <Button variant="contained" color="primary" onClick={handleOpenTrainerModal}>
            Dodaj Trenera
          </Button>
          <ul>
            {trainers.map((trainer, index) => (
              <li key={index}>
                {trainer}
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleRemoveTrainer(index)}
                  style={{ marginLeft: '10px' }}
                >
                  Usuń trenera
                </Button>
              </li>
            ))}
          </ul>

          {/* Sekcja dodawania podopiecznego */}
          <Button variant="contained" color="primary" onClick={handleOpenTraineeModal}>
            Dodaj podopiecznego
          </Button>
          <ul>
            {trainee.map((trainee, index) => (
              <li key={index}>
                {trainee}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleRemoveTrainee(index)}
                  style={{ marginLeft: '10px' }}
                >
                  Usuń podopiecznego
                </Button>
              </li>
            ))}
          </ul>
        </header>

        {/* Dialogi do dodawania trenerów i podopiecznych */}
        <Dialog open={isTrainerModalOpen} onClose={handleCloseTrainerModal}>
          <DialogTitle>Podaj imię trenera</DialogTitle>
          <DialogContent>
            <DialogContentText>Wpisz imię trenera, który zostanie dodany do listy</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Imię trenera"
              type="text"
              fullWidth
              value={newTrainer}
              onChange={(e) => setNewTrainer(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseTrainerModal} color="primary">
              Anuluj
            </Button>
            <Button onClick={handleAddTrainer} color="primary">
              Dodaj
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={isTraineeModalOpen} onClose={handleCloseTraineeModal}>
          <DialogTitle>Podaj imię podopiecznego</DialogTitle>
          <DialogContent>
            <DialogContentText>Wpisz imię podopiecznego, który zostanie dodany do listy podopiecznych</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Imię podopiecznego"
              type="text"
              fullWidth
              value={newTrainee}
              onChange={(e) => setNewTrainee(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseTraineeModal} color="primary">
              Anuluj
            </Button>
            <Button onClick={handleAddTrainee} color="primary">
              Dodaj
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        {/* Dodaj inne trasy, jeśli masz */}
        <Route path="/" component={App} />
      </Switch>
    </Router>
  );
}

export default App;
