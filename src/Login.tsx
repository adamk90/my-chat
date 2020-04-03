import React, { Component } from 'react';
import {proxy} from './Proxy';
import {TextInput} from './TextInput'

const NEPTUN: string = "UAAA5I";
const KERESZTNEV: string = "Adam";

export default class Login extends Component<{}, {email: string, password: string, displayName: string, register: boolean}>
{
    displayNameRef: any;
    state = {email: "", password: "", displayName: "", register: false};
    constructor(props)
    {
        super(props);
        this.displayNameRef = React.createRef<TextInput>();
    }

    render()
    {
        let displayInput = (<TextInput type="text" placeholder="Display Name" value={this.state.displayName}
                                 onChange={displayName => {this.setState({displayName: displayName});}}
                                 onEnter={(e) => this.onClick(e)}
                                 ref={this.displayNameRef}
                            />
        );
        return (
            <div className="login">
                <img src="logo512.png" width="256" alt=""/>
                <TextInput type="email" placeholder="Email (someone@example.com)" value={this.state.email}
                       onChange={email => {
                           this.onEmailChange(email);
                           this.setState({email: email});
                        }}
                       onEnter={(e) => this.onClick(e)}
                       autofocus = {true}
                />
                {this.state.register && displayInput}
                <TextInput type="password" placeholder="Password" value={this.state.password}
                    onChange={password => {
                        this.setState({password: password});
                    }}
                    onEnter={(e) => this.onClick(e) }
                />
                <button type="button" onClick={(e) => this.onClick(e)}>
                    {this.state.register ? "Register" : "Login"}
                </button>
                <a href="https://www.google.hu/search?q=privacy">Privacy Policy</a>
                <p>
                    {this.state.register ? "Switch back to " : "Have no account yet? Go and "}
                    <a href="/" onClick={e => {e.preventDefault(); this.setState({register: !this.state.register});}}>
                        {this.state.register ? "Login" : "Register"}
                    </a>
                </p>
            </div>
        );
    }

    onEmailChange = (newEmail: string) => {
        if (newEmail.toLowerCase() === NEPTUN.toLowerCase()) {
            this.setState({
                displayName: KERESZTNEV
             });
            this.displayNameRef.current.state.value = KERESZTNEV;
        }
    }

    onClick = (e) => {
        if (this.state.register) {
            proxy.register(this.state.email, this.state.password, this.state.displayName);
        } else {
            proxy.login(this.state.email, this.state.password);
        }
    }
}