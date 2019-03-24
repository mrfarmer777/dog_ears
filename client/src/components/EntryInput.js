import React, {Component} from 'react'
import {Button, FormGroup, FormLabel, FormControl, Modal, Container} from 'react-bootstrap'



//This and the book entry could be a form of HOC in the future, they share much of the same functionality.
export default class EntryInput extends Component{
    constructor(props){
        super()
        this.state={
            book_id: props.book.id,
            time: "0",
            pages: "0",
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
        this.props.postEntry(this.state);
        this.setState({
            book_id: "",
            time: "0",
            pages: "0",
            formOpen: false
        })
        
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
                <Button onClick={this.toggleForm} >Read!</Button>
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
                                <FormLabel htmlFor="time">Minutes: </FormLabel>
                                <FormControl type="number" name="time" id="time" step="5" onChange={this.handleChange} value={this.state.time}/>
                            
                                <FormLabel htmlFor="pages">Pages: </FormLabel>
                                <FormControl type="number" name="pages" id="pages" step="1" onChange={this.handleChange} value={this.state.pages}/>
                            </FormGroup>
                            <Button bsstyle="primary" type="submit" value="New Entry">New Entry</Button>
        
                        </form>
                    </Modal.Body>
                </Modal>
            </Container>
            
            )
    }
    
}