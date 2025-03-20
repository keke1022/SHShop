import React from "react";
import { useParams, Link } from "react-router-dom";
import products from "../data/products.json";

function DetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h2 style={{ color: "red" }}>⚠️Not found！</h2>
        <p>可能已经被抢购啦</p>
        <Link to="/" style={{
          display: "inline-block",
          textDecoration: "none",
          backgroundColor: "#ff6600",
          color: "#fff",
          padding: "10px 15px",
          borderRadius: "5px",
          fontWeight: "bold"
        }}>⬅ 返回首页</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      {}
      <Link to="/" style={{
        display: "inline-block",
        textDecoration: "none",
        backgroundColor: "#ff6600",
        color: "#fff",
        padding: "10px 15px",
        borderRadius: "5px",
        fontWeight: "bold"
      }}>⬅ Return</Link>

      {}
      <h1 style={{ color: "#333", textAlign: "center", marginTop: "20px" }}>
        🛍️ {product.name}
      </h1>

      {}
      <p style={{ 
        fontSize: "24px", 
        fontWeight: "bold", 
        color: "#ff5500", 
        textAlign: "center" 
      }}>
        💰Price: 💲{product.price}
      </p>

      {}
      <p style={{ color: "#666", fontSize: "16px", lineHeight: "1.6", textAlign: "justify", marginBottom: "20px" }}>
        {product.longDescription}
      </p>

      {}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "15px",
        justifyContent: "center",
        padding: "10px"
      }}>
        {product.gallery.map((img, index) => (
          <img 
            key={index} 
            src={`${process.env.PUBLIC_URL}/${img}`} 
            alt="Wait for the Product" 
            width="100%" 
            style={{
              borderRadius: "10px", 
              boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease-in-out"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          />
        ))}
      </div>
    </div>
  );
}

export default DetailPage;