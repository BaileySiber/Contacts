import React, { Component } from 'react';

class CreateContact extends Component {
  constructor() {
    super()
    this.state = {
      name: "",
      phone: "",
      birthday: new Date,
      contacts: []
    }
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

  onClick = (event) => {          //make a post request from browser back to server
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
    // worked
  } else {
    // error
  }
}).catch((err) => {
  // network error
})
  fetch("/contacts")
  .then((response) => {
   return response.json()
      })
    .then((newresult) => {
       this.setState({contacts: newresult.results})
    })
   
}

  render() {

    const renderContact = () => {
      return this.state.contacts.map((contact) => {
      
        return (
          <div key={contact.name}> 
            <h1>{contact.name}</h1>
              <ul>
                <li>{contact.phone}</li>
                <li>{contact.birthday}</li>
              </ul>
          </div>
          )
      })
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create Contact</h1>
        </header>

        <div className="inputs">
          <input onChange={this.onNameChange} className="field" placeholder="name" /><br/>
          <input onChange={this.onPhoneChange} className="field" placeholder="phone" /><br/>
          <input onChange={this.onBirthdayChange} className="field" type="date" placeholder="mm/dd/yyyy" /><br/>
          <button onClick={this.onClick} className="btn">Create</button>
      </div>

      {renderContact()}

      </div>
    );
  }
}


export default CreateContact;