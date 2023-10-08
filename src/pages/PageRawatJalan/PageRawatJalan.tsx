import { useEffect, useState } from "react";
import TableData, { DataItem } from "../../components/Table/Table";
import { api } from "../../services/api/config.api";
import BreadCrumb from "../../components/BreadCrumbs/BreadCrumbs";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  FunnelIcon,
} from "@heroicons/react/24/solid";

const PageRawatJalan = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/products");
        console.log(response.data.products);
        setData(response.data.products);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { name: "ID", selector: (row: DataItem) => row.id, sortable: true },
    { name: "Title", selector: (row: DataItem) => row.title, sortable: true },
    {
      name: "Description",
      selector: (row: DataItem) => row.description,
      sortable: true,
    },
    { name: "Price", selector: (row: DataItem) => row.price, sortable: true },
    {
      name: "Discount Percentage",
      selector: (row: DataItem) => row.discountPercentage,
      sortable: true,
    },
    { name: "Rating", selector: (row: DataItem) => row.rating, sortable: true },
    { name: "Stock", selector: (row: DataItem) => row.stock, sortable: true },
    { name: "Brand", selector: (row: DataItem) => row.brand, sortable: true },
    {
      name: "Category",
      selector: (row: DataItem) => row.category,
      sortable: true,
    },
  ];

  return (
    <div>
      <div className="pb-5">
        <BreadCrumb />
        <p className="text text-lg font-bold">Rawat Jalan</p>
      </div>
      <div className="flex items-center w-full pb-4">
        <div className="w-full">
          <span className="text-[10px] flex">
            <p className="font-bold">Cari</p>{" "}
            <p className="ml-1">berdasarkan No. RM, Nama, atau Nomor Rawat</p>
          </span>
          <div className="flex gap-2 ">
            <div className="relative w-full">
              <MagnifyingGlassIcon className="absolute right-4 bottom-4 h-[16.02px] w-[16.02px] bg-none text-[#55A46B]" />
              <input
                type="text"
                placeholder="Cari..."
                className="w-full input input-bordered"
              />
            </div>
            <div className="relative">
              <button className="flex btn w-72 text-white bg-[#55A46B]">
                <FunnelIcon className="font-bold text-white h-[17px] w-[17px]" />
                Filter
              </button>
              <ChevronDownIcon className="absolute bottom-4 right-5 font-bold text-white h-[17px] w-[17px]" />
            </div>
          </div>
        </div>
      </div>
      <TableData data={data} columns={columns} />
    </div>
  );
};

export default PageRawatJalan;
