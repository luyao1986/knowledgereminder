import React from 'react';
import { Knowledge } from './Knowledge.jsx';
import { Grid, Row } from 'react-bootstrap';

export const ReminderList = ({loading, knowledgelist}) => {
    if(loading) {
        return <div>loading...</div>
    }
    let knowledges = knowledgelist.map( (knowledge) => {
      return <Knowledge key={knowledge._id} knowledge={knowledge}/>
    });
    return (
        <div>
            <Grid>
                <Row>
                    {knowledges}
                </Row>
            </Grid>
        </div>
    );
}
