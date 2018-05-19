import React, { Component } from 'react';
import Navbar from './../Navbar/Navbar';
import StudentPendingAssign from './studentPendingAssign/StudentPendingAssign';
import StudentAssignmentDetail from './StudentAssignmentDetail/StudentAssignmentDetail';

class StudentDashboard extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        studentsCourses: [],
        studentsAssignments: []
       }
    }
componentDidMount(){

}

  render() {
    return (
      <div>
        <Navbar />
        <StudentPendingAssign/>
      </div>
    )
  }
}

export default StudentDashboard
