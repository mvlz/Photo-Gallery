import './App.css';
import Header from './components/header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='container'>
        <h1>Handbags</h1>
        <div className='page-describtion'>
          <span>The perfect handbags from totes, cross-body bags, satchels to clutches to complement your wardrobe (and beyond).</span>
        </div>

        <img src="https://pbs.twimg.com/profile_images/624719377825267712/fnipKe2e_400x400.jpg" className='cabi-logo' />
        <p>Collection by <strong>cabi Clothing</strong></p>
      </div>
      <div>
        <h2>Similar ideas popular now</h2>
        <div className='similar-offers'>
          <div className='offer'>
            <div className='img-container'>
              <img src='https://i.pinimg.com/474x/72/00/5e/72005e47db2a04b6bf29048d30d2abed.jpg'></img>
            </div>
            <p>Leather</p>
          </div>
          <div className='offer'>
            <div className='img-container'>
              <img src="https://i.pinimg.com/474x/64/ce/6d/64ce6d0616b26d1a66edeea224fc48bf.jpg"></img>
            </div>
            <p>Handbags</p>
          </div>
          <div className='offer'>
            <div className='img-container'>
              <img src='https://i.pinimg.com/474x/f1/65/5f/f1655f302b68f55405fdd7985cf50daf.jpg'></img>
            </div>
            <p>Bag Accessories</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
