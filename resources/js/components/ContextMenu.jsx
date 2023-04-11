function ContextMenu({style,date}){

    function btnAddCallback(){
        
    }
    return (
    <div className="position-absolute" style={style}>
        <div className="d-flex flex-column border border-rounded bg-white p-3">
            <h5 className="mb-0">{date.toLocaleString('en-us', {month:'long'})+' '+date.getDate()}</h5>
            <hr />
            <button className="btn" onClick={btnAddCallback}>Add</button>
            <button className="btn">Edit</button>
            <button className="btn">Remove</button>
        </div>
    </div>)
}

export default ContextMenu;