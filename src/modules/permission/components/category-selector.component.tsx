import rawCategories from "@/fake-data/categoriesTree.json";
import { Accordion, Form, Card, CardBody } from "react-bootstrap";
import styles from "./category-selector.module.scss";
import { useState } from "react";
import { BsChevronUp } from "react-icons/bs";

export interface ICategory {
   id: string;
   productId?: string;
   name: string;
   children?: ICategory[];
}

interface ICategorySelectorProps {
   readonly selectedProductId: string;
   readonly selectedCategories: string[];
   readonly onSelectCategory: (selectedCategories: string[]) => void;
}

interface IInfiniteNestedCategoryListProps {
   readonly categoryData: ICategory;
   readonly selectedCategories: string[];
   readonly isParent: boolean;
   readonly onCheck: (selectedCategoryData: string[]) => void;
}

export const InfiniteNestedCategoryList = (props: IInfiniteNestedCategoryListProps) => {
   const { selectedCategories, categoryData, onCheck, isParent } = props;
   return (
      <Accordion activeKey={selectedCategories}>
         <Card className={styles.categorySelectorCard}>
            <Card.Header>
               <div className="d-flex align-items-center justify-content-between">
                  <Form.Check
                     reverse
                     type="checkbox"
                     checked={selectedCategories.includes(categoryData.id)}
                     label={categoryData.name}
                     disabled={!isParent}
                     onChange={(e) => {
                        const getCategoryAndChildrenId = (category: ICategory): string[] => {
                           const nestedChildrenId: string[] = [category.id];

                           if (category?.children && category.children?.length > 0) {
                              category.children.forEach((child) => {
                                 nestedChildrenId.push(...getCategoryAndChildrenId(child));
                              });
                           }

                           return nestedChildrenId;
                        };

                        const recursiveChild = getCategoryAndChildrenId(categoryData);
                        if (e.target.checked) {
                           onCheck([...selectedCategories, ...recursiveChild]);
                        } else {
                           const pickedCategoryChildIds = new Set(recursiveChild);
                           const final = selectedCategories.filter((category) => !pickedCategoryChildIds.has(category));
                           onCheck([...final]);
                        }
                     }}
                  />
                  <BsChevronUp
                     style={{
                        transform: `rotate(${selectedCategories.includes(categoryData.id) ? "180deg" : "0deg"})`,
                        transition: "all .2s ease-in-out",
                        display: categoryData.children?.length ? "inline-block" : "none",
                     }}
                  />
               </div>
            </Card.Header>
            {categoryData.children && Boolean(categoryData.children?.length) && (
               <Accordion.Collapse eventKey={categoryData.id}>
                  <div>
                     {categoryData.children?.map((category) => (
                        <InfiniteNestedCategoryList
                           key={category.id}
                           isParent={false}
                           categoryData={category}
                           selectedCategories={selectedCategories}
                           onCheck={(categories) => {
                              onCheck(categories);
                           }}
                        />
                     ))}
                  </div>
               </Accordion.Collapse>
            )}
         </Card>
      </Accordion>
   );
};

export const CategorySelector = (props: ICategorySelectorProps) => {
   const { selectedCategories, selectedProductId, onSelectCategory } = props;
   const [searchedTitle, setSearchedTitle] = useState("");

   const availableProductCategories = rawCategories.filter(
      (category) => category.productId === selectedProductId && category.name.includes(searchedTitle)
   );

   console.log(setSearchedTitle);

   return (
      <Card className={styles.categorySelectorCard}>
         <CardBody className={styles.categorySelectorCardBody}>
            {availableProductCategories.map((availableCategory) => (
               <InfiniteNestedCategoryList
                  key={availableCategory.id}
                  isParent
                  selectedCategories={selectedCategories}
                  categoryData={availableCategory}
                  onCheck={(categories) => {
                     onSelectCategory(categories);
                  }}
               />
            ))}
         </CardBody>
      </Card>
   );
};
