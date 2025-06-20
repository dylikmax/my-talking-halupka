import "./Honey.css"

function Honey({ count }) {
    return <div className="honey-wrapper">
        <img src="svg/honey-icon.svg" className="honey-icon"/>
        { count }
    </div>
}

export default Honey;