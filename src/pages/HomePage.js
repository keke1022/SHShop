import { Link } from "react-router-dom";
import products from "../data/products.json";

function HomePage() {
  return (
    <div>
      <h1>二手市场</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <div key={product.id} style={{ width: "200px", margin: "10px" }}>
            <img src={product.image} alt={product.name} width="100%" />
            <h3>{product.name}</h3>
            <p>{product.shortDescription}</p>
            <p>价格: {product.price}</p>
            <Link to={`/product/${product.id}`}>查看详情</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;