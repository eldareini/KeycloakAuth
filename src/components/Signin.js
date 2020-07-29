import React, { useState, useEffect, useCallback, FC } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const Signin = ({ location, history }) => {
    const cookies = new Cookies();

    const checkLogin = () => {
        const code = (location.search.match(/code=([^&]+)/) || [])[1];
        console.log("code", code)
        if (!!code) {
            axios.post('http://localhost:5000/api/authtoken', { code })
                .then(res => {
                    console.log("checkLogin res", res)
                    const { access_token, refresh_token } = res.data;
                    if (access_token && refresh_token) {
                        cookies.set('access_token', access_token);
                        cookies.set('refresh_token', refresh_token);
                        history.push('/secured');
                    }
                })
        }
    }

    useEffect(() => {
        checkLogin()

    }, [])

    const onClick = useCallback(async () => {
        axios.get('http://localhost:5000/api/auth')
            .then(res => {
                console.log("onClick res", res);
                try {
                    const url = res.data.url;
                    window.location.assign(url);
                } catch (e) {
                    console.log("onClick redirect error", e);
                }
            })
            .catch(err => console.log("onClick Error", err));
    }, [])
    return (
        <div>
            <button
                onClick={onClick}
                style={{
                    width: '10%',
                    padding: '10px',
                    textAlign: 'center',
                    color: '#9803fc',
                    alignSelf: 'center'
                }}>
                Login
            </button>
        </div>
    )
}

export default Signin
