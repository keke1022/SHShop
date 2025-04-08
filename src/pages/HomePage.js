import { useState } from "react";
import { Link } from "react-router-dom";
import products from "../data/products.json";
import "./HomePage.css";

function HomePage() {
  // 定义是否自由模式的状态
  const [freeMode, setFreeMode] = useState(false);

  // 正常情况下，假设价格大于0为二手产品，价格等于0为赠送产品
  const secondHandProducts = products.filter((product) => product.price > 0);
  const donationProducts = products.filter((product) => product.price === 0);

  return (
    <div className="page-container">
      <h1 className="main-title">Willowtree出二手!</h1>
      <p className="description">
        联系方式: wx: j1600882808. 可小刀, 长期出. 二手商品越晚越便宜!
      </p>

      {/* 如果需要触发器可以取消下面按钮的注释 */}
      {/*
      <button
        className="trigger-button"
        onClick={() => setFreeMode(!freeMode)}
      >
        {freeMode ? "关闭免费模式" : "开启免费模式"}
      </button>
      */}

      <div className="navigation">
        <a href="#second-hand" className="nav-link">
          二手区
        </a>
        <a href="#donation" className="nav-link">
          赠送区
        </a>
      </div>

      <div id="second-hand" className="section">
        <h2 className="section-title">二手区</h2>
        <div className="product-container">
          {secondHandProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}>
                <img
                  src={`${process.env.PUBLIC_URL}/${product.image}`}
                  alt={product.name}
                  className="product-image"
                />
              </Link>
              <h3 className="product-name">{product.name}</h3>
              <p className="short-description">
                {product.shortDescription}
              </p>
              <p className="price">
                💰Price: 💲{freeMode ? 0 : product.price}
              </p>
              <Link to={`/product/${product.id}`} className="detail-link">
                🔍Details
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div id="donation" className="section">
        <h2 className="section-title">赠送区</h2>
        {donationProducts.length > 0 ? (
          <div className="product-container">
            {donationProducts.map((product) => (
              <div key={product.id} className="product-card">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={`${process.env.PUBLIC_URL}/${product.image}`}
                    alt={product.name}
                    className="product-image"
                  />
                </Link>
                <h3 className="product-name">{product.name}</h3>
                <p className="short-description">
                  {product.shortDescription}
                </p>
                <p className="price">
                  💰Price: 💲{freeMode ? 0 : product.price}
                </p>
                <Link to={`/product/${product.id}`} className="detail-link">
                  🔍Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-products">当前没有赠送的产品。</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;