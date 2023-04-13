import PopupMenu from './PopupMenu.jsx'
import SelectTags from './SelectTags.jsx';
function ContextMenu({style,date,onAdd}){

    function addCallback(e){
        onAdd()
        e.stopPropagation()
    }

    return (
        <PopupMenu style={style}>
            <h5 className="mb-0">{date.toLocaleString('en-us', {month:'long'})+' '+date.getDate()}</h5>
            <hr />
            <button className="btn" onClick={addCallback}>Add</button>
            <button className="btn">Edit</button>
            <button className="btn">Remove</button>
        </PopupMenu>
        )
}

export default ContextMenu;