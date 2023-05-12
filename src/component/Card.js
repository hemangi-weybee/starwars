import React from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'

function Card(props) {
    return (
        <div className="card" >
            <div className="cardImg">
                <img alt="img" src={`https://starwars-visualguide.com/assets/img/${props.img}.jpg`}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                    }}
                />
            </div>
            <div className="cardName">
                <h3 id={props.name}>{props.name}</h3>
                <Tooltip anchorId={props.name} content={props.name}/>
            </div>
        </div >
    );
}

export default Card