import React, {Component} from "react";
import {Dropdown} from "semantic-ui-react";
import web3 from "web3";
import {Link} from "../routes";
import {Router} from "../routes";

//Header that is used in all pages

export default class MenuBar extends Component {
    onClickedPatient = async (event) => {
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        Router.pushRoute(`/record/${accounts[0]}`);
    };

    onClickedDoctor = async (event) => {
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        Router.pushRoute(`/doctor/${accounts[0]}`);
    };

    render() {
        return (
            <div className={'ui top fixed menu '} style={{width:"100%", fontSize: '15px', paddingLeft: '10px', paddingRight: '10px'}}>

                    <div className="item">
                        {/*<img src="https://semantic-ui.com/images/logo.png"/>*/}
                        <h1 style={{
                            fontSize: '25px',
                        }}>BIEMR-System</h1>
                    </div>

                    <Link className={'item'} route="/">Home</Link>
                    <Link className={'item'} route="/dashboard">Dashboard</Link>
                    <Link className={'item'} route="/list">Records List</Link>

                    <div className={'right menu'}>
                        <Dropdown item text="Patient" className={'ui'} style={{ width: '150px', paddingLeft: '10px', paddingRight: '10px' }}>
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <Link route="/register-patient">Register</Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link className={''} route="/edit-patient">Edit Profile</Link>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Link className={'item'} route="/approve-doctor">Allow Access</Link>
                        <Link className={'item'}  route="/revoke-doctor">Revoke Access</Link>

                        {/*<Dropdown item text="Doctor" className={'ui'} style={{ width: '150px', paddingLeft: '10px', paddingRight: '10px' }}>*/}
                        {/*    <Dropdown.Menu>*/}
                        {/*        <Dropdown.Item>*/}
                        {/*            <Link route="/edit-doctor">Edit Profile</Link>*/}
                        {/*        </Dropdown.Item>*/}
                        {/*        <Dropdown.Item>*/}
                        {/*            <Link route="/register-doctor">Register</Link>*/}
                        {/*        </Dropdown.Item>*/}
                        {/*    </Dropdown.Menu>*/}
                        {/*</Dropdown>*/}


                        {/*<Dropdown item text="Register" className={'ui'} style={{ width: '100px', paddingLeft: '10px', paddingRight: '10px' }}>*/}
                        {/*    <Dropdown.Menu>*/}
                        {/*        <Dropdown.Item>*/}
                        {/*            <Link route="/register-patient">Patient</Link>*/}
                        {/*        </Dropdown.Item>*/}
                        {/*        <Dropdown.Item>*/}
                        {/*            <Link route="/register-doctor">Doctor</Link>*/}
                        {/*        </Dropdown.Item>*/}
                        {/*    </Dropdown.Menu>*/}
                        {/*</Dropdown>*/}
                    </div>
            </div>
        );
    }
}
