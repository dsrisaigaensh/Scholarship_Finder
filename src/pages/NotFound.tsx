import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <h1 className="text-4xl font-bold mb-4">404</h1>
    <p className="mb-4">Page not found.</p>
    <Link to="/" className="text-blue-600 underline">Go back home</Link>
  </div>
);

export default NotFound; 