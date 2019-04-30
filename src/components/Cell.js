import React from 'react'

export default function Cell(props) {
  return (
    <div onClick={props.handleClick} className={"cell" + (props.color === 'white' ? "-white" : "") + (props.color === 'black' ? "-black" : "") + (props.selected === "yes" ? " selected" : "")} >
    </div>
  )
}