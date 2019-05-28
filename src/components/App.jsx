import React from 'react';
import { StatusBar } from './StatusBar';
import { MatchSchedule } from './MatchSchedule';
import { TeamCard } from './TeamCard';

export const App = () => {
    return (
        <div style={{padding: 10}}>
            <div className="d-none d-lg-block">
                <div className="row no-gutters">
                    <div className="col col-auto" style={{marginRight: 10}}>
                        <TeamCard alliance="blue" station="b1" fixed={true}/>
                        <TeamCard alliance="blue" station="b2" fixed={true}/>
                        <TeamCard alliance="blue" station="b3" fixed={true}/>
                    </div>
                    <div className="col">
                        <StatusBar/>
                        <MatchSchedule compact={false}/>
                    </div>
                    <div className="col col-auto" style={{marginLeft: 10}}>
                        <TeamCard alliance="red" station="r3" fixed={true}/>
                        <TeamCard alliance="red" station="r2" fixed={true}/>
                        <TeamCard alliance="red" station="r1" fixed={true}/>
                    </div>
                </div>
            </div>

            <div className="d-none d-sm-block d-lg-none">
                <div className="row no-gutters">
                    <div className="col">
                        <StatusBar/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <TeamCard alliance="blue" station="b1" fixed={false}/>
                    </div>
                    <div className="col">
                        <TeamCard alliance="red" station="r3" fixed={false}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <TeamCard alliance="blue" station="b2" fixed={false}/>
                    </div>
                    <div className="col">
                        <TeamCard alliance="red" station="r2" fixed={false}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <TeamCard alliance="blue" station="b3" fixed={false}/>
                    </div>
                    <div className="col">
                        <TeamCard alliance="red" station="r1" fixed={false}/>
                    </div>
                </div>
                <div className="row no-gutters">
                    <div className="col">
                        <MatchSchedule compact={false}/>
                    </div>
                </div>
            </div>

            <div className="d-sm-none">
                <div className="row no-gutters">
                    <div className="col">
                        <StatusBar/>
                    </div>
                </div>
                <div className="row no-gutters">
                    <div className="col">
                        <TeamCard alliance="red" station="r1" fixed={false}/>
                        <TeamCard alliance="red" station="r2" fixed={false}/>
                        <TeamCard alliance="red" station="r3" fixed={false}/>
                    </div>
                </div>
                <div className="row no-gutters">
                    <div className="col">
                        <TeamCard alliance="blue" station="b1" fixed={false}/>
                        <TeamCard alliance="blue" station="b2" fixed={false}/>
                        <TeamCard alliance="blue" station="b3" fixed={false}/>
                    </div>
                </div>
                <div className="row no-gutters">
                    <div className="col">
                        <MatchSchedule compact={true}/>
                    </div>
                </div>
            </div>
        </div>
    );
};
