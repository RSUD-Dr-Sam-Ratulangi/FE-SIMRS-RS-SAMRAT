import React from "react";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <div>
      <div className="drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <p>Rawat Jalan</p>
            </li>
            <li>
              <p>Rawat Inap</p>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <p>Hello World</p>
      </div>
    </div>
  );
};

export default App;
