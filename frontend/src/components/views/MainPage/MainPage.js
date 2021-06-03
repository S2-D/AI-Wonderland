/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../../url/http';

import Main from './Main.css';
import GNB from '../GNB/GNB';
import Toolbar from '../Toolbar/Toolbar';
import Footer from '../Footer/Footer';
import MainSlider from './Slider';

export default function MainPage() {
  const [categoryCode, setCategoryCode] = useState(1);
  const categories = [
    { id: 1, name: 'Tops', Code: 1 },
    { id: 2, name: 'Bottoms', Code: 2 },
    { id: 3, name: 'Shoes', Code: 3 },
    { id: 4, name: 'Others', Code: 4 },
  ];

  const productsUrl = `${baseUrl}/products/productlist/?pcategory_code=${categoryCode}`;

  const response = axios.get(productsUrl);

  useEffect(() => {
    async function getProductData() {
      try {
        const response = await axios.get(productsUrl);
        console.log(response.status);
        console.log(response.data.results);
        if (response.status === 200) {
          setProducts(response.data.results);
        } else if (response.status === 404) {
          console.log('404 진입' + response);
          alert('Fail to load the product data');
        }
      } catch (error) {
        console.log(error);
        const response = await axios.get(productsUrl);
        console.log(response.status);
      }
    }
    getProductData();
  }, [productsUrl]);

  const contentStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    weight: '100vh',
  };

  return (
    <>
      <div className="container" style={contentStyle}>
        <GNB />
        <MainSlider />
        <div className="topItems_Tops">
          <h2>TOP 4 items by Tops</h2>
          <p className="subAd">Explor the best items of the Tops.</p>
          <ul className="item_box">
            <li className="item">
              <Link to="/" className="curation_item">
                <div className="category_img">
                  <div className="main_box_img">
                    <div className="label_box"></div>
                    <img src="./images/example/one.png" />
                  </div>
                  <div className="img_prdName">White T-shirts</div>
                  <div className="img_price">$27</div>
                </div>
              </Link>
            </li>
            <li className="item">
              <Link to="/" className="curation_item">
                <div className="category_img">
                  <div className="main_box_img">
                    <div className="label_box"></div>
                    <img src="./images/example/two.png" />
                  </div>
                  <div className="img_prdName">White T-shirts</div>
                  <div className="img_price">$27</div>
                </div>
              </Link>
            </li>
            <li className="item">
              <Link to="/" className="curation_item">
                <div className="category_img">
                  <div className="main_box_img">
                    <div className="label_box"></div>
                    <img src="./images/example/three.png" />
                  </div>
                  <div className="img_prdName">White T-shirts</div>
                  <div className="img_price">$27</div>
                </div>
              </Link>
            </li>
            <li className="item">
              <Link to="/" className="curation_item">
                <div className="category_img">
                  <div className="main_box_img">
                    <div className="label_box"></div>
                    <img src="./images/example/one.png" />
                  </div>
                  <div className="img_prdName">White T-shirts</div>
                  <div className="img_price">$27</div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="topItems_Bottoms">
          <h2>TOP 4 items by Bottoms</h2>
          <p className="subAd">
            Are you curious about the trend of pants back then?
          </p>
          <ul className="item_box">
            <li className="item">
              <Link to="/" className="curation_item">
                <div className="category_img">
                  <div className="main_box_img">
                    <div className="label_box"></div>
                    <img src="./images/example/one.png" />
                  </div>
                  <div className="img_prdName">White T-shirts</div>
                  <div className="img_price">$27</div>
                </div>
              </Link>
            </li>
            <li className="item">
              <Link to="/" className="curation_item">
                <div className="category_img">
                  <div className="main_box_img">
                    <div className="label_box"></div>
                    <img src="./images/example/two.png" />
                  </div>
                  <div className="img_prdName">White T-shirts</div>
                  <div className="img_price">$27</div>
                </div>
              </Link>
            </li>
            <li className="item">
              <Link to="/" className="curation_item">
                <div className="category_img">
                  <div className="main_box_img">
                    <div className="label_box"></div>
                    <img src="./images/example/three.png" />
                  </div>
                  <div className="img_prdName">White T-shirts</div>
                  <div className="img_price">$27</div>
                </div>
              </Link>
            </li>
            <li className="item">
              <Link to="/" className="curation_item">
                <div className="category_img">
                  <div className="main_box_img">
                    <div className="label_box"></div>
                    <img src="./images/example/one.png" />
                  </div>
                  <div className="img_prdName">White T-shirts</div>
                  <div className="img_price">$27</div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="topItems_Shoes">
          <h2>TOP 4 items by Shoes</h2>
          <p className="subAd">Classic style always works!</p>
          <ul className="item_box">
            <li className="item">
              <Link to="/" className="curation_item">
                <div className="category_img">
                  <div className="main_box_img">
                    <div className="label_box"></div>
                    <img src="./images/example/one.png" />
                  </div>
                  <div className="img_prdName">White T-shirts</div>
                  <div className="img_price">$27</div>
                </div>
              </Link>
            </li>
            <li className="item">
              <Link to="/" className="curation_item">
                <div className="category_img">
                  <div className="main_box_img">
                    <div className="label_box"></div>
                    <img src="./images/example/two.png" />
                  </div>
                  <div className="img_prdName">White T-shirts</div>
                  <div className="img_price">$27</div>
                </div>
              </Link>
            </li>
            <li className="item">
              <Link to="/" className="curation_item">
                <div className="category_img">
                  <div className="main_box_img">
                    <div className="label_box"></div>
                    <img src="./images/example/three.png" />
                  </div>
                  <div className="img_prdName">White T-shirts</div>
                  <div className="img_price">$27</div>
                </div>
              </Link>
            </li>
            <li className="item">
              <Link to="/" className="curation_item">
                <div className="category_img">
                  <div className="main_box_img">
                    <div className="label_box"></div>
                    <img src="./images/example/one.png" />
                  </div>
                  <div className="img_prdName">White T-shirts</div>
                  <div className="img_price">$27</div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="topItems_Others">
          <h2>TOP 4 items by Others</h2>
          <p className="subAd">
            Don't forget to add accessories to your scrapbook!
          </p>
          <ul className="item_box">
            <li className="item">
              <Link to="/" className="curation_item">
                <div className="category_img">
                  <div className="main_box_img">
                    <div className="label_box"></div>
                    <img src="./images/example/one.png" />
                  </div>
                  <div className="img_prdName">White T-shirts</div>
                  <div className="img_price">$27</div>
                </div>
              </Link>
            </li>
            <li className="item">
              <Link to="/" className="curation_item">
                <div className="category_img">
                  <div className="main_box_img">
                    <div className="label_box"></div>
                    <img src="./images/example/two.png" />
                  </div>
                  <div className="img_prdName">White T-shirts</div>
                  <div className="img_price">$27</div>
                </div>
              </Link>
            </li>
            <li className="item">
              <Link to="/" className="curation_item">
                <div className="category_img">
                  <div className="main_box_img">
                    <div className="label_box"></div>
                    <img src="./images/example/three.png" />
                  </div>
                  <div className="img_prdName">White T-shirts</div>
                  <div className="img_price">$27</div>
                </div>
              </Link>
            </li>
            <li className="item">
              <Link to="/" className="curation_item">
                <div className="category_img">
                  <div className="main_box_img">
                    <div className="label_box"></div>
                    <img src="./images/example/one.png" />
                  </div>
                  <div className="img_prdName">White T-shirts</div>
                  <div className="img_price">$27</div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <Footer />
        <Toolbar />
      </div>
    </>
  );
}
