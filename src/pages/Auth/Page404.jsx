import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <>
      <div className="flex items-center justify-center h-screen main-gradient">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-black lg:text-6xl">404</h1>

          <h6 className="mb-2 text-2xl font-bold text-center text-gray-700 md:text-3xl">
            Page not found!
          </h6>

          <p className="mb-4 text-center text-gray-500 md:text-lg">
            The page you’re looking for doesn’t exist.
          </p>

          <Link
            to="/"
            className="px-5 py-2 text-blue-100 rounded-md bg-blue-500 hover:bg-blue-600"
          >
            Go home
          </Link>
        </div>
      </div>
    </>
  );
}
