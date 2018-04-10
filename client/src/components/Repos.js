import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './styles.css'

export default class Repos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repos: []
    }
  }

  componentWillMount() {
    axios.get(`http://localhost:4500/getRepos`)
			.then((response) => {
        this.setState({ repos: response.data })
			}, (e) => { throw e })
			.catch((err) => {
				console.error(err)
			})
  }


  render() {
    return (
      <ul>
        {this.state.repos.map((el, idx) => <li key={idx}><Link to={`/repo/${el.name}`}>{el.name + idx}</Link></li>)}
      </ul>
    )
  }
}
