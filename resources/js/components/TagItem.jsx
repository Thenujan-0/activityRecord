function TagItem({name, onClick,id}){
    let class_ = "card m-2 p-3"

    return (<>
        <div className={class_} onClick={onClick} role="button" id={id}>
            <h6 className="mb-0">{name}</h6>
        </div>
    </>)
}

export default TagItem