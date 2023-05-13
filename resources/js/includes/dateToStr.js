function dateToStr(date){
    return date.toLocaleDateString().split( '/' ).reverse( ).join( '-' )
}

export default dateToStr