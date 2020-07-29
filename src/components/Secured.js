import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const Secured = ({ history }) => {
    const cookies = new Cookies();
    const [auth, setAuth] = useState(false)

    const checkLogin = () => {
        const access_token = cookies.get('access_token');
        console.log("secured token", access_token)
        if (!!access_token) {
            axios.get('http://localhost:5000/api/secured', {
                headers: {
                    authorization: `Bearer ${access_token}`
                }
            }).then(res => {
                console.log("Secured res", res)
                if (res.status !== 200 && res.status === 401) {
                    refresh();
                }

                if (res.status === 200) {
                    setAuth(true);
                }
            }).catch(err => {
                console.log("Secured err", err)
                if (`${err}`.includes('401')) {
                    console.log("in includes")
                    refresh();
                } else {
                    history.goBack();
                }
            })
        } else {
            history.goBack();
        }
    }

    const refresh = () => {
        const refresh_token = cookies.get('refresh_token');
        console.log("in refresh func")
        axios.post('http://localhost:5000/api/refresh', { refresh_token })
            .then(res => {
                const { access_token, refresh_token } = res.data;
                if (!!access_token && !!refresh_token) {
                    console.log("in refresh")
                    cookies.set('access_token', access_token);
                    cookies.set('refresh_token', refresh_token);
                    checkLogin()
                } else {
                    history.goBack();
                }
            }).catch(err => history.goBack())
    }
    useEffect(() => {
        checkLogin()
    }, [])


    return (
        <div>

            {auth && <p>
                Wellcome! You are authenticated
                    </p>}
        </div>

    )
}

export default Secured
