import React, { Component } from 'react'
import AddComment from './AddComment';

export default class CommentList extends Component {
    
    render() {
        return (
            <div>
                        <AddComment meProfile={this.props.meProfile} id={this.props.id} fetch={this.props.fetch}/>
                        {this.props.comments.map((e)=>{
                        return(
                            <div className="d-flex justify-content-between text-muted px-2"><span>{e.name}</span><span>{e.text}</span></div>
                        )})
                        }

            </div>
        )
    }
}
