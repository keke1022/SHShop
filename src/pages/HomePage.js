import { useState } from "react";
import { Link } from "react-router-dom";
import products from "../data/products.json";
import "./HomePage.css";

function HomePage() {
  // 游戏风格的价格过滤器
  const [priceFilter, setPriceFilter] = useState(999);
  // 排序方式
  const [sortOrder, setSortOrder] = useState("desc");

  // 假设滑条最大值为999
  const maxPriceFilter = 999;

  // 过滤出价格大于0且低于等于 priceFilter 的二手商品
  const secondHandProducts = products
    .filter((product) => product.price > 0 && product.price <= priceFilter)
    .sort((a, b) => {
      if (sortOrder === "desc") {
        return b.price - a.price;
      } else {
        return a.price - b.price;
      }
    });

  // 过滤出赠送商品，价格为0
  const donationProducts = products.filter((product) => product.price === 0);

  // 过滤出"给钱就出"商品，价格为-1
  const negotiableProducts = products.filter((product) => product.price === -1);

  const handleSliderChange = (e) => {
    setPriceFilter(Number(e.target.value));
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="page-container">
      {/* 游戏风格标题 */}
      <div className="game-header">
        <h1 className="main-title">
          Willowtree 清仓
        </h1>
      </div>

      <p className="description">
        <span className="pixel-icon">📱</span> 微信：<strong>j1600882808</strong> ｜
        <span className="pixel-icon">🔄</span> 持续更新｜
        <span className="pixel-icon">💰</span> 支持小刀，
        <span className="highlight">最好来wt自取, 越晚越便宜！</span>
      </p>

      {/* 价格过滤器游戏控制板 */}
      <div className="price-filter">
        <label htmlFor="priceRange">
          <span className="pixel-icon">⚙️</span> 价格上限：${priceFilter}
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

      {/* 排序选项 */}
      <div className="sort-filter">
        <label htmlFor="sortOrder">
          排序方式：
        </label>
        <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
          <option value="desc">价格从高到低</option>
          <option value="asc">价格从低到高</option>
        </select>
      </div>

      {/* 导航区块 */}
      <div className="navigation">
        <a href="#second-hand" className="nav-link">
          <span className="pixel-icon">🛒</span> 二手区
        </a>
        <a href="#negotiable" className="nav-link">
          <span className="pixel-icon">💎</span> 给钱就出
        </a>
        <a href="#donation" className="nav-link">
          <span className="pixel-icon">🎁</span> 赠送区
        </a>
      </div>

      {/* 二手区 */}
      <div id="second-hand" className="section">
        <h2 className="section-title">
          <span className="pixel-icon">🛒</span> 二手精选
        </h2>
        {secondHandProducts.length > 0 ? (
          <div className="product-container">
            {secondHandProducts.map((product) => (
              <div 
                key={product.id} 
                className="product-card"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="img-container">
                    <img
                      src={`${process.env.PUBLIC_URL}/${product.image}`}
                      alt={product.name}
                      className="product-image"
                    />
                    <div className="image-overlay">
                      <span className="click-me">CLICK</span>
                    </div>
                  </div>
                </Link>
                <h3 className="product-name">{product.name}</h3>
                <p className="short-description">
                  {product.shortDescription || "暂无描述，点进来或许有惊喜"}
                </p>
                <p className="price">
                  <span className="pixel-icon">💰</span> 价格：${product.price}
                </p>
                <Link to={`/product/${product.id}`} className="detail-link">
                  <span className="pixel-icon">🔍</span> 查看详情
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-products">
            <span className="pixel-icon">❌</span> 没有找到符合条件的商品，试试调高筛选价格！
          </p>
        )}
      </div>

      {/* 给钱就出区 */}
      <div id="negotiable" className="section">
        <h2 className="section-title">
          <span className="pixel-icon">💎</span> 给钱就出
        </h2>
        {negotiableProducts.length > 0 ? (
          <div className="product-container">
            {negotiableProducts.map((product) => (
              <div 
                key={product.id} 
                className="product-card negotiable"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="img-container">
                    <img
                      src={`${process.env.PUBLIC_URL}/${product.image}`}
                      alt={product.name}
                      className="product-image"
                    />
                    <div className="image-overlay">
                      <span className="click-me">OFFER</span>
                    </div>
                  </div>
                </Link>
                <h3 className="product-name">{product.name}</h3>
                <p className="short-description">
                  {product.shortDescription || "价格好商量，来聊聊吧！"}
                </p>
                <p className="price negotiable-price">
                  <span className="pixel-icon">💎</span> 给钱就出
                </p>
                <Link to={`/product/${product.id}`} className="detail-link">
                  <span className="pixel-icon">🔍</span> 查看详情
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-products">
            <span className="pixel-icon">❌</span> 目前暂无给钱就出的商品，先看看其他区吧！
          </p>
        )}
      </div>

      {/* 赠送区 */}
      <div id="donation" className="section">
        <h2 className="section-title">
          <span className="pixel-icon">🎁</span> 免费赠送
        </h2>
        {donationProducts.length > 0 ? (
          <div className="product-container">
            {donationProducts.map((product) => (
              <div 
                key={product.id} 
                className="product-card"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="img-container">
                    <img
                      src={`${process.env.PUBLIC_URL}/${product.image}`}
                      alt={product.name}
                      className="product-image"
                    />
                    <div className="image-overlay">
                      <span className="click-me">FREE</span>
                    </div>
                  </div>
                </Link>
                <h3 className="product-name">{product.name}</h3>
                <p className="short-description">
                  {product.shortDescription || "这商品免费，但品质依然在线"}
                </p>
                <p className="price">
                  <span className="pixel-icon">💰</span> 价格：$0
                </p>
                <Link to={`/product/${product.id}`} className="detail-link">
                  <span className="pixel-icon">🔍</span> 查看详情
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-products">
            <span className="pixel-icon">❌</span> 目前暂无赠送商品，先看看二手精选吧！
          </p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
