interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  photo: string;
}

const Product = (product: Product) => {

  console.log(product);
    return (
        <div key={product.id} className="product-card">
            <h2>{product.name}</h2>
            <p>Description : {product.description}</p>
            <p>Prix : {product.price}</p>
            {product.photo && (
                <img src={product.photo} alt={product.name} />
          )}
        </div>
    )

}

export default Product;