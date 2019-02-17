import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
    this.handleClick = this.handleClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
		this.state = {
			users: [],
			user: {},
			error: '',
			modal: false
		};
	}
	componentDidMount() {
		//set global header
		axios.defaults.headers.common['x-api-key'] = 'b2ac60d8-6e21-41b1-980f-33ec13134ed0';

		axios
			.get('https://testing.euw.istaffsystems.com/users')
			.then(response => {
				console.log(response);
				this.setState({ users: response.data });
			})
			.catch(error => {
				this.setState({ error: 'Oj tyvärr gick något fel :(' });
				console.log(error);
			});
	}
	handleClick = value => {
		console.log(value);
		this.getUser(value);
  };
  closeModal() {
    this.setState({modal: false})
  }
	getUser(id) {
		axios
			.get(`https://testing.euw.istaffsystems.com/user/${id}`)
			.then(response => {
				console.log(response);
				this.setState({ user: response.data });
				this.setState({ modal: !this.state.modal });
				console.log(this.state.modal);
				console.log('from user' + this.state.user.firstname);
			})
			.catch(error => {
				console.log(error);
			});
	}
	render() {
		const { users, modal, user } = this.state;

		return (
			<div>
				<h1>Hej läkarleasing, Här är programmeringsprovet</h1>
          <h2>Alexander Grace</h2>
				{modal ? (
					<div className="modal">
							<div className="modal-close" onClick={this.closeModal}>stäng</div>
                {user.firstname} {user.lastname}
							  <div className="email">{user.email}</div>
					</div>
				) : (
					<div />
				)}
				{users.map(user => (
					<div key={user.id}>
						<div className="user" onClick={this.handleClick.bind(this, user.id)}>
							{user.name}
						</div>
					</div>
				))}
			</div>
		);
	}
}

export default App;
