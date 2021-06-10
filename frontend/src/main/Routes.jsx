import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import PostsBlog from '../components/posts/PostsBlog'
import EditPost from '../components/posts/EditPost'

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/posts' component={PostsBlog} />
        <Route path='/edit' component={EditPost} />
        <Redirect from='*' to='/' />
    </Switch>