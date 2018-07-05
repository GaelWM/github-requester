import React, { Component } from 'react'
import './App.css'
import axios from 'axios'



class App extends Component {
  constructor (){
    super()
    this.state = {
      username: '',
      repos: []
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    axios.get('https://api.github.com/users/gaelwm')
    .then(response => this.setState({username: response.data.name}))

    axios.get('https://api.github.com/users/gaelwm/repos')
    .then( response =>  this.setState({ repos: response.data }))

    axios.get('https://api.github.com/repos/gaelwm/github-requester/commits')
    .then(response => console.log({response}))
  }


  render(){

    const repoNames = this.state.repos.map(function(repo, i) {
      return <li key={i} style={{ color:'green' }}>{repo.name}</li>
    });

    return (
      <div className='button__container'>
        <button className='button' onClick={this.handleClick}> 
          Click Me
        </button>
        <p>{this.state.username}</p>
        <div>
          <h1>Repo Names</h1>
          <ul className='list-group'>
            {repoNames}
          </ul>
        </div>
      </div>
      
    )
  }
}

export default App