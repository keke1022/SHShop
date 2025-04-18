import { useState } from "react";
import { Link } from "react-router-dom";
import products from "../data/products.json";
import "./HomePage.css";

function HomePage() {
  // 定义价格过滤器状态，初始值设为30
  const [priceFilter, setPriceFilter] = useState(999);

  // 假设滑条最大值为100，根据需求也可以动态计算
  const maxPriceFilter = 999;

  // 过滤出价格大于0且低于等于 priceFilter 的二手商品
  const secondHandProducts = products.filter(
    (product) => product.price > 0 && product.price <= priceFilter
  );

  // 过滤出赠送商品，价格为0
  const donationProducts = products.filter((product) => product.price === 0);

  const handleSliderChange = (e) => {
    setPriceFilter(Number(e.target.value));
  };

  return (
    <div className="page-container">
      <h1 className="main-title">
        <img
          src="https://raw.githubusercontent.com/keke1022/picgo/main/pic/202504181529805.png"
          alt=""
          style={{
            width: "1.2em",
            verticalAlign: "middle",
            marginRight: "0.3em",
          }}
        />
        Willowtree 清仓
      </h1>
      <p className="description">
        微信：<strong>j1600882808</strong> ｜持续更新｜支持小刀，最好自取,
        越晚越便宜，机会难得！
      </p>

      {/* 价格过滤滑条 */}
      <div className="price-filter">
        <label htmlFor="priceRange" style={{ marginRight: "10px" }}>
          仅显示价格低于：${priceFilter}
        </label>
        <input
          id="priceRange"
          type="range"
          min="0"
          max={maxPriceFilter}
          value={priceFilter}
          onChange={handleSliderChange}
        />
      </div>

      <div className="navigation">
        <a href="#second-hand" className="nav-link">
          二手区
        </a>
        <a href="#donation" className="nav-link">
          赠送区
        </a>
      </div>

      {/* 二手区 */}
      <div id="second-hand" className="section">
        <h2 className="section-title">🛒 二手精选</h2>
        {secondHandProducts.length > 0 ? (
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
                  {product.shortDescription || "暂无描述，点进来或许有惊喜"}
                </p>
                <p className="price">💰 价格：${product.price}</p>
                <Link to={`/product/${product.id}`} className="detail-link">
                  🔍 查看详情
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-products">
            没有找到符合条件的商品，试试调高筛选价格！
          </p>
        )}
      </div>

      {/* 赠送区 */}
      <div id="donation" className="section">
        <h2 className="section-title">🎁 免费赠送</h2>
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
                  {product.shortDescription || "这商品免费，但品质依然在线"}
                </p>
                <p className="price">💰 价格：$0</p>
                <Link to={`/product/${product.id}`} className="detail-link">
                  🔍 查看详情
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-products">目前暂无赠送商品，先看看二手精选吧！</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
