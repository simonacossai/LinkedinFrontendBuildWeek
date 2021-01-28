import React, { Component } from 'react'
import AddComment from './AddComment';
import './AddComment.css';

export default class CommentList extends Component {
    
    render() {
        return (
            <div>
                        <AddComment meProfile={this.props.meProfile} id={this.props.id} fetch={this.props.fetch}/>
                        {this.props.comments.map((e)=>{
                        return(
                            <>
                            <div className=" text-muted px-5 comment-div mx-5">
                            <div className="triangle"></div>
                                <p className="py-0 my-0 text-left comment-name">{e.name}</p><p className="py-0 my-0 text-left comment-text">{e.text}</p></div>

                            </>
                        )})
                        }

            </div>
        )
    }
}
