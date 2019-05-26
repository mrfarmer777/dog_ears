import React, {Component} from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchUserEntries, postEntry, deleteEntry } from '../actions/entryActions';
import { fetchUserBooks, postBook } from '../actions/bookActions';

import EntryInput from '../components/EntryInput';
import Entries from '../components/Entries';
import BookInput from '../components/BookInput';
import {logoutUser} from '../services/user';
import StatsContainer from "../containers/StatsContainer";
import Invites from "../components/Invites";

class HomeContainer extends Component{
    
    constructor(){
        super()
        this.state={
            bookFormOpen: false,
        }
    }
    
    handleLogout = ()=>{
        logoutUser();
        this.setState({
            bookFormOpen: false,
        })
    }
    
    componentDidMount(){
        this.props.fetchUserBooks();
    }
    
    render(){
            return (
                <div className="container-fluid">
                    
                               
                    
                                
                
                
                
                    
                    <BookInput postBook={this.props.postBook} />
                    <Entries entries={this.props.entries} fetchEntries={this.props.fetchEntries} deleteEntry={this.props.deleteEntry} />
                    <button onClick={this.handleLogout}>Logout</button>
                </div>
            
            )
    }
}

const mapStateToProps = state =>{
    return {
        entries: state.entries,
        books: state.books,
        bookFormOpen: state.bookFormOpen,
        user: state.user,
        invites: state.user.section_invites
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        addEntry: (payload) => dispatch({type: "ADD_ENTRY", payload: payload}),
        postEntry: (entry) => dispatch(postEntry(entry)),
        deleteEntry: (id) => dispatch(deleteEntry(id)),
        fetchUserBooks: () => dispatch(fetchUserBooks()),
        postBook: (book) => dispatch(postBook(book))
    }
}



export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HomeContainer))