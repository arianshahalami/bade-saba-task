import { useState } from "react";
import { Button, Col, Row, Stack, Form, Container } from "react-bootstrap";
import { BsChevronRight } from "react-icons/bs";
import { type INavMenuItem, NavMenu } from "@/components/nav-menu/nav-menu.component.tsx";
import products from "@/fake-data/products.json";
import { CategorySelector } from "@/modules/permission/components/category-selector/category-selector.component.tsx";
import { CategoryAccessList } from "@/modules/permission/components/category-access-list/category-access-list.component.tsx";
import rawActions from "@/fake-data/actions.json";
import { accessLevels } from "@/constants/category-access-levels.constant.ts";

export type IAccessTypes = "read" | "edit" | "create";

const mappedProducts = products.map((product) => ({ name: product.name, id: product._id }));

export const AddPermissionView = () => {
   const [activeProduct, setActiveProduct] = useState(mappedProducts[0]);
   const [newRoleData, setNewRoleData] = useState({
      name: "",
      description: "",
      active: false,
   });
   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
   const [categoriesAccess, setCategoriesAccess] = useState<Record<string, IAccessTypes>>({});

   const onNavMenuItem = (item: INavMenuItem) => {
      setActiveProduct(item);
   };

   const onNewRoleTitleChange = (newRoleTitle: string) => {
      setNewRoleData((prev) => ({ ...prev, name: newRoleTitle }));
   };

   const onNewRoleDescChange = (newRoleDesc: string) => {
      setNewRoleData((prev) => ({ ...prev, description: newRoleDesc }));
   };

   const onNewRoleChange = (newRoleStatus: boolean) => {
      setNewRoleData((prev) => ({ ...prev, active: newRoleStatus }));
   };

   const onSelectCategory = (newCategories: string[], newCategoriesAccess: Record<string, IAccessTypes>) => {
      setSelectedCategories(newCategories);
      setCategoriesAccess(newCategoriesAccess);
   };

   const onCategoryAccessChange = (newAccessLvl: IAccessTypes, categoryId: string) => {
      setCategoriesAccess((prev) => ({ ...prev, [categoryId]: newAccessLvl }));
   };

   const onSubmitCategoryActions = async () => {
      const finalData = {
         ...newRoleData,
         actionIds: rawActions.filter(
            (rawAction) =>
               selectedCategories.includes(rawAction.category) &&
               accessLevels[categoriesAccess[rawAction.category]].includes(rawAction.level)
         ),
      };
      await fetch("https://fakestoreapi.com/products", {
         method: "POST",
         body: JSON.stringify(finalData),
      }).then(async (res) => res.json());
   };

   console.log("categoriesAccess", categoriesAccess);
   console.log("selectedCategories", selectedCategories);

   return (
      <>
         <div className="py-150 bg-primary mb-150" />
         <Container>
            <Stack gap={100}>
               <Row>
                  <Col xs={2}>
                     <Stack direction="horizontal" gap={100} className="align-items-center">
                        <Button
                           variant="outline-primary"
                           className="p-0 "
                           style={{ width: "30px", height: "30px", borderColor: "#888" }}
                        >
                           <BsChevronRight size={14} />
                        </Button>
                        <div className="fs-8">
                           <span className="text-body-tertiary">لیست نقش‌‌ها</span>
                           <span className="mx-50">/</span>
                           <span className="text-primary">افزودن نقش</span>
                        </div>
                     </Stack>
                  </Col>
                  <Col xs={3}>
                     <Form.Control
                        type="text"
                        placeholder="نام رول جدید"
                        onChange={({ target }) => {
                           onNewRoleTitleChange(target.value);
                        }}
                     />
                  </Col>

                  <Col xs={6}>
                     <div className="d-flex flex-row justify-content-between align-items-center">
                        <Form.Control
                           className="mb-100"
                           type="text"
                           placeholder="توضیحات رول جدید"
                           style={{ maxWidth: "300px" }}
                           onChange={({ target }) => {
                              onNewRoleDescChange(target.value);
                           }}
                        />
                        <Form.Check
                           reverse
                           type="switch"
                           checked={newRoleData.active}
                           label="غیرفعال"
                           onChange={(e) => {
                              onNewRoleChange(e.target.checked);
                           }}
                        />
                     </div>
                  </Col>
               </Row>
               <Row>
                  <Col xs={2}>
                     <NavMenu
                        items={mappedProducts}
                        activeItem={activeProduct}
                        onItemClick={(itemData) => {
                           onNavMenuItem(itemData);
                        }}
                     />
                  </Col>
                  <Col xs={3}>
                     <CategorySelector
                        selectedProductId={activeProduct.id}
                        selectedCategories={selectedCategories}
                        categoriesAccess={categoriesAccess}
                        onSelectCategory={onSelectCategory}
                     />
                  </Col>
                  <Col xs={6}>
                     <div style={{ height: "550px", overflowY: "auto" }} className="mb-150">
                        <CategoryAccessList
                           categoriesAccess={categoriesAccess}
                           selectedCategories={selectedCategories}
                           onAccessChange={(accessLvl, categoryId) => {
                              onCategoryAccessChange(accessLvl, categoryId);
                           }}
                        />
                     </div>

                     <div className="d-flex justify-content-end">
                        <Stack gap={100} direction="horizontal">
                           <Button variant="outline-primary">بازشگت</Button>
                           <Button className="px-150" onClick={onSubmitCategoryActions}>
                              ثبت
                           </Button>
                        </Stack>
                     </div>
                  </Col>
               </Row>
            </Stack>
         </Container>
      </>
   );
};
