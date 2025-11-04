import { CategoryGridContainer, PageContainer } from '../components/UI';
import CategoryCard from '../components/Category/CategoryCard';

const AllProducts = () => {
  return (
    <>
      <title>Products | SQL Rentals</title>
      <PageContainer>
        <CategoryGridContainer>
          <CategoryCard
            title="Tents"
            image="https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-f07b1.appspot.com/o/7B487F91B0923473A0EC997E5C904F1F.jpg?alt=media&token=3f343ef4-d389-46ea-9b63-6623589502d5"
          />

          <CategoryCard title="Tables" image="https://d2j6dbq0eux0bg.cloudfront.net/images/648178/1143315935.jpg" />

          <CategoryCard
            title="Chairs"
            image="https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-f07b1.appspot.com/o/IMG_0059.jpg?alt=media&token=91cb8946-1828-4f36-9775-dc5d49574d4a"
          />

          <CategoryCard
            title="Stage"
            image="https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-f07b1.appspot.com/o/IMG_1255.jpg?alt=media&token=cf2f5497-fc33-4d67-8cad-dacb9711cd90"
          />
        </CategoryGridContainer>
      </PageContainer>
    </>
  );
};

export default AllProducts;
