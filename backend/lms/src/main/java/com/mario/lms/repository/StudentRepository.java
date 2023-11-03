package com.mario.lms.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mario.lms.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

	Optional<Student> findByEmail(String email);
	List<Student> findStudentsByCoursesId(Long courseId);
}
