import React, { Component } from 'react'
import axios from 'axios'
import Commit from './Commit'

export default class Repo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commits: []
    }
  }

  componentWillMount() {
    axios.get(`http://localhost:4500/getCommits/${this.props.match.params.name}`)
			.then((response) => {
        this.setState({ commits: response.data })
			}, (e) => { throw e })
			.catch((err) => {
				console.error(err)
			})
  }


  render() {
    return (
      <ul>
        {this.state.commits.map((el, idx) => <li key={idx}><Commit commit={el}/></li>)}
      </ul>
    )
  }
}
