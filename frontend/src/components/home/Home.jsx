import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    title: 'Home Page',
    subtitle: 'Blog desenvolvido em React'
}

const baseUrl = 'http://localhost:3001/posts'
const initialState = {
    posts: { name: '', email: '', post: '' },
    list: []
}

export default class PostsBlog extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ posts: initialState.posts })
    }

    save() {
        const posts = this.state.posts
        const method = posts.id ? 'put' : 'post'
        const url = posts.id ? `${baseUrl}/${posts.id}` : baseUrl
        axios[method](url, posts)
            .then(resp => {
                const list = this.getUpdateList(resp.data)
                this.setState({ posts: initialState.posts, list })
            })
    }

    getUpdateList(posts, add = true) {
        const list = this.state.list.filter(p => p.id !== posts.id)
        if (add) list.unshift(posts)
        return list

    }

    updateField(event) {
        const posts = { ...this.state.posts }
        posts[event.target.name] = event.target.value
        this.setState({ posts })
    }

    load(posts) {
        this.setState({ posts })
    }

    remove(posts) {
        axios.delete(`${baseUrl}/${posts.id}`).then(resp => {
            const list = this.getUpdateList(posts, false)
            this.setState({ list })
        })
    }

    renderCard() {
        return (
            <div>
                <div className="card-body">
                    <h2 className="card-title"></h2>
                    <p className="card-text"></p>
                    <h6 className="card-subtitle mb-2 text-muted"></h6>
                </div>
                <div>
                    {this.renderContent()}
                </div>
            </div>
        )
    }

    renderContent() {
        return this.state.list.map(posts => {
            return (
                <div className="card-body" key={posts.id}>
                    <div className="card">
                        <div className="card-body">
                            <h2>{posts.email}</h2>
                            <p>{posts.post}</p>
                            <h6>{posts.name}</h6>
                        </div>
                    </div>

                </div>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderCard()}
            </Main>
        )
    }
}