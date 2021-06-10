import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    title: 'Nova Postagem',
    subtitle: 'Incluir uma nova postagem na Home Page'
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

    renderForm() {
        return (
            <div className="form" id="back-topo">
                <h3>Fazer uma nova postagem</h3>
                <br />
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Título da Postagem</label>
                            <input type="text" className="form-control" name="email"
                                value={this.state.posts.email} onChange={e => this.updateField(e)}
                                placeholder="Digite o título do seu Post" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome do Autor</label>
                            <input type="text" className="form-control" name="name"
                                value={this.state.posts.name} onChange={e => this.updateField(e)}
                                placeholder="Digite o nome do Autor" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-12">
                        <div className="form-group">
                            <label>Postagem</label>
                            <textarea name="post" className="form-control" cols="120" rows="10"
                                value={this.state.posts.post} onChange={e => this.updateField(e)}
                                placeholder="Descreva a postagem"></textarea>

                        </div>
                    </div>
                </div>



                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Postar
                        </button>
                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>

                <hr />
            </div>
        )
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
                    <h3>Editar ou Excluir Postagens</h3>
                    <h5 className="card-title"></h5>
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
                            <h5>{posts.email}</h5>
                            <p>{posts.post}</p>
                            <h6>{posts.name}</h6>
                            <a href="#back-topo">
                                <button className="btn btn-warning"
                                    onClick={() => this.load(posts)}>
                                    <i className="fa fa-pencil"></i>
                                </button>
                            </a>
                            <button className="btn btn-danger ml-2"
                                onClick={() => this.remove(posts)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </div>
                    </div>

                </div>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                
            </Main>
        )
    }
}