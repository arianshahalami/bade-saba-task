import categories from "@/fake-data/categoriesTree.json";
import { Card, CardBody } from "react-bootstrap";
import styles from "./category-selector.module.scss";

interface ICategory {
   id: string;
   productId: string;
   name: string;
   children: ICategory[];
}

interface ICategorySelectorProps {
   readonly selectedProductId: string;
   readonly selectedCategories: ICategory[];
   readonly onSelectCategory: (selectedCategoryData: ICategory) => void;
}

console.log(categories);

export const CategorySelector = (props: ICategorySelectorProps) => {
   const { selectedCategories, selectedProductId, onSelectCategory } = props;

   const selectedProductCategories = categories.filter((category) => category.productId === selectedProductId);
   console.log(selectedCategories, onSelectCategory);
   return (
      <Card className={styles.categorySelectorCard}>
         <CardBody className={styles.categorySelectorCardBody}>
            {selectedProductCategories.map((selectedProductCategory) => (
               <p key={selectedProductCategory.id}>{selectedProductCategory.name}</p>
            ))}
         </CardBody>
      </Card>
   );
};
