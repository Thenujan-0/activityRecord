function GridView({children, style, className}){
    return (<div className={"d-flex flex-wrap "+(className? className : '')} style={style}>
        {children}
    </div>)
}

export default GridView