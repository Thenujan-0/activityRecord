function PopupMenu({children,style}){
    return (<>
        <div className="position-absolute" style={style}>
            <div className="d-flex flex-column border border-rounded bg-white p-3">
                {children}
            </div>
        </div>
    </>)

}

export default PopupMenu