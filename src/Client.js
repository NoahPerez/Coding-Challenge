import React, { Component } from 'react';
import Persons from './utils/Persons';
import Server from './Server';


let id = "";
let visible = [];

export default class Client extends Component {
    constructor() {
        super();

        this.state = {
            persons: new Persons(),
        };
    }

    createPerson() {
        const person = {
            name: '',
            id: --id,
        };
        //to create a list to record the boolean type 
        visible[id] = true;

        this.setState(state => ({
            persons: state.persons.add(person),
        }));
        //  1) problem delete this to not save 
        // this.savePerson(person);
    }

    onClickCreatePerson = () => {
        this.createPerson();
    }

    onClickSaveName(person) {
        this.savePerson(person);
    }

    onChangeName = (person, event) => {
        const name = event.target.value;
        this.setState(state => ({
            persons: state.persons.update({
                ...person,
                name,
            }),
        }));
    }

    savePerson(person) {
        const isCreate = person.id < 0;
        //3) and 4)
        const method = isCreate
            ? 'post'
            : 'patch';
        if (method === 'post') {
            Server[method](person)
                .then(this.onSaveSuccess);
        } else {
            Server[method](person)
            this.onSaveSuccess(person)
        }

        //2) once we create positive id the negative id State visible is set to false and then we render 
        if (method === 'post') {
            visible[person.id] = false
        }

    }

    onSaveSuccess = person => {
        this.setState(state => ({
            persons: state.persons.upsert(person),
        }));
    }

    renderPersons() {
        return this.state.persons
            .get()
            .map(person => {
                //2)problem 
                if (visible[person.id] !== false) {
                    return (

                        <div key={person.id} className="challenge-person">
                            <span className="challenge-person-id">
                                {person.id}
                            </span>

                            <input
                                value={person.name}
                                className="challenge-person-name"
                                onChange={event => this.onChangeName(person, event)}
                            />
                            <button
                                className="challenge-person-save-name-button"
                                onClick={() => this.onClickSaveName(person)}
                            >
                                Save Name
                        </button>

                        </div>
                    )
                } else {
                    return null
                }


            })
    }

    render() {
        return (
            <div className="challenge">
                <button
                    className="challenge-create-person-button"
                    onClick={this.onClickCreatePerson}
                >
                    Create Person
                </button>
                <div className="challenge-persons">
                    {this.renderPersons()}
                </div>
            </div>
        );
    }
}