import { useContext } from "react";

import { type ICategory } from "../category-selector/category-selector.type.ts";
import { type ICategoryAccessListItemProps, type ICategoryAccessListProps } from "./category-access-list.type.ts";

import { Accordion, AccordionContext, Card, CardHeader, Form, useAccordionButton } from "react-bootstrap";
import { BsChevronUp } from "react-icons/bs";

import { accessLevels } from "@/constants/category-access-levels.constant.ts";
import rawCategories from "@/fake-data/categoriesTree.json";
import rawActions from "@/fake-data/actions.json";

export const CategoryAccessListItem = (props: ICategoryAccessListItemProps) => {
   const { activeEventKey } = useContext(AccordionContext);
   const { categoryData, categoryAccess, onAccessChange, eventKey } = props;

   const decoratedOnClick = useAccordionButton(eventKey, () => {
      console.log("totally custom!");
   });

   const currentAccessActions = rawActions.filter(
      (action) => action.category === categoryData.id && accessLevels[categoryAccess ?? "read"].includes(action.level)
   );
   const isCurrentEventKey = activeEventKey === eventKey;

   return (
      <Card className="shadow-none border-0 mb-200">
         <CardHeader className="bg-transparent border-0 p-0 d-flex flex-row align-items-center mb-150">
            <button
               type="button"
               className="p-25 bg-transparent border-0 text-body d-flex flex-row align-items-center"
               onClick={decoratedOnClick}
            >
               <h2 className="h6 my-0 ms-100">{categoryData.name}</h2>
               <BsChevronUp
                  style={{
                     transform: `rotate(${isCurrentEventKey ? "0deg" : "180deg"})`,
                     transition: "all .2s ease-in-out",
                  }}
               />
            </button>
            <hr className="border  border-secondary flex-grow-1 mx-100 opacity-75" />
            <div>
               <Form.Check
                  inline
                  label=" انتشار"
                  name={`${categoryData.id}-create`}
                  type="radio"
                  className="fs-7"
                  checked={categoryAccess === "create"}
                  onClick={() => {
                     onAccessChange("create", categoryData.id);
                  }}
               />
               <Form.Check
                  inline
                  label=" ویرایش"
                  name={`${categoryData.id}-edit`}
                  type="radio"
                  className="fs-7"
                  checked={categoryAccess === "edit"}
                  onClick={() => {
                     onAccessChange("edit", categoryData.id);
                  }}
               />
               <Form.Check
                  inline
                  label=" مشاهده"
                  name={`${categoryData.id}-read`}
                  type="radio"
                  className="fs-7"
                  checked={categoryAccess === "read"}
                  onClick={() => {
                     onAccessChange("read", categoryData.id);
                  }}
               />
            </div>
         </CardHeader>
         <Accordion.Collapse eventKey={eventKey}>
            {currentAccessActions.length ? (
               <ul>
                  {currentAccessActions.map((action) => (
                     <li key={action._id} className="text-body-tertiary fs-6 mb-50">
                        {action.name}
                     </li>
                  ))}
               </ul>
            ) : (
               <p className="text-body-tertiary fs-7">موردی برای نمایش موجود نیست</p>
            )}
         </Accordion.Collapse>
      </Card>
   );
};

export const CategoryAccessList = (props: ICategoryAccessListProps) => {
   const { selectedCategories, categoriesAccess, onAccessChange } = props;

   const findCategoryById = (id: string, categories: ICategory[]): ICategory | undefined => {
      for (const category of categories) {
         if (category.id === id) {
            return category;
         }

         if (category.children && category.children.length > 0) {
            const result = findCategoryById(id, category.children);
            if (result) return result;
         }
      }

      return undefined;
   };

   return (
      <Accordion defaultActiveKey={selectedCategories[0]}>
         {selectedCategories.map((selectedCategory) => {
            const categoryData = findCategoryById(selectedCategory, rawCategories);

            return (
               categoryData && (
                  <CategoryAccessListItem
                     key={categoryData.id}
                     eventKey={categoryData.id}
                     categoryData={categoryData}
                     categoryAccess={categoriesAccess[categoryData.id] ?? "read"}
                     onAccessChange={onAccessChange}
                  />
               )
            );
         })}
      </Accordion>
   );
};
