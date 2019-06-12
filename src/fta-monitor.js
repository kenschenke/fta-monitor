import C from './constants';

/**
 * fieldMonitorDataChanged sends a data array.  Each element in the array contains an object
 * that communicates status for a single team, driver station, and robot
 *
 * P1 (int): 1: data for red alliance, 2: data for blue alliance
 * P2 (int): alliance station (1-3)
 * P3 (int): team number
 * P4 (bool): true if DS is connected
 * PFF (int):
 *     0: driver station is connected
 *     1: the team is in this match but at the wrong station
 *     2: the team is not in this match
 *     ?: Ethernet is plugged in but driver station is not connected to FMS
 * PB (bool): true if team is bypassed
 * P5 (bool): true if robot not linked to FMS
 * P7 (bool): true if radio connected to field AP
 * PF (int):
 *     1: robot is e-stopped
 *     2: disabled auto
 *     3: disabled teleop
 *     4: enabled auto
 *     5: enabled teleop
 * PZ (float): bandwidth usage
 * P8 (bool): true if robot is connected
 * PE (float): battery voltage
 * PG (int): trip time
 * PH (int): missed packets
 */

const statusToText = status => {
    let text = '';
    switch (status) {
        case 1:
            text = 'E-stopped';
            break;

        case 2:
            text = 'Disabled Auto';
            break;

        case 3:
            text = 'Disabled Tele-Op';
            break;

        case 4:
            text = 'Enabled Auto';
            break;

        case 5:
            text = 'Enabled Tele-Op';
            break;

        default:
            text = 'Disabled';
            break;
    }

    return text;
};

const stationPackage = x => {
    return {
        team: x.P3.toString(),
        dsConnected: x.P4,
        dsGood: x.P4 && (x.PFF === 0 || x.PFF === 1 || x.PFF === 2),
        radioConnected: x.P7,
        rioConnected: x.P8,
        fmsConnected: !x.P7,
        bypassed: x.PB,
        status: statusToText(x.PF),
        battery: x.PE,
        tripTime: x.PG,
        bandwidth: x.PZ,
        missedPackets: x.PH
    };
};

export const monitorInit = () => dispatch => {
    // Kick off the main event loop

    const fmHub = $.hubConnection();
    // fmHub.url = `${window.location.protocol}//${window.location.hostname}:8189/signalr`;
    fmHub.url = 'http://192.168.10.146:8189/signalr';

    const fmProxy = fmHub.createHubProxy('fieldMonitorHub');
    fmProxy.on('fieldMonitorDataChanged', data => {
        for (let i = 0; i < data.length; i++) {
            const x = data[i];
            let action = '';
            switch (x.P1) {
                case 1:  // red
                    switch (x.P2) {
                        case 1: action = C.SET_R1_DATA; break;
                        case 2: action = C.SET_R2_DATA; break;
                        case 3: action = C.SET_R3_DATA; break;
                    }
                    break;

                case 2:  // blue
                    switch (x.P2) {
                        case 1: action = C.SET_B1_DATA; break;
                        case 2: action = C.SET_B2_DATA; break;
                        case 3: action = C.SET_B3_DATA; break;
                    }
                    break;
            }

            if (action.length) {
                dispatch({ type: action, payload: stationPackage(x) });
            }
        }
    });

    /**
     * matchStatusInfoChanged sends an object
     *
     * P1:
     *
     * 0 or 1: nothing to report
     * 2 or 3: waiting for pre-start "READY TO PRE-START"
     * 4 or 5: pre-starting "PRE-START INITIATED"
     * 6, 7, 18, or 19: pre-start completed "PRE-START COMPLETED"
     * 8: waiting for match ready "MATCH NOT READY"
     * 9: waiting for match start "MATCH READY"
     * 10: game specific
     * 11: match auto "MATCH RUNNING (AUTO)"
     * 12: match transitioning "MATCH TRANSITIONING"
     * 13: match tele-op "MATCH RUNNING (TELEOP)"
     * 14: waiting for commit "MATCH OVER - WAITING FOR SCORES"
     * 15: waiting for scorekeeper "WAITING FOR SCOREKEEPER"
     * 16: game specific
     * 17: match cancelled "MATCH ABORTED"
     *
     * P2: match number
     * P3: ????
     * P4: ????
     */

    fmProxy.on('matchStatusInfoChanged', status => {
        let statusText = '';
        let statusColor = '';

        switch (status.P1) {
            case 2:
            case 3:
                statusText = 'Ready to Pre-Start';
                statusColor = 'red';
                break;

            case 4:
            case 5:
                statusText = 'Pre-Start Initiated';
                statusColor = 'red';
                break;

            case 6:
            case 7:
            case 18:
            case 19:
                statusText = 'Pre-Start Completed';
                statusColor = 'red';
                break;

            case 8:
                statusText = 'Match Not Ready';
                statusColor = 'red';
                break;

            case 9:
                statusText = 'Match Ready';
                statusColor = 'green';
                break;

            case 11:
                statusText = 'Match Running (Auto)';
                statusColor = 'green';
                break;

            case 12:
                statusText = 'Match Transitioning';
                statusColor = 'red';
                break;

            case 13:
                statusText = 'Match Running (Teleop)';
                statusColor = 'green';
                break;

            case 14:
                statusText = 'Waiting For Scores';
                statusColor = 'red';
                break;

            case 15:
                statusText = 'Waiting For Scorekeeper';
                statusColor = 'red';
                break;

            case 17:
                statusText = 'Match Aborted';
                statusColor = 'red';
                break;
        }

        dispatch({
            type: C.SET_STATUSBAR_DATA,
            payload: {
                status: statusText,
                statusColor: statusColor,
                match: 'Match ' + status.P2
            }
        });

        // $.getJSON('http://localhost/FieldMonitor/matchNumberAndPlay', {}, data => {
        //     dispatch({ type: C.SET_HAS_CONNECTION_ERROR, payload: false });
        //     dispatch({
        //         type: C.SET_STATUSBAR_DATA,
        //         payload: { match: `M: ${data[0]}` }
        //     });
        // });
    });

    fmProxy.on('scheduleAheadBehindChanged', param => {
        dispatch({
            type: C.SET_STATUSBAR_DATA,
            payload: {
                aheadBehind: param
            }
        });
    });

    fmHub.start()
        .done(function () {
        })
        .fail(function (err) {
            dispatch({ type: C.SET_HAS_CONNECTION_ERROR, payload: true });
        });

    // $.ajax({
    //     dataType: 'json',
    //     crossDomain: true,
    //     headers: { 'Access-Control-Allow-Origin': 'http://localhost', 'Access-Control-Allow-Credentials': true },
    //     url: 'http://localhost/FieldMonitor/matchNumberAndPlay',
    //     success: data => {
    //         dispatch({ type: C.SET_HAS_CONNECTION_ERROR, payload: false });
    //         dispatch({
    //             type: C.SET_STATUSBAR_DATA,
    //             payload: { match: `M: ${data[0]}` }
    //         });
    //     }
    // });
    // $.getJSON('http://192.168.10.146/FieldMonitor/matchNumberAndPlay', { crossDomain: true }, data => {
    //     dispatch({ type: C.SET_HAS_CONNECTION_ERROR, payload: false });
    //     dispatch({
    //         type: C.SET_STATUSBAR_DATA,
    //         payload: { match: `M: ${data[0]}` }
    //     });
    // });
};
