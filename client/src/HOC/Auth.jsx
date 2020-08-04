import React from 'react';

// REDUX
import { connect } from 'react-redux';
import { auth } from '../actions/user_actions';
// MATERIAL UI
import CircularProgress from '@material-ui/core/CircularProgress';

const Auth = (ComposedClass, reload, adminRoute = null) => {
  class Authenicate extends React.Component {
    _isMounted = false;
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
      };
    }

    async componentDidMount() {
      this._isMounted = true;
      const { payload: user } = await this.props.dispatch(auth());
      if (!user.isAuth) {
        if (reload) {
          this.props.history.push('/register_login');
        }
      } else {
        if ((adminRoute && user.isAdmin) || reload === false) {
          this.props.history.push('/user/dashboard');
        }
      }
      if (this._isMounted) this.setState({ isLoading: false });
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    render() {
      return (
        <div>
          {this.state.isLoading ? (
            <div className="main_loader">
              <CircularProgress style={{ color: '#2196F3' }} thickness={7} />
            </div>
          ) : (
            <ComposedClass {...this.props} user={this.props.user} />
          )}
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      user: state.user,
    };
  };

  return connect(mapStateToProps)(Authenicate);
};

export default Auth;
