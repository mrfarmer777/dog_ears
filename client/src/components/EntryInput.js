import React, {Component} from 'react'
import {Button, FormGroup, FormLabel, FormControl, Modal, Container} from 'react-bootstrap'



//This and the book entry could be a form of HOC in the future, they share much of the same functionality.
export default class EntryInput extends Component{
    constructor(props){
        super(props)
        this.state={
            user_book_id: ""+props.book.id,
            minutes_read: "0",
            entry_page: ""+props.book.pages_read,
            entry_content: "",
            formOpen: false,
        }
    }
    
    handleChange=(event)=>{
        this.setState({
            [event.target.name]: event.target.value,
        })
        
    }
    
    handleSubmit=(event)=>{
        event.preventDefault();
        
        this.props.postEntry(this.state)
        .then(this.props.fetchUserBook(this.state.user_book_id))
        .then(this.setState({
            user_book_id: ""+this.props.book.id,
            minutes_read: "0",
            entry_page: ""+this.props.book.pages_read,
            entry_content: "",
            pages_read: "0",
            formOpen: false
        }));
        
    }
    
    toggleForm=()=>{
       
        this.setState({
            ...this.state,
            formOpen: !this.state.formOpen
        })
    }
    
    
    
    
    render(){
        
        return (
            <Container>
                
                <Modal show={this.state.formOpen} onHide={this.toggleForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a Book Entry</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <FormLabel htmlFor="book_id">Book: </FormLabel>
                                <FormControl as="select" name="book_id" value={this.state.book_id} onChange={this.handleChange}>
                                    <option key={this.props.book.id} value={this.props.book.id}>{this.props.book.title}</option>
                                    
                                </FormControl>
                            </FormGroup>
                            <FormGroup >
                                <FormLabel htmlFor="minutes_read">Minutes: </FormLabel>
                                <FormControl type="number" name="minutes_read" id="minutes_read" step="5" onChange={this.handleChange} value={this.state.minutes_read}/>
                            
                                <FormLabel htmlFor="entry_page">Currently on page: (you've read {this.state.entry_page-this.props.book.pages_read} since your last entry.)</FormLabel>
                                <FormControl type="number" name="entry_page" id="entry_page" step="1" onChange={this.handleChange} value={this.state.entry_page} min={this.props.book.pages_read} max={this.props.book.pages}/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel htmlFor="entry_content">What did you think? </FormLabel>
                                <FormControl type="text" name="entry_content" id="entry_content" onChange={this.handleChange} value={this.state.entry_content} maxLength="500"></FormControl>
                            </FormGroup>
                            <Button bsstyle="primary" type="submit" value="New Entry">New Entry</Button>
        
                        </form>
                    </Modal.Body>
                </Modal>
                
                <Button onClick={this.toggleForm} >Read!</Button>
            </Container>
            
            )
    }
    
}