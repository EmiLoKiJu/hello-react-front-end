import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getLogin, setToken, clearToken } from '../redux/authentication/authenticationSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((store) => store.login);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = username;
    const pass = password;

    dispatch(getLogin({ user, pass, token })).then((resultAction) => {
      if (resultAction.payload) {
        localStorage.setItem('token', resultAction.payload);
        navigate('/greeting');
      } else {
        window.location.reload();
      }
    });
  };

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(clearToken());
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="container">
      {token === null ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="Login" />
        </form>
      ) : (
        <div>
          <h3>You are already logged in.</h3>
          <form onSubmit={handleLogout}>
            <input type="submit" value="Logout" />
          </form>
        </div>
      )}
      <h3>(Default username: username1)</h3>
      <h3>(Default password: password1)</h3>
    </div>
  );
};

export default Login;
