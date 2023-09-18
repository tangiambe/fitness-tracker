import React from 'react';

function BootstrapCard(props) {
  return (
    <div className="card" style={{ width: '100%', margin:0 }}>
      <div className="card-header">
        {props.title}
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{props.content}</li>
        {/* Add more list items here if needed */}
      </ul>
    </div>
  );
}

export default BootstrapCard;
