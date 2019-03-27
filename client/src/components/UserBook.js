import React, {Component} from 'react';
import {Button, ButtonGroup, Card} from 'react-bootstrap';
import { LineChart, Line } from 'recharts';
import Bookbar from './Bookbar';
import EntryInput from './EntryInput';
import Book from './Book';






export default class UserBook extends Book {
    constructor(){
        super();
        this.state={
            likeCount: 0,
        };
    }
    
    
    
    handleClick=(event)=>{
        event.preventDefault();
        this.props.deleteBook(this.props.book.id);
    }
    
    
    
    
    
    render(){
        return(
            
                
                    <Card bsstyle="primary ml-auto mr-auto" bsPrefix="book" >
                        <Card.Body>
                            
                            <Card.Title><h4>{this.props.book.title}</h4></Card.Title>
                        
                            <Card.Text >
                                {this.props.book.author}<br/>
                                <small>{this.props.book.genres}</small><br/>
                                {this.props.book.pages_read}/{this.props.book.pages}({this.props.book.percent_complete}%) read<br/>
                                {this.props.book.entries.length} entries
                                <Bookbar book={this.props.book}/>
                            </Card.Text>
                            
                            <footer>
                                <ButtonGroup>
                                    <EntryInput className="btn btn-primary" book={this.props.book} postEntry={this.props.postEntry} deleteEntry={this.props.deleteEntry} fetchUserBook={this.props.fetchUserBook}/>
                                    <Button className="btn btn-danger pull-right" id={this.props.book.id} onClick={this.handleClick}>X</Button>
                                    
                                </ButtonGroup>
                            </footer>
                        </Card.Body>
                    </Card>
                
            
        );
    }
}