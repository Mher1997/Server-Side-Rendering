import React, { Component } from 'react';

class Grid extends Component {
    constructor(props){
        super(props);
        let repos
        if (process.env.IS_CLIENT) {
            console.log('client')
            repos = window._INITIAL_DATA_
            delete window._INITIAL_DATA_
        } else {
            console.log('server')
            repos = props.staticContext.data
        }

        this.state = {repos}
    }

    fetchRepos = () => {
        this.props.fetchData()
            .then((repos) => this.setState({repos}))
    }

    componentDidMount () {
        if (!this.state.repos) {
            this.fetchRepos()
        }
    }

    render() {
        const { repos } = this.state

        return (
            <ul style={{display: 'flex', flexWrap: 'wrap'}}>
                {repos && repos.map(({ name, owner, stargazers_count, html_url }) => (
                    <li key={name} style={{margin: 30}}>
                    <ul>
                        <li><a href={html_url}>{name}</a></li>
                        <li>@{owner.login}</li>
                        <li>{stargazers_count} stars</li>
                    </ul>
                    </li>
                ))}
            </ul>
        )
    }
}

export default Grid