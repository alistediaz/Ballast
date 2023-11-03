package com.mario.lms.repository;

import com.mario.lms.model.Course;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository; 

public interface CourseRepository extends JpaRepository<Course, Long> {
	List<Course> findCoursesByStudentsId(Long studentId);

}
