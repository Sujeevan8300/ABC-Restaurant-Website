import '../style/Home.css';
import NavigationBar from '../components/Navigation';
import Footer from '../components/Footer';


function HomePage() {
  
  return (
    <>
        <NavigationBar />
        <div className="container">
            <div className="home-container">
                <h1 className="heading" >Welcome to Home Page</h1>
            </div>
        </div>
        <Footer />
    </>
  );
}

export default HomePage;
