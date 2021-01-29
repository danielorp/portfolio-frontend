import React, { Component } from 'react'
import { Grid, Form, Button, Segment } from 'semantic-ui-react'
import login from '../../Services/AuthenticationService'
import StorageProvider from '../../Services/StorageProvider'
import jsonWebTokenService from 'jsonwebtoken'
import qs from 'qs'
import http from '../../Services/RequestService'


class LoginPage extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            username: null,
            password: null
        }

        this.http = http
        this.localForage = StorageProvider
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveJwt = this.saveJwt.bind(this)
    }

    handleChange(target, data) {
        this.setState({
            [data.name]: data.value
        })
    }

    handleSubmit() {
        this.setState({ loading: true })
        const { username, password } = this.state
        http.post('login/',  qs.stringify({username, password}))
        .then((response) => {
            http.get('post/', {headers: {'Authorization': `JWT ${response.data['token']}`}}).then((response) => {
                console.log(response)
            }, (error) => {
                console.log(error)
            })
        }, (error) => {
            console.log(error);
        })
    }

    async saveJwt(jwt) {
        try {
            if (jwt) {
                const decodedJwt = jsonWebTokenService.decode(jwt)
                await this.localforage.setItem('jwt_usuario', jwt)
                await this.localforage.setItem('dados_usuario', decodedJwt)
                return true
            }
        } catch (err) {
            if (err instanceof jsonWebTokenService.JsonWebTokenError) return false
            throw err
        }
    }

    render() {
        return (
            <Grid columns={1} padded style={{ height: '100vh' }} verticalAlign='middle' className='login-wrapper'>
                <Grid.Row as='main' centered>
                    <Grid.Column largeScreen={5} computer={5} mobile={5}>
                        <Segment id='loginForm'>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Input
                                    disabled={this.state.loading}
                                    focus
                                    icon='user'
                                    iconPosition='left'
                                    loading={this.state.loading}
                                    name='username'
                                    fluid
                                    label='Usuário'
                                    onChange={this.handleChange}
                                    placeholder='Seu usuário'
                                />

                                <Form.Input
                                    disabled={this.state.loading}
                                    icon='lock'
                                    iconPosition='left'
                                    loading={this.state.loading}
                                    name='password'
                                    fluid
                                    label='Senha'
                                    onChange={this.handleChange}
                                    type='password'
                                    placeholder='Sua senha'
                                />

                                <Button
                                    disabled={this.state.loading}
                                    loading={this.state.loading}
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

        )
    }
}

export default LoginPage