import { Jumbotron } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router'
import { routerdefinition } from '../constants/router.js';

export const HomePage = ()=>{
    return (
        <Jumbotron>
            <p>&nbsp;&nbsp;Sometimes you see a very good article, or some good english words/sentences ... that you want to learn more than just see.
                But you want someone to help you. This app can be your friend! We can remind you until you remember it according to human memory line!</p>
            <p><Link to={"/"+routerdefinition.addreminder}>try!</Link></p>
        </Jumbotron>
    );
}
