import React from 'react';
import UserService from "../../services/UserService";
import Button from 'react-bootstrap/Button';
import './UserStyles.css'

interface User {
    id: string,
    name: string,
    lastname: string
}

class Timer {
    private start: number;
    private name: string;
    private amount: number;

    constructor(name: string,amount: number) {
        this.start = performance.now();
        this.name = name;
        this.amount = amount;
    }

    stop() {
        let time = performance.now() - this.start;
        time -= this.amount*5
        console.log(`Timer ${this.name} finished in ${Math.round(time)} ms`);
    }
}

class UserComponent extends React.Component<{}, { users: User[] }> {

    constructor(props: any) {
        super(props)
        this.state = {
            users: []
        }
    }
    sleep = (ms:number) => new Promise(r => setTimeout(r, ms));

    componentDidMount() {
        // UserService.getUsers(1).then((response) => {
        //     this.setState({ users: response.data})
        // });
    }


    render() {
        return (
            <>
                <div>
                    <h1 className="text-center"> Users List</h1><br/>
                    <div className={"buttons"}>
                        <Button variant="primary" onClick={() => this.getUser(1000)}>get 1000 Users</Button>
                        <Button variant="primary" onClick={() => this.getUser(2000)}>get 2000 Users</Button>
                        <Button variant="primary" onClick={() => this.getUser(5000)}>get 5000 Users</Button>
                    </div>
                <table className="table table-striped">
                    <thead>
                    <tr>

                        <td> Id</td>
                        <td> First Name</td>
                        <td> Last Name</td>

                    </tr>

                    </thead>
                    <tbody>
                    {this.state.users.map(
                        (user, index) => (
                            <tr key={user.id}>
                                <td> {user.id}</td>
                                <td> {user.name}</td>
                                <td> {user.lastname}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                </div>
            </>
        )
    }

    async getUser(amount: number) {
        const timer = new Timer('getUser',amount); // create a new Timer object
        const userPromises = [];
        for (let i = 1; i <= amount; i++) {
            userPromises.push(UserService.getUsers(i));
            await this.sleep(5);
        }
        const responses = await Promise.all(userPromises);
        const users = responses.map((response) => response.data);
        this.setState({ users });
        timer.stop(); // call the stop method to log the elapsed time
    }
}

export default UserComponent
