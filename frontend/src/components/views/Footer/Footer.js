import React from 'react';
import FooterStyle from '../../../css/FooterStyle.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="service_Name">AI WONDERLAND</div>
        <div className="item_content">
          <ul>
            <li>
              <label>Project Name</label>
              <span>AI Wonderland</span>
            </li>
            <li>
              <label>Team Name</label>
              <span>Soondoong_Six</span>
            </li>
            <li>
              <label>Contact</label>
              <span>
                Nayun Kim: lily.nayun.kim@gmail.com
                <br />
                Jungin Kim: jungin3486@gmail.com
                <br />
                Jaewook Bae: bae.jae.w@gmail.com
                <br />
                Hyejin Yang: dbdrmek00@gmail.com
                <br />
                Sodam Shin: damsoshin@gmail.com
                <br />
                Seulkee Lee: ms.sseul@gmail.com
              </span>
            </li>
          </ul>
        </div>
        <div class="copyright">
          Copyright © Soondoong_Six. <br />
          All rights reserved.
        </div>
        <div class="notion_address">
          <a
            href={
              'https://www.notion.so/Project-WIKI-205d359cc22a429783f20b73026bb7da'
            }
            target="_blank"
          >
            Our Notion
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
