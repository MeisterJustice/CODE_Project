import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function withAuth(ComponentToBeRendered) {
    class Authenticate extends Component {
        componentDidMount() {
            if (!this.props.isAuthenticated) {
                return this.props.history.push('/signin');
            }
        }
        componentDidUpdate(nextProps) {
            if (!nextProps.isAuthenticated) {
                return this.props.history.push('/signin');
            }
        }
        render() {
            return (
                <div>
                    <ComponentToBeRendered {...this.props} />
                </div>
            )
        }
    }


    function mapStateToProps(state) {
        return {
            isAuthenticated: state.currentUser.isAuthenticated
        }
    }

    return connect(mapStateToProps)(Authenticate);
}