import React from 'react'

export default function Cell(props) {
  return (
    <div className={"cell" + (props.white ? "-white" : "") + (props.black ? "-black" : "")} >
    </div>
  )
}