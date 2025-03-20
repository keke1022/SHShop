import React from "react";
import { useParams, Link } from "react-router-dom";
import products from "../data/products.json";

function DetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h2>商品未找到</h2>;
  }

  return (
    <div>
      <Link to="/">⬅ 返回首页</Link>
      <h1>{product.name}</h1>
      <p>价格: {product.price}</p>
      <p>{product.longDescription}</p>
      <div>
        {product.gallery.map((img, index) => (
          <img key={index} src={img} alt="产品图" width="200px" style={{ margin: "10px" }} />
        ))}
      </div>
    </div>
  );
}

export default DetailPage;