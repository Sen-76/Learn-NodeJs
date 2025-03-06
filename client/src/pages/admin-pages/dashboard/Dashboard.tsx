import Barchart from './Barchart';
import LineChart from './Linechart';

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-wrap -mx-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase">Today's Money</p>
                      <h5 className="mb-2 font-bold">$53,000</h5>
                      <div className="flex gap-1">
                        <p className="text-sm font-bold leading-normal text-emerald-500">+55%</p>
                        <p className="text-sm leading-normal">since yesterday</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl from-blue-500 to-violet-500">
                      <i className="ni leading-none ni-money-coins text-lg relative top-3.5 text-white"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap mt-6 -mx-3">
        <div className="w-full max-w-full px-3 mt-0 lg:w-7/12 lg:flex-none">
          <div className="border-black/12.5 dark:bg-slate-850 dark:shadow-dark-xl shadow-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
            <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid p-6 pt-4 pb-0">
              <h6 className="capitalize dark:text-white">Sales overview</h6>
              <p className="mb-0 text-sm leading-normal dark:text-white dark:opacity-60">
                <i className="fa fa-arrow-up text-emerald-500"></i>
                <span className="font-semibold">4% more</span> in 2021
              </p>
            </div>
            <div className="flex-auto p-4">
              <div>
                <Barchart />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap mt-6 -mx-3">
        <div className="w-full max-w-full px-3 mt-0 lg:w-7/12 lg:flex-none">
          <div className="border-black/12.5 dark:bg-slate-850 dark:shadow-dark-xl shadow-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
            <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid p-6 pt-4 pb-0">
              <h6 className="capitalize dark:text-white">Sales overview</h6>
              <p className="mb-0 text-sm leading-normal dark:text-white dark:opacity-60">
                <i className="fa fa-arrow-up text-emerald-500"></i>
                <span className="font-semibold">4% more</span> in 2021
              </p>
            </div>
            <div className="flex-auto p-4">
              <div>
                <LineChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
