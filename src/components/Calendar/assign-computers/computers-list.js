import React,{useEffect, useState} from 'react'
import "./computers-list-style.css" 
import {students} from '../data'
import {mentors} from '../data'
 
const ComputersList = (props)=>{

    const[assigned,setAssigned] = useState({
        mentor: false,
        student:false
    })
  
    const newList = []
    const numComputers = 10

    for(let i = 1;i<=numComputers;i++){
        newList.push('computer')
    }
    useEffect(()=>{
 
    })
 
    return(
        <div>
            {/* in case we somehow got here without props. */}
            {props.dragSelected ? <p className='date-time-string'>{props.dragSelected.start.toLocaleString()} to {props.dragSelected.end.toLocaleString()}</p>: null}
            <div className='container'>
                <div className='computer-list-container'>
                    {newList.map((computer,i)=>{
                        return(
                            <div className='computer-list' key ={i}>
                                <div className={assigned.mentor && assigned.student ? `available mentee-mentors-container`: `unavailable`}>{computer+(i+1)}</div>
                                <div>
                                    <select className='mentor-list' >
                                        <option value="none" selected disabled>Mentors List</option>
                                        {mentors.map((mentor,i)=>{
                                            return <option  key={i}>{mentor}</option>
                                        })}
                                    </select>
                                    <select  className = 'students-list' >
                                        <option value="none" selected disabled>Students List</option>
                                        {students.map((student,i)=>{
                                            return <option key ={i}>{student}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='buttons-container'>
                <button className='scheduler-button'>Submit</button>
                <button className='scheduler-button' onClick = {() => {
                        props.setShowWeekView(true)
                        props.setShowCalendar(!props.showCalendar);
                    }}>Return</button>
            </div> 
        </div>
    )
}
 
export default ComputersList
