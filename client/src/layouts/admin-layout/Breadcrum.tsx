import { Link } from 'react-router-dom';

const Breadcrum = () => {
  return (
    <nav>
      <ol className="flex flex-wrap font-medium pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
        <li className="text-sm leading-normal">
          <Link className="text-white opacity-50" to="#">
            Pages
          </Link>
        </li>
        <li
          className="text-sm pl-2 capitalize leading-normal text-white before:float-left before:pr-2 before:text-white before:content-['/']"
          aria-current="page"
        >
          Dashboard
        </li>
      </ol>
      <h6 className="mb-0 font-bold text-white capitalize">Dashboard</h6>
    </nav>
  );
};

export default Breadcrum;
