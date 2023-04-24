import React, {useState, useEffect} from 'react';
import User from './components/User/User';
import './App.css';
import {render} from "react-dom";
import Image from "./components/Image/Image";


// function getUsers(): Promise<User[]> | any{
//     return fetch('https://example.com/api/users')
//         .then(response => response.json())
//         .then(data => data as User[])
//         .catch(error => console.error(error));
// }
const tab: typeof User[] = []

function GetUsers() {
    const [users, setUsers] = useState<any[]>([]);
    useEffect(() => {
        fetchData();
    }, []);

    function fetchData() {
        fetch('http://localhost:8080/getData?id=1')
            .then(response => response.json())
            .then(data => {
                tab.push(data)
            })
            .catch(error => {
                console.error(error);
            });
    }


    return (
        <div>
            <button onClick={GetUsers}>Get Users</button>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}

function App() {
    const user = {
        id: 1,
        name: 'Jan Kowalski',
        lastname: 'jan.kowalski@example.com',
    };

    return (
        <div className={"container"}>
            <User/>
            <Image />
        </div>
    );
}

export default App;

