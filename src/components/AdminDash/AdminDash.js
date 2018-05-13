import React, {Component} from 'react';
import axios from 'axios';
import AdminList from '../AdminList/AdminList';
import './AdminDash.css';
import { handleUsersChange, removeUser } from '../../utils/adminfns/adminfns';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { Button } from 'semantic-ui-react';

class AdminDash extends Component {
    constructor(){
        super();
        this.state = {
            students:[
                {
                    name: 'Jose Gonzalez',
                    email: 'jose@jose.jose',
                    phone:'801-801-8018',
                    userType:'Student',
                    id:98234598
                },
                
                {
                    name:'Hermione Granger',
                    email:'ilovebooks55@gmail.com',
                    phone:'801-801-8017',
                    userType:'Student',
                    id:1934875
                },
                {
                    name:'Goku',
                    email:'supersaiyinlol@capsulecorp.com',
                    phone:'801-801-8016',
                    userType:'Student',
                    id:981357
                }
            ],
            instructors:[
                {
                    name:'The Grandmaster',
                    email:'fearTheMeltyStick@grandmaster.io',
                    phone:'801-801-8015',
                    userType:'Instructor',
                    id:89734509
                },
                {
                    name:'Albus Dumbledore',
                    email:'justsendanowl@owlmail.owl',
                    phone:'801-801-8014',
                    userType:'Instructor',
                    id:2359879134
                }
            ],
            adminID:3,
            snackOpen:false
        }
        this.handleUsersChange = handleUsersChange.bind(this);
        this.removeUser = removeUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.handleSnack = this.handleSnack.bind(this);
    }

    componentDidMount(){
        // uncomment this when ready for production--this authenticates the user before getting the data
        // axios.get('/auth/me').then( response => {
        //     this.setState({adminID:response.data.id});
        //     axios.get(`/api/registry/${this.state.adminID}`).then( response => {
        //         this.setState({
        //             students:response.data.students, 
        //             instructors:response.data.instructors
        //         });
        //     });
        // });
        axios.get(`/api/registry/${this.state.adminID}`).then( response => {
            this.setState({
                students:response.data.students, 
                instructors:response.data.instructors
            });
        });
    };
    handleSnack( bool){
        this.setState({
            snackOpen:bool
        })
    }
    addUser( name, email, phone, userType, id ){
        axios.post('/api/registry/addUser', {name, email, phone, userType, id}).then( response => {
            let { name:newName, email:newEmail, phone:newPhone, userType:newUserType, id:newID } = response.data;
            this.handleUsersChange(newName, newEmail, newPhone, newUserType, newID)
            
        })
    }
    editUser( name, email, phone, userType, id ){
        axios.put('/api/registry/editUser', {name, email, phone, userType, id}).then( response => {
            let { name:newName, email:newEmail, phone:newPhone, userType:newUserType, id:newID } = response.data;
            this.handleUsersChange(newName, newEmail, newPhone, newUserType, newID)
        })
    }
    deleteUser(id){
        axios.delete(`/api/registry/deleteUser/${id}`).then( result => {
            // let {id} = result.data
            // this.removeUser(result.data.id)
            // this.handleSnack(true)
            console.log(this)
        })
    }
    render(){
        const { students, instructors } = this.state;

        

        return(
            <div className='dash'>
                <div className='lists'>
                    <AdminList
                        type = 'Students'
                        list = {students}
                        handleUsersChangeFn = {this.handleUsersChange}
                        addUserFn = {this.addUser}
                        editUserFn = {this.editUser}
                        deleteUserFn = {this.deleteUser}
                    />
                    <AdminList
                        type = 'Instructors'
                        list = {instructors}
                        handleUsersChangeFn = {this.handleUsersChange}
                        addUserFn = {this.addUser}
                        editUserFn = {this.editUser}
                        deleteUserFn = {this.deleteUser}
                    />
                </div>
                <Snackbar 
                    open = {this.state.snackOpen}
                    autoHideDuration = {3000}
                    onClose ={() => this.handleSnack(false)}
                    action={[
                        <Button id='ok'onClick={() => this.handleSnack(false)}>
                        OK 
                        </Button>
                    ]}
                    message={<span>User Deleted</span>}
                />
            </div>
        )
    }
}

function mapStateToProps ( state ){
    return {
        user:state.user
    }
}

export default connect(mapStateToProps,null)(AdminDash)