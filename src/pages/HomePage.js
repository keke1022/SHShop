import { Link } from "react-router-dom";
import products from "../data/products.json";

function HomePage() {
  return (
    <div>
      <h1>🎉欢迎来到二手市场🎉</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              width: "220px",
              border: "2px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              textAlign: "center",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              transition: "transform 0.2s ease-in-out",
              cursor: "pointer",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Link to={`/product/${product.id}`}>
              <img
                src={`${process.env.PUBLIC_URL}/${product.image}`}
                alt={product.name}
                width="100%"
                style={{ borderRadius: "8px", cursor: "pointer" }}
              />
            </Link>
            <h3 style={{ color: "#333", marginTop: "10px" }}>{product.name}</h3>
            <p style={{ color: "#888", fontSize: "14px" }}>
              {product.shortDescription}
            </p>
            <p
              style={{ fontSize: "18px", fontWeight: "bold", color: "#ff5500" }}
            >
              💰Price: 💲{product.price}
            </p>
            <Link
              to={`/product/${product.id}`}
              style={{
                display: "inline-block",
                textDecoration: "none",
                color: "#fff",
                backgroundColor: "#ff6600",
                padding: "8px 15px",
                borderRadius: "5px",
                marginTop: "10px",
                fontWeight: "bold",
              }}
            >
              🔍Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
