import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(8);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );


      const data = await response.json();
      setItems(data);
    };

    fetchItems();
  }, []);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {items.slice(0, visibleItems).map((item) => (
        <div
          key={item.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 animated fadeInUp"
          style={{ display: "block", backgroundSize: "cover", animationDuration: "1.5s" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link to={`/author/${item.authorId}`}>
                <img
                  className="lazy"
                  src={item.authorImage || AuthorImage}
                  alt=""
                />
                <i className="fa fa-check"></i>
              </Link>
            </div>

            <div className="nft__item_wrap">
              <Link to={`/item-details/${item.nftId}`}>
                <img
                  src={item.nftImage || nftImage}
                  className="lazy nft__item_preview"
                  alt={item.title}
                />
              </Link>
            </div>

            <div className="nft__item_info">
              <Link to={`/item-details/${item.nftId}`}>
                <h4>{item.title}</h4>
              </Link>

              <div className="nft__item_price">{item.price} ETH</div>

              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {visibleItems < items.length && (
        <div className="col-md-12 text-center">
          <button
            id="loadmore"
            className="btn-main lead"
            onClick={() => setVisibleItems(visibleItems + 4)}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;