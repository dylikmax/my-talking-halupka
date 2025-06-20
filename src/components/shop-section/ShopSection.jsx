import Product from "./Product";
import "./ShopSection.css"

function ShopSection({ name, allProducts, myProducts, onChange, onBuy, activeId }) {

    return <div className="shop-section">
        <h2>{ name }</h2>
        <div className="shop-products">
            {allProducts.map(product => <Product
                key={product.id}
                product={product}
                onChange={onChange}
                onBuy={onBuy}
                isBuyed={myProducts.find((pr) => pr === product.id) !== undefined}
                isActive={product.id === activeId}
            />)}
        </div>
    </div>
}

export default ShopSection;