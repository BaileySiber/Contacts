import React, { Component } from 'react';

class CreateContact extends Component {
  constructor() {
    super()
    this.state = {
      name: "",
      phone: "",
      birthday: "",
      contacts: [],
      toggle: true,
      edit: false
    }
  }


  componentDidMount() {
    fetch("/contacts")
    .then((response) => {
      if (response.status !== 200) {
        return {results: []}
      }
      return response.json()
    })
    .then((newresult) => {
     this.setState({contacts: newresult.results})
   })

  }

  deleteContact(id) {
    fetch('/delete/' + id)
    .then((res) => {
      console.log(res)
      if(res.status === 200) {
        return fetch("/contacts")
      }
      else{
        //bad
      }

    }).then((response) => {
     return response.json()
   })
    .then((newresult) => {
     this.setState({contacts: newresult.results})
   })

    .catch((err) => {
  // network error
    })
  }


  editContact(id) {

    this.setState({edit: id})

  }

  saveContact(id) {
    
    console.log(this.state.name)
    console.log(this.state.phone)
    console.log(this.state.birthday)

    fetch('/saveChanges/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        phone: this.state.phone,
        birthday: this.state.birthday
      })})
    .then((res) => {
      console.log(res)
      if(res.status === 200) {
        this.setState({edit: null})
        return fetch("/contacts")
      }
      else{
        //bad
      }

    }).then((response) => {
     return response.json()
   })
    .then((newresult) => {
     this.setState({contacts: newresult.results})
   })

    .catch((err) => {
  // network error
    })
  }


  createToggle() {
    this.setState({toggle: !this.state.toggle})
  }

  onNameChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  onPhoneChange = (event) => {
    this.setState({
      phone: event.target.value
    })
  }

  onBirthdayChange = (event) => {
    this.setState({
      birthday: event.target.value
    })
  }

  onClick = (event) => {     
       //make a post request from browser back to server
    fetch('/contact/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        phone: this.state.phone,
        birthday: this.state.birthday
      })
    }).then((res)=> {
      if(res.status === 200) {
        this.setState({toggle: !this.state.toggle})
        return fetch("/contacts")
      } else {
    // error
  }
}).then((response) => {
 return response.json()
})
.then((newresult) => {
 this.setState({contacts: newresult.results})
})

.catch((err) => {
  // network error
})

}

render() {

  const renderContact = () => {
    return this.state.contacts.map((contact) => {

      if (contact._id === this.state.edit) {
      return (
        <div className="contact" key={contact._id}> 
        <h1><input onChange={this.onNameChange} placeholder={contact.name} /></h1>
        <h3>Phone: <input onChange={this.onPhoneChange} placeholder={contact.phone} /></h3>
        <h3>DOB: <input onChange={this.onBirthdayChange} placeholder={contact.birthday} /></h3>
        <button onClick={() => this.saveContact(contact._id)} className="smallbtn">Save</button>
        <button onClick={() => this.deleteContact(contact._id)} className="smallbtn">Delete</button>
        </div>
        )
    }


    else {
       return (
        <div className="contact" key={contact._id}> 
        <h1>{contact.name}</h1>
        <h3>Phone: {contact.phone}</h3>
        <h3>DOB: {contact.birthday}</h3>
        <button onClick={() => this.editContact(contact._id)} className="smallbtn">Edit</button>
        <button onClick={() => this.deleteContact(contact._id)} className="smallbtn">Delete</button>
        </div>
        )
     }

    })
  }

  return (
    <div className="App">
    <header className="App-header">
    <h1 className="App-title">Contact List</h1>
    <button onClick={this.createToggle.bind(this)} className="btn">Add New Contact</button>
    </header>

    { this.state.toggle ? 
      <div className="inputs">
      <input onChange={this.onNameChange} className="field" placeholder="name" /><br/>
      <input onChange={this.onPhoneChange} className="field" placeholder="phone" /><br/>
      <input onChange={this.onBirthdayChange} className="field" type="date" placeholder="mm/dd/yyyy" /><br/>
      <button onClick={this.onClick} className="btn">Create</button>
      <button onClick={this.createToggle.bind(this)} className="btn">Cancel</button>
      </div>
      :
      <div />
    }

    {renderContact()}

    </div>
    );
}
}


export default CreateContact;