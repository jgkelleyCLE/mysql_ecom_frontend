import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FaListOl } from 'react-icons/fa';
import { CiShoppingTag } from 'react-icons/ci';
import { IoIosSearch } from 'react-icons/io';
import AllOrders from '../Orders/AllOrders';
import AllProducts from '../Products/AllProducts';
import AdminSearch from '../Search/AdminSearch';

const AdminTabs = () => {
  return (
    <div className="mx-4 md:mx-8">
      <Tabs defaultValue="orders" className="">
        <TabsList className="w-full bg-sqlBlue border-2 dark:text-gray-400 h-12">
          <TabsTrigger
            className="text-lg font-bold data-[state=active]:dark:bg-gray-900 dark:text-white data-[state=inactive]:text-white"
            value="orders"
          >
            <FaListOl /> Orders
          </TabsTrigger>
          <TabsTrigger
            className="text-lg font-bold data-[state=active]:dark:bg-gray-900 dark:text-white p-2 data-[state=inactive]:text-white"
            value="products"
          >
            <CiShoppingTag className="text-xl font-bold" /> Products
          </TabsTrigger>
          <TabsTrigger
            className="text-lg font-bold data-[state=active]:dark:bg-gray-900 dark:text-white data-[state=inactive]:text-white"
            value="search"
          >
            <IoIosSearch /> Search
          </TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <AllOrders />
        </TabsContent>
        <TabsContent value="products">
          <AllProducts />
        </TabsContent>
        <TabsContent value="search">
          <AdminSearch />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminTabs;
