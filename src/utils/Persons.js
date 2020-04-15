export default class Persons {
    constructor(state = []) {
        this.state = state;
    }

    get() {
        return this.state;
    }

    indexOf(person) {
        return this.state.findIndex(entry => entry.id === person.id);
    }

    has(person) {
        return this.indexOf(person) > -1;
    }

    update(person) {
        // console.log('person.js - > update()')
        const state = this.state.map(entry => {
            return entry.id === person.id
                ? person
                : entry;
        }); 
        console.log('person.js - > update()')
        console.log(state)

        return new Persons(state);
    }
    add(person) {
        console.log('person.js - > add() ')

        console.log('- - - returned new Person')
        console.log(new Persons([...this.state, person]))
        return new Persons([...this.state, person]);
    }

    upsert(person) {    
        return this.has(person)
            ? this.update(person)
            : this.add(person);
    }
}