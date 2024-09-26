import rawCategories from "@/fake-data/categoriesTree.json";
import { Accordion, Card, CardBody, Form, InputGroup } from "react-bootstrap";
import styles from "./category-selector.module.scss";
import { useState } from "react";
import { BsChevronUp, BsSearch } from "react-icons/bs";
import {
   type ICategory,
   type ICategorySelectorProps,
   type IInfiniteNestedCategoryListProps,
} from "./category-selector.type.ts";

export const InfiniteNestedCategoryList = (props: IInfiniteNestedCategoryListProps) => {
   const { selectedCategories, categoryData, onCheck, isParent, categoriesAccess } = props;
   return (
      <Accordion activeKey={selectedCategories}>
         <Card className={styles.categorySelectorCard}>
            <Card.Header className="bg-transparent">
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
                           const newCategories = [...selectedCategories, ...recursiveChild];
                           const newCategoriesAccess = newCategories.reduce((prev, next) => {
                              return { ...prev, [next]: categoriesAccess[next] ?? "read" };
                           }, {});
                           onCheck(newCategories, newCategoriesAccess);
                        } else {
                           const pickedCategoryChildIds = new Set(recursiveChild);
                           const final = selectedCategories.filter((category) => !pickedCategoryChildIds.has(category));
                           const newCategoriesAccess = final.reduce((prev, next) => {
                              return { ...prev, [next]: categoriesAccess[next] ?? "read" };
                           }, {});
                           onCheck([...final], newCategoriesAccess);
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
                           categoriesAccess={categoriesAccess}
                           onCheck={(categories, newCategoriesAccess) => {
                              onCheck(categories, newCategoriesAccess);
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
   const { selectedCategories, selectedProductId, onSelectCategory, categoriesAccess } = props;
   const [searchedTitle, setSearchedTitle] = useState("");

   const availableProductCategories = rawCategories.filter(
      (category) => category.productId === selectedProductId && category.name.includes(searchedTitle)
   );

   const onSearchChange = (searchedText: string) => {
      setSearchedTitle(searchedText);
   };

   return (
      <div className={styles.categorySelector}>
         <Card className={styles.categorySelectorCardMain}>
            <InputGroup className="mb-100 border-bottom">
               <InputGroup.Text className="border-0 p-0">
                  <BsSearch fontSize={18} color="var(--bs-secondary-color)" />
               </InputGroup.Text>

               <Form.Control
                  placeholder="جستجو..."
                  className="border-0 "
                  style={{ boxShadow: "none", backgroundColor: "#f9f9f9" }}
                  onChange={({ target }) => {
                     onSearchChange(target.value);
                  }}
               />
            </InputGroup>

            <CardBody className={styles.categorySelectorCardBody}>
               {availableProductCategories.length ? (
                  availableProductCategories.map((availableCategory) => (
                     <InfiniteNestedCategoryList
                        key={availableCategory.id}
                        isParent
                        selectedCategories={selectedCategories}
                        categoryData={availableCategory}
                        categoriesAccess={categoriesAccess}
                        onCheck={(categories, newCategoriesAccess) => {
                           onSelectCategory(categories, newCategoriesAccess);
                        }}
                     />
                  ))
               ) : (
                  <p className="text-center fs-7 text-body-tertiary">موردی موجود نمی‌باشد</p>
               )}
            </CardBody>
         </Card>
      </div>
   );
};
