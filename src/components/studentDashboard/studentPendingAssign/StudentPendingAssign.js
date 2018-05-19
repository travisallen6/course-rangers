import React, {Component} from 'react';
import './StudentPendingAssign.css';
import StudentAssignmentDetail from './../StudentAssignmentDetail/StudentAssignmentDetail';

export default class PendingAssignCard extends Component {
    render() {
        return (
            <div className='card'>
                <h2>Pending Assignments</h2>
                <hr/>
                <StudentAssignmentDetail/>
                <div className='card2'>
                    <h2>My Courses</h2>
                    <hr/>
                </div>
            </div>
        )
    }
}
