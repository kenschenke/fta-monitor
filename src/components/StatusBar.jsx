import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const StatusBarUi = props => {
    return (
        <div className="status-bar">
            <div className="row">
                <div className="col">{props.match}</div>
                <div className="col text-center">{props.status}</div>
                <div className="col text-right">{props.aheadBehind}</div>
            </div>
        </div>
    );
};

StatusBarUi.propTypes = {
    match: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    aheadBehind: PropTypes.string.isRequired
};

export const StatusBar = connect(state => { return {...state.statusBar} })(StatusBarUi);
