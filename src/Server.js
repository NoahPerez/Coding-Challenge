import Persons from './utils/Persons';

const state = {
    id: 0,
    persons: new Persons(),
};

class Server {
    createTimeout() {
        const time = Math.floor(Math.random() * 3000) + 1000;

        return new Promise(resolve => {
            setTimeout(resolve, time);
        });
    }

    post(person) {
        return this
            .createTimeout()
            .then(() => ({
                ...person,
                id: state.id++,
            }))
            .then(person => {
                console.log('server.js -> post()')
                state.persons = state.persons.add(person);
                console.log(' - - - server state')
                console.log(state.persons)
                console.log(' - - - server return')
                console.log(person)
                return person;
            });
    }

    patch(person) {
        return this
            .createTimeout()
            .then(() => ({
                ...person,
            }))
            .then(person => {
                console.log('server.js -> patch()')
                if (!state.persons.has(person)) {
                    throw new Error(`Server.patch("${JSON.stringify(person)}") - Person does not exist`);
                }

                state.persons = state.persons.update(person);
                return person;
            });
    }
}

export default new Server();