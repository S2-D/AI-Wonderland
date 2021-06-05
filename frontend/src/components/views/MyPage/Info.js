import Reac, { useEffect } from 'react';
import Wallet from '../GNB/Wallet';
import baseUrl from '../../../url/http';

export default function Info() {
  const authUrl = `${baseUrl}/member/auth`;
  const mypageUrl = `${baseUrl}/member/${id}`;
  const [userInfo, setUserInfo] = useState(1);

  const response = axios.get(authUrl);

  const key = 'jwt ' + localStorage.getItem('access_token');
  const userData = [
    { id: 1, name: 'id' },
    { id: 2, name: 'email' },
    { id: 3, name: 'nickname' },
    { id: 4, name: 'money' },
  ];

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await axios.get(myUrl);
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

  return (
    <div
      className="grid grid-rows-1 grid-flow-col p-4 w-full justify-center font-mono"
      style={{
        backgroundColor: 'black',
      }}
    >
      <div
        className="userInfo"
        style={{
          backgroundColor: 'yellow',
        }}
      >
        <div className="col-span-1 w-40 h-40 p-4 mx-20">
          <img
            src="./images/icon_img/anonymous.png"
            style={{
              borderRadius: '50%',
              backgroundColor: 'pink',
            }}
          />
        </div>
        <div
          className="col-span-1 font"
          style={{
            textAlign: 'center',
          }}
        >
          <span>Nickname</span>
        </div>
        <div
          className="col-span-1"
          style={{
            textAlign: 'center',
          }}
        >
          <span>Email</span>
        </div>
        <div
          className="col-span-1"
          style={{
            textAlign: 'center',
          }}
        >
          <Wallet />
        </div>
      </div>
    </div>
  );
}
