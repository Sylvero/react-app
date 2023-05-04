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
    private id: number | void | undefined;
    usersList: any [] = []

    constructor(props: any) {
        super(props)
        this.state = {
            users: []
        }
        this.getLastId()
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
                    <h1 className="text-center"> Aplikacja testowa React</h1><br/>
                    <div className={"buttons"}>
                        <Button variant="primary" onClick={() => this.getUser(1000)}>Pobierz 1 000 wierszy</Button>
                        <Button variant="primary" onClick={() => this.getUser(5000)}>Pobierz 5 000 wierszy</Button>
                        <Button variant="primary" onClick={() => this.getUser(10000)}>Pobierz 10 000 wierszy</Button>
                    </div>
                    <div className={"buttons"}>
                        <Button variant="primary" onClick={() => this.deleteUser(100)}>Usuń 100 rekordów</Button>
                        <Button variant="primary" onClick={() => this.deleteUser(500)}>Usuń 500 rekordów</Button>
                        <Button variant="primary" onClick={() => this.deleteUser(1000)}>Usuń 1 000 rekordów</Button>
                        <Button variant="primary" onClick={() => this.generateData()}>Generuj Rekordy</Button>
                    </div>
                <table className="table">

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

    getLastId() {
        UserService.getFirstId().then(value => this.id = value)
    }

    async getUser(amount: number) {
        const timer = new Timer('getUser',amount);
        const userPromises = [];
        const users: any [] = [];
        for (let i = this.id!; i <= amount+this.id!; i++) {
            userPromises.push(UserService.getUsers(i).then(user => users.push(user.data)));
            await this.sleep(5);
            this.setState({ users });
        }
        const responses = await Promise.all(userPromises).finally(() => timer.stop());
        // // const users = responses.map((response) => response.data);
        // this.setState({ users });

    }

    async deleteUser(amount: number) {
        const timer = new Timer('deleteUser', amount);
        const userPromises = [];
        let users= this.state.users
        for (let i = this.id!; i <= amount + this.id!; i++) {
            userPromises.push(UserService.deleteUser(i));
            await this.sleep(5);
            users.shift()
        }
        const responses = await Promise.all(userPromises);
        this.setState({users})

        timer.stop(); // call the stop method to log the elapsed time
    }

    private generateData() {
        UserService.generateData();
    }
}

export default UserComponent
