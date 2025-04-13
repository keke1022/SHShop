import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import products from "../data/products.json";

function DetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [freeMode, setFreeMode] = useState(false);

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h2 style={{ color: "red" }}>⚠️Not found！</h2>
        <p>可能已经被抢走了，出手还是要快！</p>
        <Link
          to="/"
          style={{
            display: "inline-block",
            textDecoration: "none",
            backgroundColor: "#ff6600",
            color: "#fff",
            padding: "10px 15px",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          ⬅ 回到主页看看别的好物
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>

      {/* <button 
        onClick={() => setFreeMode(!freeMode)}
        style={{
          padding: "8px 15px",
          marginBottom: "20px",
          fontSize: "16px"
        }}
      >
        {freeMode ? "关闭免费模式" : "开启免费模式"}
      </button> */}

      <Link
        to="/"
        style={{
          display: "inline-block",
          textDecoration: "none",
          backgroundColor: "#ff6600",
          color: "#fff",
          padding: "10px 15px",
          borderRadius: "5px",
          fontWeight: "bold",
        }}
      >
        ⬅ Return
      </Link>

      <h1
        style={{
          color: "#333",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        {product.name}
      </h1>

      <p
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#ff5500",
          textAlign: "center",
        }}
      >
        Price: {freeMode ? "🎁 免费领取" : `💲${product.price}`}
      </p>

      <h3 style={{ color: "#444", marginTop: "30px", marginBottom: "10px" }}>
        📦 商品详情
      </h3>

      <p
        style={{
          color: "#666",
          fontSize: "16px",
          lineHeight: "1.6",
          textAlign: "justify",
          marginBottom: "20px",
          whiteSpace: "pre-line",
        }}
      >
        {product.longDescription}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        {product.gallery.map((img, index) => (
          <img
            key={index}
            src={`${process.env.PUBLIC_URL}/${img}`}
            alt="Wait for the Product"
            width="100%"
            style={{
              borderRadius: "10px",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease-in-out",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          />
        ))}
      </div>
    </div>
  );
}

export default DetailPage;