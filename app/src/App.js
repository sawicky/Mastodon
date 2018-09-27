import React, { Component } from 'react';
import express from 'express';
import logo from './resources/logo.jpg';
import './css/register.css'
import './css/style.css';
import './index.css';
import favicon from './resources/favicon.ico';

class App extends Component {
  const app = express();
  componentDidMount(){
    document.title = "UTS Medical"
  }
  render() {
    return (
    <html>
       <head>
            <title>Login Page</title>
            <link rel="shortcut icon" href={favicon}/> 
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"/>
       </head>
       <body>
        <header>
        <img src={logo} alt="UTS logo" className="logo"/>
          <div className="align-right">
            <button type="button" className="btn btn-secondary"> Button </button>
          </div>
        </header>
        <nav>
          <ul className="nav justify-content-center">
          <li class="nav-item">
            <a class="nav-link active" href="#">Future Students</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Current Students</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Research and teaching</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Partners and Community</a>
          </li>

          </ul>
        </nav>
        <main className="container">
        <div className="row">
          {/* Left side bar */}
          <aside className="col-lg-4 col-mg-12 col-sm-12">
            <div className="control-panel">
              <h4> STUDENT CONTROL PANEL </h4>
              <hr className="line" />
              <ul className="nav flex-column list-features">
                <li className="nav-item">
                  <a className="nav-link on-page" href="#">Book appointments</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">View status</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Send enquiry</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Edit personal details</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Change password</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Log out</a>
                </li>
              </ul>
            </div>
          </aside>
          {/* Main Section */}
          <section className="col-lg-8">
            <h1> Book appointments </h1>
          </section>
        </div>
      </main>
      <footer>
        <ul class="nav justify-content-center">
            <a href="">About UTS</a>
            <a href="">Library</a>
            <a href="">Newsroom</a>
            <a href="">Staff</a>
            <a href="">Contact us</a>
        </ul>
      </footer>     
     </body>
    </html>
    );
  }
}

export default App;
