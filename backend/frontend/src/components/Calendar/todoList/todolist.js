import React, { Component } from "react";
import Modal from "./Modal";
import axios from "axios";
import '../../../css/Calender/Calender.css'
import { MdCheckCircle } from 'react-icons/md'
import {BiEditAlt} from 'react-icons/bi'
import {RiDeleteBin5Line} from 'react-icons/ri'
import {BiTaskX} from 'react-icons/bi'
import {BiTask} from 'react-icons/bi'

const Token = localStorage.getItem('token')

class Todolist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      todoList: [],
      modal: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
      checked:0,
      isCompleted:false,
      isInCompleted:false,
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://127.0.0.1:8000/api/todos/", {
        headers: {
            Authorization: `Token ${Token}`
        }
      })
      .then((res) => this.setState({ todoList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
        axios
          .put(`http://127.0.0.1:8000/api/todos/${item.id}/`, item, {
            headers: {
                Authorization: `Token ${Token}`
            }
          })
          .then((res) => this.refreshList())
          .catch((err) => console.log(err));;
        return;
      }
      axios
        .post("http://127.0.0.1:8000/api/todos/", item, {
            headers: {
                Authorization: `Token ${Token}`
            }
        })
        .then((res) => this.refreshList())
        .catch((err) => console.log(err));;

    // alert("save" + JSON.stringify(item));
  };

  handleDelete = (item) => {
    // alert("delete" + JSON.stringify(item));
    axios
      .delete(`http://127.0.0.1:8000/api/todos/${item.id}/`, {
        headers: {
            Authorization: `Token ${Token}`
        }
      })
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayCompleted = (status) => {
    
    if (status) {
      return this.setState({ viewCompleted: true });
    }

    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
          onClick={() => {this.displayCompleted(true); this.setState({isCompleted:!this.state.isCompleted}); this.setState({isInCompleted:false})}}
        >
          {this.state.isCompleted?<BiTask size="30" color="#27cfb3"/>:<BiTask size="30" color="#dee2e6"/>}
          
          Complete
        </span>
        <span
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
          onClick={() => {this.displayCompleted(false); this.setState({isInCompleted:!this.state.isInCompleted}); this.setState({isCompleted:false})}}
        >
          {this.state.isInCompleted?<BiTaskX size="30" color="#27cfb3"/>:<BiTaskX size="30" color="#dee2e6"/>}
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed == viewCompleted
    );


    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>
          {this.state.checked== item.id ? <MdCheckCircle size="30" color="#008000"/>:<MdCheckCircle size="30" color="dee2e6"/>}
        </span>
        <span
          className={`todo-title ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
          onClick={()=>{this.setState({checked : item.id})}}
          onChange={this.handleSubmit}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            <BiEditAlt size="30" color="#FFFFFF"/>
            {/* Edit */} 수정
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            <RiDeleteBin5Line size="30" color="#FFFFFF"/>
            {/* Del */} 삭제
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main>
        <div className="todolist-container">
          <div>
            <div className="card p-3 todolist-container">
              <div>
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  {/* Add task */} 항목 추가
                </button>
              </div>
              {this.renderTabList()}
              <div className="todolist-wrapper">
              <ul className="list-group list-group-flush border-top-0 todolist-ul">
                {this.renderItems()}
              </ul>
              </div>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default Todolist;