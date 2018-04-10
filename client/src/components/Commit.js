import React, { Component } from 'react'
import './styles.css'

export default class Commit extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.setState({hash: /^.+?\d$/.test(this.props.commit.sha)})
    this.setState({commit:this.props.commit.commit})
    this.setState({author:this.props.commit.committer})
  }

  render() {
    return (
      <div className={this.state.hash ? 'color' : ''}>
        {this.state.commit.author.name}<br/><br/>
        {this.state.commit.author.email}<br/><br/>
        {this.state.commit.message}<br/><br/>
        <img src={this.state.author.avatar_url}/><br/><br/>
        {new Date(this.state.commit.author.date).toString()}<br/><br/>
      </div>
    )
  }
}
