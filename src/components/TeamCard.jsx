import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const TeamCardUi = props => {
    let cardClass = 'team-card ' + props.alliance + '-alliance';
    if (props.fixed) {
        cardClass += ' team-card-fixed';
    }
    if (props.bypassed) {
        cardClass += ' team-card-bypassed';
    } else if (!props.fmsConnected) {
        cardClass += ' team-card-caution';
    } else {
        cardClass += ' ' + props.alliance + '-alliance-background';
    }

    let dsClass = 'indicator indicator-' + (props.dsConnected ? 'good' : 'bad');
    if (props.dsConnected && !props.dsGood) {
        dsClass = 'indicator indicator-good indicator-ds-not-connected';
    }

    return (
        <div className={cardClass}>
            <div style={{ display: 'flex' }}>
                <div className="team-card-team-number">{props.team}</div>
                <div className={dsClass}>DS</div>
                <div className={'indicator indicator-' + (props.radioConnected ? 'good' : 'bad')}>RAD</div>
                <div className={'indicator indicator-' + (props.rioConnected ? 'good' : 'bad') }>RIO</div>
            </div>
            <div className="row team-card-stat-row">
                <div className="col">Battery {props.battery.toFixed(2)}</div>
                <div className="col">Trip {props.tripTime}</div>
            </div>
            <div className="row team-card-stat-row">
                <div className="col">BWU {props.bandwidth.toFixed(3)}</div>
                <div className="col">Missed {props.missedPackets}</div>
            </div>
            <div className="row team-card-stat-row">
                <div className="col">{props.status}</div>
            </div>
        </div>
    );
};

TeamCardUi.propTypes = {
    alliance: PropTypes.string.isRequired,
    station: PropTypes.string.isRequired,
    team: PropTypes.string.isRequired,
    dsConnected: PropTypes.bool.isRequired,
    dsGood: PropTypes.bool.isRequired,
    radioConnected: PropTypes.bool.isRequired,
    rioConnected: PropTypes.bool.isRequired,
    fmsConnected: PropTypes.bool.isRequired,
    bypassed: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    battery: PropTypes.number.isRequired,
    tripTime: PropTypes.number.isRequired,
    bandwidth: PropTypes.number.isRequired,
    missedPackets: PropTypes.number.isRequired
};

export const TeamCard = connect((state,props) => { return state.teams[props.station] })(TeamCardUi);
