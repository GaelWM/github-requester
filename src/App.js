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

    // const repoNames = this.state.repos.map(function(repo, i) {
    //   return <li key={i} style={{ color:'green' }}>{repo.name}</li>
    // });

    return (
      // <div className='button__container'>
      //   <button className='button' onClick={this.handleClick}>
      //     Click Me
      //   </button>
      //   <p>{this.state.username}</p>
      //   <div>
      //     <h1>Repo Names</h1>
      //     <ul className='list-group'>
      //       {repoNames}
      //     </ul>
      //   </div>
      //   <Profile  />
      //   <Repository  />
      // </div>

        <div className="row">
          <div className="col-md-6">
            <div className="panel">
              <div className="panel-header">
                MY PROFILE
              </div>
              <div className="panel-body">
                <Profile  />
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="panel">
              <div className="panel-header">
                REPOS
              </div>
              <div className="panel-body">
                <Repository  />
              </div>
            </div>

          </div>

        </div>


      
    )
  }
}

class Profile extends Component{
    constructor(){
        super();
        this.state = {
            name: '', company: '', img_link: ''
        }

        this.handleProfile = this.handleProfile.bind(this);
    }

    handleProfile ()
    {
        axios.get('https://api.github.com/users/gaelwm')
            .then(response => this.setState({name: response.data.name, company: response.data.company, img_link: response.data.avatar_url}))
    }

    render(){
        return(
            <div className="card bg-default mb-3" style={{ width:'400px' }}>
              <img className="card-img-top" src={this.state.img_link} alt="" />
              <div className="card-body">
                <h4 className="card-title">{this.state.name}</h4>
                <p className="card-text">{this.state.company}</p>
                <button className="btn btn-primary" onClick={this.handleProfile}>Load My Profile</button>
              </div>
            </div>
        )
    }
}

class Repository extends Component{
    constructor(){
        super();
        this.state = {
            repos: []
        }

        this.handleGetRepo = this.handleGetRepo.bind(this);
    }

    handleGetRepo ()
    {
        axios.get('https://api.github.com/users/gaelwm/repos')
            .then( response =>  this.setState({ repos: response.data }))
    }

    render(){

        const repoNames = this.state.repos.map(function(repo, i) {
            return <a key={i} className="list-group-item list-group-item-action">{repo.name}</a>
        });

        return(
            <div className="list-group">
                {repoNames}
                <button className="btn btn-primary" onClick={this.handleGetRepo}>Get My Repositories</button>
            </div>
        )
    }
}

export default App



