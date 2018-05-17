import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Card,
  Icon,
  Image,
  Input,
  Button,
  TextArea,
  Form,
  Header,
  Checkbox,
  Message
} from "semantic-ui-react";

class TeacherCurrentCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCourses: []
    };
  }

  componentDidMount() {
    this.getTeachersCourses();
  }

  getTeachersCourses() {
    axios.get("/api/teacher_courses/:teacher_id").then(response => {
      this.setState({ currentCourses: response.data });
    });
  }

  deleteCourse(id) {
    axios.delete(`/api/delete_course/${id}`).then(response => {
      return this.getTeachersCourses();
    });
  }

  render() {
    let currentCourseList = this.state.currentCourses.map(course => {
      return (
        <Table.Row key={course.id}>
          <Table.Cell>
            <Button>Today</Button>
          </Table.Cell>
          <Table.Cell> {course.course_name}</Table.Cell>
          <Table.Cell>{course.curriculum_id}</Table.Cell>
          <Table.Cell>
            {moment(course.start_date).format("MMMM DD, YYYY")}
          </Table.Cell>
          <Table.Cell>
            {moment(course.completion_date).format("MMMM DD, YYYY")}
          </Table.Cell>
          <Table.Cell>
            <Button basic icon circular>
              ><Link to="/coursebuilder">
                <Icon name="edit" />{" "}
              </Link>
            </Button>
          </Table.Cell>
          <Table.Cell>
            <Button basic icon circular onClick={() => this.deleteCourse(course.id)}>
              <Icon name="trash" />
            </Button>
          </Table.Cell>
        </Table.Row>
      );
    });

    return (
      <div>
        <Link to="/coursebuilder">
          <Button icon labelPosition="right">
            Add New Current Course<Icon name="plus" />
          </Button>
        </Link>
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Today</Table.HeaderCell>
              <Table.HeaderCell>Course</Table.HeaderCell>
              <Table.HeaderCell>Curriculum</Table.HeaderCell>
              <Table.HeaderCell>Start Date</Table.HeaderCell>
              <Table.HeaderCell>End Date</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{currentCourseList}</Table.Body>
        </Table>
      </div>
    );
  }
}

export default TeacherCurrentCourses;
