import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getGreetings } from '../redux/greetings/greetingsSlice';
import { setToken, clearToken } from '../redux/authentication/authenticationSlice';

const Greeting = ({ message, getGreetings }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  }, [dispatch, setToken]);

  const { token } = useSelector((store) => store.login);

  useEffect(() => {
    if (token) {
      getGreetings(token);
    }
  }, [getGreetings, token]);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(clearToken());
    localStorage.removeItem('token');
    window.location.reload();
  }

  return (
    <div className='container'>
      {token === null ? (
        <div>
          <h3>You are not logged in.</h3>
          <Link to="/">Login</Link>
        </div>
      ) : (
        <div>
          <h1>{message}</h1>
          <form onSubmit={handleLogout}>
            <input type="submit" value="Logout" />
          </form>
        </div>
      )}
    </div>
  );
};

Greeting.defaultProps = {
  message: '',
  getGreetings: () => {},
};

Greeting.propTypes = {
  message: PropTypes.string,
  getGreetings: PropTypes.func,
};

const mapStateToProps = (state) => ({
  message: state.greetings.message,
});

export default connect(mapStateToProps, { getGreetings })(Greeting);
