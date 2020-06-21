package com.craig_briana.craig_briana.service;

import com.craig_briana.craig_briana.model.Person;

import java.util.List;

public interface PeopleService {
    Person addPerson(Person person);
    List<Person> getAllPeople();
    Person getPersonById(int id);
    Person updatePerson(Person person);
    void deletePerson(int id);
}
