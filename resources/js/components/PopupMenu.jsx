import { forwardRef } from "react"

function PopupMenu({children,style}, ref){
    return (<>
        <div className="position-absolute" style={style} ref={ref}>
            <div className="d-flex flex-column border border-rounded bg-white p-3">
                {children}
            </div>
        </div>
    </>)

}

export default forwardRef(PopupMenu)