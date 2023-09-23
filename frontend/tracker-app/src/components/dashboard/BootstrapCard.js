import React from 'react';
import '../../styles/Card.css';

function BootstrapCard(props) {
  return (
    <div className="card-dashboard" style={{ width: '100%', margin: 0 }}>
      <div className="card-body">
        <div className="card-header1">
          <h4> {props.title} </h4>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{props.content}</li>
          {/* Add more list items here if needed */}
        </ul>
      </div>
    </div>
  );
}

export default BootstrapCard;
