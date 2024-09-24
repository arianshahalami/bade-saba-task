import { Button, Card, CardBody, Col, Form, Row, Toast, ToastContainer } from "react-bootstrap";
import { BsBoxArrowInLeft } from "react-icons/bs";
import styles from "./login.module.scss";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { SignJWT } from "jose";
import { useNavigate } from "react-router-dom";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY as string;

export const LoginView = () => {
   const navigate = useNavigate();

   const [loginData, setLoginData] = useState<{ username: string; password: string }>({
      username: "",
      password: "",
   });
   const [isToastOpen, setIsToastOpen] = useState(false);

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };

   const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(loginData);

      if (loginData.username === "arian" && loginData.password === "123") {
         const token = await new SignJWT({ ...loginData })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("24h")
            .sign(new TextEncoder().encode(SECRET_KEY));

         localStorage.setItem("token", token);
         navigate("/permissions");
      } else {
         setIsToastOpen(true);
      }
   };

   return (
      <>
         <div className={styles.loginBoxHolder}>
            <Card className={styles.card}>
               <Row className="g-0 w-100">
                  <Col>
                     <div className={styles.loginBoxRight}>
                        <CardBody className={styles.cardBody}>
                           <div className="h-100 d-flex flex-column justify-content-between">
                              <div>
                                 <div className="d-flex align-items-center mb-150">
                                    <BsBoxArrowInLeft size="1.5rem" />
                                    <h1 className="me-100 fs-6">ورود</h1>
                                 </div>
                                 <Form id="loginForm" onSubmit={handleSubmitForm}>
                                    <Form.Group className="mb-200" controlId="exampleForm.ControlInput1">
                                       <Form.Control
                                          type="text"
                                          placeholder="نام کاربری"
                                          name="username"
                                          onChange={handleChange}
                                       />
                                    </Form.Group>
                                    <Form.Group className="mb-200" controlId="exampleForm.ControlTextarea1">
                                       <Form.Control
                                          type="password"
                                          placeholder="رمز عبور"
                                          name="password"
                                          onChange={handleChange}
                                       />
                                    </Form.Group>
                                 </Form>
                              </div>
                              <Button
                                 disabled={!(loginData.username.length && loginData.password.length)}
                                 type="submit"
                                 className="w-100"
                                 form="loginForm"
                                 size="lg"
                              >
                                 ورود
                              </Button>
                           </div>
                        </CardBody>
                     </div>
                  </Col>
                  <Col>
                     <div className={styles.loginBoxLeft}>
                        <CardBody className={styles.cardBody}>
                           <div className="d-flex flex-column align-items-center justify-content-between h-100">
                              <div className="text-center">
                                 <img
                                    src="/badesaba_icon.svg"
                                    className="img-fluid mb-300"
                                    width="90px"
                                    alt="saba-logo"
                                 />
                                 <h1 className="h4 fw-bold mb-150">پیشخوان مدیریت کاربران</h1>
                                 <h2 className="h5 fw-medium">نرم‌افزار باد صبا</h2>
                              </div>
                              <div>
                                 <p className="text-center fs-8">
                                    کلیه حقوق این وب‌سایت متعلق به
                                    <strong className="fw-semibold"> شرکت پیشگامان موج تلفن همراه </strong>
                                    است.
                                 </p>
                              </div>
                           </div>
                        </CardBody>
                     </div>
                  </Col>
               </Row>
            </Card>
         </div>

         <div
            aria-live="polite"
            aria-atomic="true"
            className="bg-dark position-fixed text-white"
            style={{ height: "80px", top: 0, right: 0, width: "100%" }}
         >
            <ToastContainer className="p-3" position="top-end" style={{ zIndex: 1, padding: "2rem" }}>
               <Toast
                  autohide
                  show={isToastOpen}
                  delay={3000}
                  bg="danger"
                  onClose={() => {
                     setIsToastOpen(false);
                  }}
               >
                  <Toast.Body>مشخصات وارد شده صحیح نمی‌باشد.</Toast.Body>
               </Toast>
            </ToastContainer>
         </div>
      </>
   );
};
