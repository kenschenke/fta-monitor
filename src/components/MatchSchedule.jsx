import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class MatchScheduleUi extends React.Component {
    render() {
        if (this.props.compact) {
            const rows = this.props.matches.map(match => {
                return (
                    <tr className={match.match === this.props.currentMatch ? 'table-primary' : ''}>
                        <td>{match.match}</td>
                        <td>{match.sched}</td>
                        <td>{match.r1}<br/>{match.r2}<br/>{match.r3}</td>
                        <td>{match.b1}<br/>{match.b2}<br/>{match.b3}</td>
                        <td>{match.rs}</td>
                        <td>{match.bs}</td>
                    </tr>
                );
            });

            return (
                <div className="match-schedule">
                    <table className="table table-striped table-sm">
                        <thead className="thead-dark">
                        <tr>
                            <th>Match</th>
                            <th>Sched</th>
                            <th>Red</th>
                            <th>Blue</th>
                            <th>RS</th>
                            <th>BS</th>
                        </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </table>
                </div>
            );
        } else {
            const rows = this.props.matches.map(match => {
                return (
                    <tr className={match.match === this.props.currentMatch ? 'table-primary' : ''}>
                        <td>{match.match}</td>
                        <td>{match.sched}</td>
                        <td>{match.r1}</td>
                        <td>{match.r2}</td>
                        <td>{match.r3}</td>
                        <td>{match.b1}</td>
                        <td>{match.b2}</td>
                        <td>{match.b3}</td>
                        <td>{match.rs}</td>
                        <td>{match.bs}</td>
                    </tr>
                );
            });

            return (
                <div className="match-schedule">
                    <table className="table table-striped table-sm">
                        <thead className="thead-dark">
                        <tr>
                            <th>Match</th>
                            <th>Sched</th>
                            <th>R1</th>
                            <th>R2</th>
                            <th>R3</th>
                            <th>B1</th>
                            <th>B2</th>
                            <th>B3</th>
                            <th>RS</th>
                            <th>BS</th>
                        </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </table>
                </div>
            );
        }
    }
}

MatchScheduleUi.propTypes = {
    compact: PropTypes.bool.isRequired,
    matches: PropTypes.array.isRequired,
    currentMatch: PropTypes.string.isRequired
};

export const MatchSchedule = connect(state => { return { matches: state.matches, currentMatch: state.statusBar.match }; })(MatchScheduleUi);
