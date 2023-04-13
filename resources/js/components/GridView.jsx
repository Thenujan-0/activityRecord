function GridView({children, style}){
    return (<div className="d-flex flex-wrap" style={style}>
        {children}
    </div>)
}

export default GridView