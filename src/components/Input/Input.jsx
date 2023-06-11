import './input.css';

function Input({ type, name, textLabel, handleChange,value}) {



    return (
        <div className="inputBox">
                <label htmlFor={name}>{textLabel}</label>
                <input value={value} onChange={handleChange} name={name} type={type} id={name} />   
        </div>
    )
}

export default Input;