package com.craig_briana.craig_briana.controller;

import com.craig_briana.craig_briana.model.Person;
import com.craig_briana.craig_briana.repositories.PeopleRepository;
import com.craig_briana.craig_briana.service.PeopleService;
import com.craig_briana.craig_briana.service.PeopleServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PeopleController {

    @Autowired
    private PeopleServiceImpl peopleService;

    @Autowired
    private PeopleRepository repository;

    @GetMapping("/contacts")
    public List <Person> get(){
        return peopleService.getAllPeople();
    }

    @GetMapping("/contacts/{id}")
    public ResponseEntity<Person> getPersonById(@PathVariable int id){
        return ResponseEntity.ok().body(peopleService.getPersonById(id));
    }

//    @PostMapping("/contacts")
//    public ResponseEntity<Person> addPerson(@RequestBody Person person){
//        Integer id = peopleService.getAllPeople().size() + 1;
//        person.setId(id);
//        return ResponseEntity.ok().body(this.peopleService.addPerson(person));
//    }

    @PostMapping("/contacts")
    public ResponseEntity<Person> addPerson(@RequestBody Person person) {
        try {
            Person _person = peopleService
                    .addPerson(new Person(person.getFirst_name(), person.getLast_name(), person.getEmail(), person.getPhone_number()));
            return new ResponseEntity<>(_person, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
        }
    }

//    Integer id = employeeDao.getAllEmployees().getEmployeeList().size() + 1;
//        employee.setId(id);

//    @RequestMapping(value = "/contacts", method = RequestMethod.POST)
//    public Person addPerson(@RequestBody Person person) {
 //        repository.save(person);
//        return person;
//    }

    @PutMapping("/contacts/{id}")
    public ResponseEntity<Person> updatePerson(@PathVariable int id, @RequestBody Person person){
        person.setId(id);
        return ResponseEntity.ok().body(this.peopleService.updatePerson(person));
    }

    @DeleteMapping("/contacts/{id}")
    public HttpStatus deletePerson(@PathVariable int id){
        this.peopleService.deletePerson(id);
        return HttpStatus.OK;
    }

//    @DeleteMapping("/tutorials/{id}")
//    public ResponseEntity<HttpStatus> deleteTutorial(@PathVariable("id") long id) {
//        try {
//            tutorialRepository.deleteById(id);
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
//        }
//    }
}
