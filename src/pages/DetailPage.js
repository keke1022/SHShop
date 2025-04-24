import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import products from "../data/products.json";
import "./DetailPage.css";

function DetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [selectedImg, setSelectedImg] = useState(0);
  const [showAchievement, setShowAchievement] = useState(false);

  // Show achievement notification
  useEffect(() => {
    // Show achievement notification after 2 seconds
    setTimeout(() => {
      setShowAchievement(true);
      // Hide it after 4 seconds
      setTimeout(() => setShowAchievement(false), 4000);
    }, 2000);
  }, []);

  const handleImageClick = (index) => {
    setSelectedImg(index);
  };

  if (!product) {
    return (
      <div className="game-error-screen">
        <h2 className="error-title">⚠️ GAME OVER ⚠️</h2>
        <p className="error-message">物品不存在或已被其他玩家获取！</p>
        <div className="pixel-character">
          😢
        </div>
        <Link to="/" className="return-button">
          ⬅ 返回主城
        </Link>
      </div>
    );
  }

  // 使用product对象中的quality属性，如果不存在则默认为3
  const quality = product.quality || 3;

  return (
    <div className="game-detail-container">
      {/* Achievements popup */}
      {showAchievement && (
        <div className="achievement-popup">
          <div className="achievement-icon">🏆</div>
          <div className="achievement-text">
            <div className="achievement-title">成就解锁!</div>
            <div className="achievement-desc">你发现了新物品: {product.name}</div>
          </div>
        </div>
      )}

      <div className="game-nav-bar">
        <Link to="/" className="back-button">
          ⬅ 返回
        </Link>
      </div>

      <div className="item-spotlight">
        <h1 className="item-title">{product.name}</h1>
        
        <div className="item-rating">
          <p className="item-price">
            产品质量
          </p>
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < quality ? "star filled" : "star"}>★</span>
          ))}
          <span className="item-rarity">
            {product.price > 30 ? 'RARE' : 'COMMON'}
          </span>
        </div>

        <p className="item-price">
          <span className="price-icon">💰</span> {product.price} 金币
        </p>
      </div>

      <div className="item-container">
        <div className="item-gallery">
          <div className="main-image-container">
            <img 
              src={`${process.env.PUBLIC_URL}/${product.gallery[selectedImg]}`}
              alt={product.name}
              className="main-item-image"
            />
          </div>
          
          {product.gallery.length > 1 && (
            <div className="thumbnail-container">
              {product.gallery.map((img, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${selectedImg === index ? 'active' : ''}`}
                  onClick={() => handleImageClick(index)}
                >
                  <img 
                    src={`${process.env.PUBLIC_URL}/${img}`}
                    alt={`Thumbnail ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="item-details">
          <div className="details-panel">
            <h3 className="panel-title">
              <span className="panel-icon">📦</span> 物品详情
            </h3>
            <p className="item-description">{product.longDescription}</p>
          </div>

          <div className="item-stats">
            <div className="stat">
              <span className="stat-label">品质:</span>
              <div className="stat-value">
                <div className="stat-bar">
                  <div 
                    className="stat-fill"
                    style={{ width: `${quality * 20}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="stat">
              <span className="stat-label">稀有度:</span>
              <div className="stat-value">
                <div className="stat-bar">
                  <div 
                    className="stat-fill"
                    style={{ width: `${Math.min(product.price / 2, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-info">
            与商人联系: <strong>j1600882808</strong> (微信)
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;