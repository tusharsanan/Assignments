import { Http, Response, RequestMethod, RequestOptions, ResponseOptions, BaseRequestOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
let users: any[] = [
    {"email": "tushar.sanan@gmail.com", "password": "qwertyui"},
    {"email": "nitish.kataruka@gmail.com", "password": "qwertyui"},
    {"email": "raaj.mohanty@gmail.com", "password": "qwertyui"}
]

    backend.connections.subscribe((connection: MockConnection) => {
        setTimeout(() => {
                if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                    let params = JSON.parse(connection.request.getBody());
                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.email === params.email && user.password === params.password;
                    });
                    
                    if(filteredUsers.length) {
                        // if login details are valid return 200 OK with user details
                        let user = filteredUsers[0];
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 200,
                            body: {
                                email: user.email,
                                password: user.password
                            }
                        })));
                      }

                     else if (params.email == "" || params.password== "") {
                        return connection.mockError(new Error('Username and password cannot be blank'));
                    }

                     else {
                          // else return 400 bad request
                        connection.mockError(new Error('Username or password is incorrect'));
                     }
                        return;
                    }
            }, 500);
        });
        return new Http(backend, options);
        };
        export let fakeBackendProvider = {
            provide: Http,
            useFactory: fakeBackendFactory,
            deps: [MockBackend, BaseRequestOptions, XHRBackend]
        };