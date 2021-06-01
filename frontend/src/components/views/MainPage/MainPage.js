/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { withRouter, Link } from 'react-router-dom';
import Main from './Main.css';
import GNB from '../GNB/GNB';
import TopMenu from '../TopMenu/TopMenu';
import Toolbar from '../Toolbar/Toolbar';
import Footer from '../Footer/Footer';
import MainSlider from './Slider';

function MainPage() {
  const contentStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    weight: '100vh',
  };

  const imgSrc = '../../../utils/images/example/';

  return (
    <>
      <div className="container" style={contentStyle}>
        <GNB />
        <MainSlider />
        <div className="topItems_Tops">
          <h2>TOP 4 items by Tops</h2>
          <p>Best 4 items by Categories!</p>
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
          <p>Best 4 items by Categories!</p>
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
          <p>Best 4 items by Categories!</p>
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
          <p>Best 4 items by Categories!</p>
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

export default withRouter(MainPage);
