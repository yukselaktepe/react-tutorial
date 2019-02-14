import React, { Component } from 'react';
import UserConsumer from '../context'
import axios from 'axios'


class UpdateUser extends Component {

state={
    name :"",
    department:"",
    error:false
}

validateForm = ()=>{
    const {name,department} = this.state;
    if(name ==="" || department ==="")
        return false
    else 
        return true;
}
ChangeInput = (e)=>{
    this.setState({
        [e.target.name]:e.target.value,
        error:false
    })
}
UpdateUser=async (dispatch,e)=>{
    e.preventDefault();
    // update user
    const {id} = this.props.match.params;
    const {name,department} = this.state;
    const updatedUser ={
        name,
        department
    }
    if(!this.validateForm())
    {
        this.setState({
            error:true
        })
        return;
    }
    const response= await axios.put(`http://localhost:3000/users/${id}`,updatedUser);

    dispatch({
        type:"UPDATE_USER",
        payload : response.data
    })

    this.props.history.push('/');
}
componentDidMount = async () => {
  const {id} = this.props.match.params;
  const response = await axios.get(`http://localhost:3000/users/${id}`)
  const {name,department} = response.data;
  this.setState({
      name,
      department
  })
}


  render() {
    const {name,department,error} = this.state;

return <UserConsumer>
    {
        value=>{
            const {dispatch} = value;
            return (
                <div className ="col-md-8 mb-4">
                  <div className="card">
                      <div className="card-header">
                          <h4>Update User Form</h4>
                      </div>
                      <div className="card-body">
                         {
                               error ?
                               <div className="alert alert-danger">
                                    Lütfen alan bırakmayınız !
                               </div>
                               :null
                           }
                           <form onSubmit={this.UpdateUser.bind(this,dispatch)}>
                               <div className="form-group">
                                  <label htmlFor="name" >Name</label>
                                      <input
                                      type="text"
                                      name ="name"
                                      id="id"
                                      placeholder = "Enter Name"
                                      className="form-control"
                                      value = {name}
                                      onChange ={this.ChangeInput}
                                      />
                               </div>
                               <div className="form-group">
                                  <label htmlFor="department" >Department</label>
                                      <input
                                      type="text"
                                      name ="department"
                                      id="department"
                                      placeholder = "Enter Department"
                                      className="form-control"
                                      value = {department}
                                      onChange ={this.ChangeInput}
          
                                      />
                               </div>
                               <button className="btn btn-danger btn-block" type="submit">update  User</button>
                           </form>
                      </div>
                  </div>
                </div>
              
              )
        }
    }
</UserConsumer>

   
  }
}

export default UpdateUser;