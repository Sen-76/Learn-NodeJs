import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBluesky } from '@fortawesome/free-brands-svg-icons';
import { faHandLizard } from '@fortawesome/free-solid-svg-icons';

const LeftNav = () => {
  const leftItem = ['Dashboard', 'Table', 'Billing', 'Virtual Reality', 'RTL'];
  return (
    <aside
      className="fixed inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto 
    antialiased transition-transform duration-200 -translate-x-full bg-white border-0 shadow-xl max-w-64 z-40 
    xl:ml-6 rounded-2xl xl:left-0 xl:translate-x-0"
    >
      <Link to="#" className="flex gap-2 px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700">
        <FontAwesomeIcon className="relative top-0 leading-normal text-blue-500 text-xl" icon={faHandLizard} />

        <span className="ml-1 font-semibold transition-all duration-200">Admin Dashboard</span>
      </Link>

      <hr />

      <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
        <ul className="flex flex-col pl-0 mb-0">
          {leftItem.map((x) => (
            <li className="mt-0.5 w-full" key={x}>
              <Link
                to="#"
                className="py-2.5 text-sm my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors"
              >
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                  <FontAwesomeIcon className="relative top-0 leading-normal text-blue-500 text-xl" icon={faBluesky} />
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">{x}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default LeftNav;
