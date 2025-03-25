import Pagination from './Pagination';
import './App.css';


function App() {
  // Sample data with more properties to showcase the box layout
  const sampleData = Array.from({ length: 50 }, (_, i) => ({
    id: `ID-${1000 + i}`,
    name: `Product ${i + 1}`,
    category: ['Electronics', 'Clothing', 'Home', 'Books'][i % 4],
    price: `$${(Math.random() * 100).toFixed(2)}`,
    rating: `${Math.floor(Math.random() * 5) + 1}/5`,
    inStock: i % 5 !== 0
  }));

  return (
    <div className="App">
      <Pagination 
        data={sampleData} 
        itemsPerPage={8}
        showPageSizeOptions={true}
        showPageJump={true}
      />
    </div>
  );
}

export default App;