package com.craig_briana.craig_briana;

import com.craig_briana.craig_briana.controller.PeopleController;
import com.craig_briana.craig_briana.model.Person;
import com.craig_briana.craig_briana.service.PeopleServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.*;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class CraigBrianaApplicationTests {

    @InjectMocks
    PeopleController peopleController;

    @Mock
    PeopleServiceImpl peopleServiceImpl;

    @Test
    void contextLoads() {
    }

    @Test
    public void testAddPerson(){
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        Person person = new Person("Jane", "Doe", "Jane Doe", "janedoe@gmail.com",
                "5558354672");
        when(peopleServiceImpl.addPerson(person)).thenReturn(person);


        ResponseEntity<Person> responseEntity = peopleController.addPerson(person);

        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(201);
        assertThat(responseEntity.getHeaders().getLocation().getPath()).isEqualTo("/1");
    }

    @Test
    public void testFindAll(){

        Person person1 = new Person("Jane", "Doe", "Jane Doe", "janedoe@gmail.com",
                "5558354672");
        Person person2 = new Person("John", "Doe", "John Doe", "johndoe@gmail.com",
                "5558354672");
        List<Person> people = new List<Person>() {
            @Override
            public int size() {
                return 0;
            }

            @Override
            public boolean isEmpty() {
                return false;
            }

            @Override
            public boolean contains(Object o) {
                return false;
            }

            @Override
            public Iterator<Person> iterator() {
                return null;
            }

            @Override
            public Object[] toArray() {
                return new Object[0];
            }

            @Override
            public <T> T[] toArray(T[] a) {
                return null;
            }

            @Override
            public boolean add(Person person) {
                return false;
            }

            @Override
            public boolean remove(Object o) {
                return false;
            }

            @Override
            public boolean containsAll(Collection<?> c) {
                return false;
            }

            @Override
            public boolean addAll(Collection<? extends Person> c) {
                return false;
            }

            @Override
            public boolean addAll(int index, Collection<? extends Person> c) {
                return false;
            }

            @Override
            public boolean removeAll(Collection<?> c) {
                return false;
            }

            @Override
            public boolean retainAll(Collection<?> c) {
                return false;
            }

            @Override
            public void clear() {

            }

            @Override
            public Person get(int index) {
                return null;
            }

            @Override
            public Person set(int index, Person element) {
                return null;
            }

            @Override
            public void add(int index, Person element) {

            }

            @Override
            public Person remove(int index) {
                return null;
            }

            @Override
            public int indexOf(Object o) {
                return 0;
            }

            @Override
            public int lastIndexOf(Object o) {
                return 0;
            }

            @Override
            public ListIterator<Person> listIterator() {
                return null;
            }

            @Override
            public ListIterator<Person> listIterator(int index) {
                return null;
            }

            @Override
            public List<Person> subList(int fromIndex, int toIndex) {
                return null;
            }
        };
        people.add(1, person1);
        people.add(2, person2);

        when(peopleServiceImpl.getAllPeople()).thenReturn(people);
        List<Person> result = peopleController.get();

        assertThat(result.size()).isEqualTo(2);
        assertThat(result.get(0).getFirst_name()).isEqualTo(person1.getFirst_name());
        assertThat(result.get(1).getFirst_name()).isEqualTo(person2.getFirst_name());
    }

}
