import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetProductsQuery } from '../../redux/productApi';
import PageSpinner from '../Misc/PageSpinner';
import Time from 'react-time-format';
import { Link } from 'react-router-dom';
import EditProductModal from '../Modals/EditProductModal';
import ProductStatusSelect from '../Select/ProductStatusSelect';
import { FlexColumn } from '../UI';

const AllProducts = () => {
  const { data: products, isLoading, isSuccess, isError, error } = useGetProductsQuery();

  let content;

  if (isLoading) {
    content = (
      <TableRow className={`flex items-center justify-center w-[90vw]`}>
        <TableCell className="flex items-center justify-center">
          <PageSpinner />
        </TableCell>
      </TableRow>
    );
  } else if (isSuccess) {
    content = products?.map((item) => (
      <TableRow
        key={item.product_id}
        className={`${item.status === 'Inactive' ? 'bg-red-100 dark:bg-red-950 hover:bg-red-200' : null}`}
      >
        <TableCell className="font-medium hidden md:table-cell">
          <img className="w-20" src={item.image} alt={item.product} />
        </TableCell>
        <TableCell>{item.product}</TableCell>
        <TableCell className="hidden md:table-cell">{item.category}</TableCell>
        {/* <TableCell>{item.status}</TableCell> */}
        <TableCell>
          <ProductStatusSelect item={item} />
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {Number(item.price).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </TableCell>
        <TableCell className="">
          {/* <Link className=" text-sqlBlueLight" to={`/product/${item.product_id}`}>
            View
          </Link> */}
          <EditProductModal id={item.product_id} />
        </TableCell>
      </TableRow>
    ));
  }

  return (
    <div>
      {isError ? (
        <FlexColumn>
          <p className="mt-6">Error fetching products: {error?.data?.message}</p>
        </FlexColumn>
      ) : (
        <>
          <p className="italic text-red-500 text-sm">
            Inactive products will not be shown in search or category pages.
          </p>
          <Table>
            <TableCaption>A list of all products.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden md:table-cell">Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Amount</TableHead>
                <TableHead className="">Edit</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>{content}</TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default AllProducts;
