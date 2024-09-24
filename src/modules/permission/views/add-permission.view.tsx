import { Button, Col, Row, Stack, Form, Container } from "react-bootstrap";
import { BsChevronRight } from "react-icons/bs";
import { type INavMenuItem, NavMenu } from "@/components/nav-menu/nav-menu.component.tsx";
import products from "@/fake-data/products.json";
import { useState } from "react";
// import { CategorySelector } from "@/modules/permission/components/category-selector.component.tsx";

const mappedProducts = products.map((product) => ({ name: product.name, id: product._id }));
export const AddPermissionView = () => {
   const [activeProduct, setActiveProduct] = useState(mappedProducts[0]);
   const [newRoleData, setNewRoleData] = useState({
      name: "",
      description: "",
      active: true,
      actionIds: [],
   });

   const onNavMenuItem = (item: INavMenuItem) => {
      setActiveProduct(item);
   };

   const onNewRoleTitleChange = (newRoleTitle: string) => {
      setNewRoleData((prev) => ({ ...prev, name: newRoleTitle }));
   };

   console.log(newRoleData);

   return (
      <>
         <div className="py-150 bg-primary mb-150" />
         <Container>
            <Row>
               <Col xs={2}>
                  <Stack gap={100}>
                     <Stack direction="horizontal" gap={100} className="align-items-center">
                        <Button
                           variant="outline-primary"
                           className="p-0 "
                           style={{ width: "30px", height: "30px", borderColor: "#888" }}
                        >
                           <BsChevronRight size={14} />
                        </Button>
                        bread / bread
                     </Stack>
                     <NavMenu
                        items={mappedProducts}
                        activeItem={activeProduct}
                        onItemClick={(itemData) => {
                           onNavMenuItem(itemData);
                        }}
                     />
                  </Stack>
               </Col>
               <Col xs={3}>
                  <Form.Control
                     className="mb-100"
                     type="text"
                     placeholder="نام رول جدید"
                     onChange={({ target }) => {
                        onNewRoleTitleChange(target.value);
                     }}
                  />
                  {/* <CategorySelector selectedProductId={activeProduct.id} /> */}
               </Col>

               <Col xs={6}>2 of 3 (wider)</Col>
            </Row>
         </Container>
      </>
   );
};
