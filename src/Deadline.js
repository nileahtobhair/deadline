import React, { Component } from 'react';
import moment from '../public/moment.js';
import './main.css';
import logo from '../public/deadline.svg';
import '../node_modules/jQuery/tmp/jquery.js';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

class Deadline extends Component {
  /*import files dynamically from directory*/
  importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); return 0; });
    return images;
  }

  calculate_deadline(event){
    var deadline = moment(moment(this.state.given_number).add(this.state.deadline_addition, 'years')).format('YYYY');
    var main = this;
    this.setState({
      deadline : deadline,
      show_menu : false
    },function(){
        main.display_number();
    })
  }
  display_number(){
    var deadline = this.state.deadline;
    if(deadline !== undefined && deadline.length > 3){
      this.setState({
          first : deadline[0],
          second: deadline[1],
          third: deadline[2],
          fourth : deadline[3]
      })
    }
  }
  /* Set state variable on date input change. */
  handle_input_change(event){
    this.setState({
      given_number : event.target.value
    })
  }
  /* Set values of initial state variables + dynamically import number images into array. */
  constructor(props){
    super(props);
    var images = this.importAll(require.context('../public/numbers', false, /\.(png|jpe?g|svg)$/));
    this.state = {
      first:1,
      second: 9,
      third: 9,
      fourth:3,
      given_number : "2016-01-01",
      deadline_addition : 123,
      deadline:undefined,
      numbers : images,
      show_menu: false
    }
  }
  reset(){
    this.setState({
      deadline : undefined
    })
  }
  /* Main render - called on update of state. */
  render() {
    var main = this;
    return (
      <div className="">
        <div className="header">
          <div className="logo-container"></div>
          <img alt="deadline logo" src={logo} className="main-logo"/>
          {this.state.deadline !== undefined ? 
            <div className="reset" onClick={(e) => this.reset(e) }>Reset</div>
          : null }
        </div>
       <div className="deadline">
          {this.state.deadline !== undefined ?
            <div className="deadline-display">
              <div className="image-container">
              <img className='digit-image' id="first-digit" alt="first-deadline-digit" src={this.state.numbers[this.state.first+'.svg']} />
              <img className='digit-image' id="second-digit" alt="second-deadline-digit" src={this.state.numbers[this.state.second+'.svg']} />
              <img className='digit-image' id="third-digit" alt="third-deadline-digit" src={this.state.numbers[this.state.third+'.svg']} />
              <img className='digit-image' id="fourth-digit" alt="fourth-deadline-digit" src={this.state.numbers[this.state.fourth+'.svg']}/>
              </div>
              <div className="explanation-blurb">
                <p>The oldest (verified) person that has ever lived died at age 122. </p>
                <p> Given that ,this is the earliest year that you will definitely not be alive.
                If you live to see this year, you will the first out of the 107 billion who have come before you to do so.</p>
                <p> By then you probably wont need the motivation that this page was set up to provide.</p>
                </div>
            </div>
          : 
          <span>
            <p> Enter your date of birth </p>
            <input className='enterdate' type="date" name="dateentered" value={main.state.given_number} onChange={ (e) => this.handle_input_change(e) } />
            <button className='calculate' onClick={(e) => this.calculate_deadline(e)}>Calculate</button>
          </span>
           }
         </div>
      </div>
    );
  }
}

export default Deadline;
