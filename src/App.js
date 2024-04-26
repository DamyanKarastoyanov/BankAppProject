import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/PreLogin/LoginForm";
import Navbar from "./components/Navbar";
import ForgetPassword from "./components/PreLogin/ForgetPassword";
import ActivateAccount from "./components/PreLogin/ActivateAccount";
import TermsOfServices from "./components/PreLogin/TermsOfServices";
import MenuBar from "./components/Services/MenuBar";
import AccountPage from "./components/Account";
import ContactUs from "./components/Contact us/ContactUs";
import AccountContainer from "./components/AccSettings/AccountContainer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route exact path="/forget-password" element={<ForgetPassword />} />
        <Route exact path="/activate-account" element={<ActivateAccount />} />
        <Route exact path="/terms" element={<TermsOfServices />} />
        <Route exact path="/home" element={[<Navbar />, <AccountPage />]} />
        <Route exact path="/contact" element={[<Navbar />, <ContactUs />]} />
        <Route path="/services" element={[<Navbar />, <MenuBar />]} />
        <Route exact path="/account" element={<AccountPage />} />
        <Route
          exact
          path="/settings"
          element={[<Navbar />, <AccountContainer />]}
        />
        <Route
          path="/services/awaiting-obligations"
          element={[
            <Navbar />,
            <MenuBar currentItem="services/awaiting-obligations" />,
          ]}
        />
        <Route
          path="/services/pay-with-code"
          element={[
            <Navbar />,
            <MenuBar currentItem="services/pay-with-code" />,
          ]}
        />
        <Route
          path="services/one-time-obligation"
          element={[
            <Navbar />,
            <MenuBar currentItem="services/one-time-obligation" />,
          ]}
        />
        <Route
          path="services/register-obligation"
          element={[
            <Navbar />,
            <MenuBar currentItem="services/register-obligation" />,
          ]}
        />
        <Route
          path="services/obligation-list"
          element={[
            <Navbar />,
            <MenuBar currentItem="services/obligation-list" />,
          ]}
        />
        <Route
          path="services/e-vignettes"
          element={[<Navbar />, <MenuBar currentItem="services/e-vignettes" />]}
        />
        <Route
          path="services/route-cards"
          element={[<Navbar />, <MenuBar currentItem="services/route-cards" />]}
        />
        <Route
          path="services/complexatory-taxes"
          element={[
            <Navbar />,
            <MenuBar currentItem="services/complexatory-taxes" />,
          ]}
        />
        <Route
          path="services/vignettes-valid-check"
          element={[
            <Navbar />,
            <MenuBar currentItem="services/vignettes-valid-check" />,
          ]}
        />
        <Route
          path="services/request-debit-card"
          element={[
            <Navbar />,
            <MenuBar currentItem="services/request-debit-card" />,
          ]}
        />
        <Route
          path="services/request-credit-card"
          element={[
            <Navbar />,
            <MenuBar currentItem="services/request-credit-card" />,
          ]}
        />
        <Route
          path="services/request-user-credit"
          element={[
            <Navbar />,
            <MenuBar currentItem="services/request-user-credit" />,
          ]}
        />
        <Route
          path="services/request-mortgage"
          element={[
            <Navbar />,
            <MenuBar currentItem="services/request-mortgage" />,
          ]}
        />
        <Route
          path="services/installment"
          element={[<Navbar />, <MenuBar currentItem="services/installment" />]}
        />
        <Route
          path="services/withdraw-money"
          element={[
            <Navbar />,
            <MenuBar currentItem="services/withdraw-money" />,
          ]}
        />
        <Route
          path="services/big-amount-withdrawal"
          element={[
            <Navbar />,
            <MenuBar currentItem="services/big-amount-withdrawal" />,
          ]}
        />
        <Route
          path="services/installment-in-credit-card"
          element={[
            <Navbar />,
            <MenuBar currentItem="services/installment-in-credit-card" />,
          ]}
        />
        <Route
          path="services/installment-in-credit"
          element={[
            <Navbar />,
            <MenuBar currentItem="services/installment-in-credit" />,
          ]}
        />
        <Route
          path="services/print-documents"
          element={[
            <Navbar />,
            <MenuBar currentItem="services/print-documents" />,
          ]}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
