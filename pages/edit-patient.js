import React, { Component } from 'react';
import { Divider, Form, Input, Button, Segment, Message, Select} from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import web3 from '../ethereum/web3';
import { Router } from '../routes';
import { id } from 'ethers';

const options = [
    { key: 'm', text: 'Male', value: 'Male' },
    { key: 'f', text: 'Female', value: 'Female' },
    { key: 'o', text: 'Other', value: 'Other' },
]

const allergyOptions = [
    { key: 'f', text: 'Food', value: 'Food' },
    { key: 'm', text: 'Medical', value: 'Medical' },
    { key: 'e', text: 'Environmental', value: 'Environmental' },
    { key: 'o', text: 'Others', value: 'Others' },
    { key: 'n', text: 'None', value: 'None'},
]

class EditPatient extends Component {
    state = {
        ic: '',
        name: '',
        phone: '',
        gender: '',
        dob: '',
        height: '',
        weight: '',
        houseaddr: '',
        bloodgroup: '',
        allergies: '',
        ailments: '',
        medication: '',
        emergencyName: '',
        emergencyContact: '',
        loading: false,
        errorMessage: ''
    };

    handleGender = (e, { value }) => this.setState({ gender: value })

    handleAllergies = (e, { value }) => this.setState({ allergies: value })

    onSubmit = async event => {
        event.preventDefault();

        const { ic, name, phone, gender, dob, height, weight, houseaddr, bloodgroup, allergies, ailments, medication, emergencyName, emergencyContact } = this.state;

        this.setState({loading: true, errorMessage: ''});

        try {
            const accounts = await web3.eth.getAccounts();

            await record.methods.editDetails(
                ic, name, phone, gender, dob, height, weight, houseaddr, bloodgroup, allergies, ailments, medication, emergencyName, emergencyContact
            ).send({ from: accounts[0] });

            alert("Patient record updated successfully!");
            Router.pushRoute('/list');
        }
        catch (err) {
            this.setState({ errorMessage: err.message });
            alert("Account already exists");
        }

        this.setState({ loading: false, ic: '', name: '', phone: '', gender: '', dob: '', height: '', weight: '', houseaddr: '', bloodgroup: '', allergies: '', ailments: '', medication: '', emergencyName: '', emergencyContact: ''});
    }

    render() {
        return (
            <Layout>
                <Segment padded>
                    <h1 style={{
                        fontSize: '40px',
                        fontWeight: 'bold',
                    }}>
                        Edit Record
                    </h1>
                </Segment>
                <Segment>
                    <h2 style={{marginTop: '20px', marginBottom: '30px'}}>General Information</h2>
                    <Divider clearing/>
                    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Group widths='equal'>
                        {/* <Form.Field>
                            <label>ID</label>
                            <Input
                                placeholder = 'Eg. 20020526-12113-00001-20'                
                                value= {this.state.ic}
                                onChange= {event => 
                                    this.setState({ ic: event.target.value })}                           
                            />
                        </Form.Field> */}

                        <Form.Field>
                            <label>Full Name</label>
                            <Input
                                placeholder = 'Eg. Mike Kabero'                        
                                value= {this.state.name}
                                onChange= {event => 
                                    this.setState({ name: event.target.value })}                           
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Phone</label>
                            <Input
                                placeholder = 'Eg. 0753410299'
                                value= {this.state.phone}
                                onChange= {event => 
                                    this.setState({ phone: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group>
                    <br/>              
                    <Form.Group widths='equal'>
                        <Form.Field 
                                label='Gender' 
                                control={Select} 
                                options={options} 
                                onChange={this.handleGender}
                        />

                        <Form.Field>
                            <label>Date of Birth</label>
                            <Input 
                                placeholder = 'Eg. 26/05/2002'
                                value= {this.state.dob}
                                onChange= {event => 
                                    this.setState({ dob: event.target.value })}  
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Height</label>
                            <Input 
                                placeholder = 'Eg. 180'
                                label={{ basic: true, content: 'cm' }}
                                labelPosition='right'
                                value= {this.state.height}
                                onChange= {event => 
                                    this.setState({ height: event.target.value })}  
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Weight</label>
                            <Input 
                                placeholder = 'Eg. 60'
                                label={{ basic: true, content: 'kg' }}
                                labelPosition='right'
                                value= {this.state.weight}
                                onChange= {event => 
                                    this.setState({ weight: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group>                   
                   
                    <br/>
                    <Form.Group widths='equal'>
                        <Form.TextArea
                                label='House Address'
                                placeholder = 'Eg. 108, Haile Selassie Rd'
                                value= {this.state.houseaddr}
                                onChange= {event => 
                                    this.setState({ houseaddr: event.target.value })}  
                        />
                    </Form.Group>

                    <br/>
                    <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>Medical History</h2>
                    <Divider clearing />                    
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Blood Group</label>
                            <Input 
                                placeholder = 'Eg. A+'
                                value= {this.state.bloodgroup}
                                onChange= {event => 
                                    this.setState({ bloodgroup: event.target.value })}  
                            />
                        </Form.Field>

                        <Form.Field 
                                label='Allergies' 
                                control={Select} 
                                options={allergyOptions} 
                                onChange={this.handleAllergies}
                        />
                    </Form.Group>

                    {/* <br/>
                    <Form.Group widths='equal'>
                        <Form.TextArea
                                label='Ailments'
                                placeholder = 'Eg. Headache'
                                value= {this.state.ailments}
                                onChange= {event => 
                                    this.setState({ ailments: event.target.value })}  
                        />
                    </Form.Group>
                    <br/> */}

                    <br/>
                    <Form.Group widths='equal'>
                        <Form.TextArea
                                label='Medications'
                                placeholder = 'Eg. Paracetamol'
                                value= {this.state.medication}
                                onChange= {event => 
                                    this.setState({ medication: event.target.value })}  
                        />
                    </Form.Group>
                    <br/>

                    <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>Emergency Contact</h2>
                    <Divider clearing />
                    <Form.Group widths='equal'>
                       <Form.Field>
                            <label>Emergency Contact Name</label>
                            <Input 
                                placeholder = 'Eg. Rose Mbezi'
                                value= {this.state.emergencyName}
                                onChange= {event => 
                                    this.setState({ emergencyName: event.target.value })}  
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Emergency Contact Phone</label>
                            <Input 
                                placeholder = 'Eg. 0712017105'
                                value= {this.state.emergencyContact}
                                onChange= {event => 
                                    this.setState({ emergencyContact: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group>
                    <br/>
                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button primary loading={this.state.loading}>Edit</Button>
                </Form>
                </Segment>
            </Layout>
        );
    }
}

export default EditPatient;