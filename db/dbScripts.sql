-- Database: LMS

-- DROP DATABASE IF EXISTS "LMS";

CREATE DATABASE "LMS"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Spain.1252'
    LC_CTYPE = 'Spanish_Spain.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
	
-- SCHEMA: lms

-- DROP SCHEMA IF EXISTS lms ;

CREATE SCHEMA IF NOT EXISTS lms
    AUTHORIZATION postgres;
	
-- Table: lms.courses

-- DROP TABLE IF EXISTS lms.courses;

CREATE TABLE IF NOT EXISTS lms.courses
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    description character varying COLLATE pg_catalog."default",
    CONSTRAINT courses_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS lms.courses
    OWNER to postgres;
	

-- Table: lms.student_course

-- DROP TABLE IF EXISTS lms.student_course;

CREATE TABLE IF NOT EXISTS lms.student_course
(
    student_id bigint NOT NULL,
    course_id bigint NOT NULL,
    CONSTRAINT student_course_pkey PRIMARY KEY (student_id),
    CONSTRAINT "courseId" FOREIGN KEY (course_id)
        REFERENCES lms.courses (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "studentId" FOREIGN KEY (student_id)
        REFERENCES lms.students (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS lms.student_course
    OWNER to postgres;
	
-- Table: lms.students

-- DROP TABLE IF EXISTS lms.students;

CREATE TABLE IF NOT EXISTS lms.students
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    first_name character varying COLLATE pg_catalog."default" NOT NULL,
    last_name character varying COLLATE pg_catalog."default" NOT NULL,
    dob date NOT NULL,
    address character varying COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    phone character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT students_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS lms.students
    OWNER to postgres;
	
-- SEQUENCE: lms.courses_id_seq

-- DROP SEQUENCE IF EXISTS lms.courses_id_seq;

CREATE SEQUENCE IF NOT EXISTS lms.courses_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE lms.courses_id_seq
    OWNER TO postgres;
	
-- SEQUENCE: lms.students_id_seq

-- DROP SEQUENCE IF EXISTS lms.students_id_seq;

CREATE SEQUENCE IF NOT EXISTS lms.students_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE lms.students_id_seq
    OWNER TO postgres;
	
-- Role: postgres
-- DROP ROLE IF EXISTS postgres;

CREATE ROLE postgres WITH
  LOGIN
  SUPERUSER
  INHERIT
  CREATEDB
  CREATEROLE
  REPLICATION
  ENCRYPTED PASSWORD 'SCRAM-SHA-256$4096:4YAf/5mlIpya6R/QVTFlCw==$Pbe8ml67tVuwi/VS6IsH+w8KQHuod/XmBcI2HpzYOu0=:UY3TA3bbhjmnaifRmVP+UJHWe6D1SfcQgKZ2iBzQs9g=';