import React, {Component} from "react";
import {Menu, Icon, Dropdown} from "semantic-ui-react";
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
            <div className={'ui top fixed menu '} style={{width:"100%", fontSize: '20px', paddingLeft: '10px', paddingRight: '10px'}}>

                    <div className="item">
                        <img src="https://semantic-ui.com/images/logo.png"/>
                    </div>

                    <Link className={'item'} route="/">Home</Link>
                    <Link className={'item'} route="/dashboard">Dashboad</Link>

                    <Link className={'item'} route="/list">Records List</Link>

                    <div className={'right menu'}>
                        <Dropdown item text="Doctor" className={'ui'}>
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <Link route="/edit-doctor">Edit Profile</Link>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown item text="Patient" className={'ui'}>
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <Link className={''} route="/edit-patient">Edit Profile</Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link route="/approve-doctor">Allow Access</Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link route="/revoke-doctor">Revoke Access</Link>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown item text="Register" className={'ui'}>
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <Link route="/register-patient">Patient</Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link route="/register-doctor">Doctor</Link>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
            </div>
        );
    }
}
