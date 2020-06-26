package com.craig_briana.craig_briana.service;

import com.craig_briana.craig_briana.exceptions.NotFoundException;
import com.craig_briana.craig_briana.model.Person;
import com.craig_briana.craig_briana.repositories.PeopleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PeopleServiceImpl implements PeopleService {

    @Autowired
    private PeopleRepository peopleRepository;

    @Override
    public Person addPerson(Person person) {
        return peopleRepository.save(person);
    }

    @Override
    public List<Person> getAllPeople() {
        return this.peopleRepository.findAll();
    }

    @Override
    public Person getPersonById(int id) {
        Optional<Person> personDb = this.peopleRepository.findById(id);

        if (personDb.isPresent()) {
            return personDb.get();
        }
        else {
            throw new NotFoundException("Record not found with id : " + id);
        }
    }

    @Override
    public Person updatePerson(Person person) {
        Optional<Person> peopleDb = this.peopleRepository.findById(person.getId());

        if (peopleDb.isPresent()) {
            Person personUpdate = peopleDb.get();
            personUpdate.setId(person.getId());
            personUpdate.setFirst_name(person.getFirst_name());
            personUpdate.setLast_name(person.getLast_name());
            personUpdate.setFull_name(person.getFirst_name() + " " + person.getLast_name());
            personUpdate.setEmail(person.getEmail());
            personUpdate.setPhone_number(person.getPhone_number());
            peopleRepository.save(personUpdate);
            return personUpdate;
        }
        else {
            throw new NotFoundException("Record not found with id : " + person.getId());
        }

    }

    @Override
    public void deletePerson(int id) {
        Optional<Person> personDb = this.peopleRepository.findById(id);
            if(personDb.isPresent()) {
                this.peopleRepository.delete(personDb.get());
            }
            else {
                throw new NotFoundException("Record not found with id : " + id);
            }

        }
}
