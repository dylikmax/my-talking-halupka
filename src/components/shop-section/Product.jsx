function Product({ product, isActive, isBuyed, onChange, onBuy }) {
    
    return <div className={`product ${isActive ? "active" : ""}`} onClick={isActive ? () => {} : isBuyed ? onChange(product) : onBuy(product)}>
        <img src={product.image} className="product-img"/>
        <span className="name">{product.name}</span>
        {isActive ? "Установлено" : isBuyed ? "Куплено" : <div className="product-cost">{product.cost}<img src="svg/honey-icon.svg" className="product-honey"/> </div>}
    </div>
}

export default Product;