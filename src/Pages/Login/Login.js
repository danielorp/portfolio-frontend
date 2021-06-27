import './Login.css'
import React, { Component, useState } from 'react'
import { Grid, Form, Button, Segment } from 'semantic-ui-react'
import StorageProvider from '../../Services/StorageProvider'
import jwt_decode from 'jwt-decode'
import login from '../../Services/AuthenticationService'
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function Login({ setToken }) {

    let history = useHistory();

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await handleLogin(username, password);
        if (token) {
            setToken(token)
            history.push("/")
        }
        else {
            alert('Deu ruim')
        }
    }

    return (
        <div className="login-wrapper">
            <Grid columns={1} padded style={{ height: '100vh' }} verticalAlign='middle' className='login-wrapper'>
                <Grid.Row as='main' centered>
                    <Grid.Column largeScreen={5} computer={5} mobile={5}>
                        <Segment id='loginForm'>
                            <Form onSubmit={handleSubmit}>
                                <Form.Input
                                    //disabled={this.state.loading}
                                    focus
                                    icon='user'
                                    iconPosition='left'
                                    //loading={this.state.loading}
                                    name='username'
                                    fluid
                                    label='Usuário'
                                    onChange={e => setUserName(e.target.value)}
                                    placeholder='Seu usuário'
                                />

                                <Form.Input
                                    //disabled={this.state.loading}
                                    icon='lock'
                                    iconPosition='left'
                                    //loading={this.state.loading}
                                    name='password'
                                    fluid
                                    label='Senha'
                                    onChange={e => setPassword(e.target.value)}
                                    type='password'
                                    placeholder='Sua senha'
                                />

                                <Button
                                    //disabled={this.state.loading}
                                    //loading={this.state.loading}
                                    size='huge'
                                    fluid
                                    content='Entrar'
                                    icon='sign in'
                                    labelPosition='left'
                                    color='vk'
                                    type='submit'
                                />
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};

async function handleLogin(username, password) {

    return login(username, password).then((response) => {
        var token = response.data.token
        if (isTokenStillValid(token)){
            console.log(`Sucesso no Login`)
            return token
        }
    }).catch((error) => {
        console.log(`Falha no login: ${error}`)
        return null
    })
}

function isTokenStillValid(token) {
    let decoded = jwt_decode(token)
    let currentDate = new Date();
    if (decoded.exp * 1000 < currentDate.getTime()) {
        return false
    } else {
        return true  
    }
}


export default withRouter(Login)