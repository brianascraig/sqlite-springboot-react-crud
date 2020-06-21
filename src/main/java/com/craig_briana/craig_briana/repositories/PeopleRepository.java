package com.craig_briana.craig_briana.repositories;

import com.craig_briana.craig_briana.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PeopleRepository extends JpaRepository<Person, Integer> {
//    Person findPersonByFirst_name(String first_name);
//    Person findPersonByLast_name(String last_name);
//    Person findPersonByFirst_nameAndLast_name(String first_name, String last_name);
}
