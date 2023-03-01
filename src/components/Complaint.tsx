import React from 'react'
import '../components_styles/Complaint.scss'

interface ComplaintProp{
  id: string, 
  name: string
}

function Complaint(props: ComplaintProp) {

  return (
    <div className='complaint'>
        <div>
            <input type="checkbox" id={props.id} name={`complaint_${props.id}`}/>
            <label htmlFor={props.id}>{props.name}</label>
        </div>
        
        <label id={props.id}>Тяжесть симптомов</label>
        <select className='complaint__select' id={props.id} name={`simptoms_${props.id}`}>
            <option value="0">Не выбрано</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select> 
        
    </div>
  )
}

export default Complaint