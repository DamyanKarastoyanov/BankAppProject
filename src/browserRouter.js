import { createBrowserRouter } from "react-router-dom";
import LoginForm from "./components/PreLogin/LoginForm";
import Navbar from "./components/Navbar";
import ForgetPassword from "./components/PreLogin/ForgetPassword";
import ActivateAccount from "./components/PreLogin/ActivateAccount";
import TermsOfServices from "./components/PreLogin/TermsOfServices";
import MenuBar from "./components/Services/MenuBar";
import AccountPage from "./components/Account";
import ContactUs from "./components/Contact us/ContactUs";
import AccountContainer from "./components/AccSettings/AccountContainer";

const routerConfig = [
  { path: "/", element: <LoginForm /> },
  { path: "/forget-password", element: <ForgetPassword /> },
  { path: "/activate-account", element: <ActivateAccount /> },
  { path: "/terms", element: <TermsOfServices /> },
  { path: "/home", element: [<Navbar />, <AccountPage />] },
  { path: "/contact", element: [<Navbar />, <ContactUs />] },
  { path: "/account", element: <AccountPage /> },
  { path: "/settings", element: [<Navbar />, <AccountContainer />] },
  {
    path: "/services",
    element: [<Navbar />, <MenuBar />],
    children: [
      {
        path: "awaiting-obligations",
        element: [
          <Navbar />,
          <MenuBar currentItem="services/awaiting-obligations" />,
        ],
      },
      {
        path: "pay-with-code",
        element: [<Navbar />, <MenuBar currentItem="services/pay-with-code" />],
      },
      {
        path: "one-time-obligation",
        element: [
          <Navbar />,
          <MenuBar currentItem="services/one-time-obligation" />,
        ],
      },
      {
        path: "e-vignettes",
        element: [<Navbar />, <MenuBar currentItem="services/e-vignettes" />],
      },
      {
        path: "vignettes-valid-check",
        element: [
          <Navbar />,
          <MenuBar currentItem="services/vignettes-valid-check" />,
        ],
      },
      {
        path: "request-debit-card",
        element: [
          <Navbar />,
          <MenuBar currentItem="services/request-debit-card" />,
        ],
      },
      {
        path: "request-credit-card",
        element: [
          <Navbar />,
          <MenuBar currentItem="services/request-credit-card" />,
        ],
      },
      {
        path: "request-user-credit",
        element: [
          <Navbar />,
          <MenuBar currentItem="services/request-user-credit" />,
        ],
      },
      {
        path: "request-mortgage",
        element: [
          <Navbar />,
          <MenuBar currentItem="services/request-mortgage" />,
        ],
      },
      {
        path: "installment",
        element: [<Navbar />, <MenuBar currentItem="services/installment" />],
      },
      {
        path: "withdraw-money",
        element: [
          <Navbar />,
          <MenuBar currentItem="services/withdraw-money" />,
        ],
      },
      {
        path: "big-amount-withdrawal",
        element: [
          <Navbar />,
          <MenuBar currentItem="services/big-amount-withdrawal" />,
        ],
      },
      {
        path: "installment-in-credit-card",
        element: [
          <Navbar />,
          <MenuBar currentItem="services/installment-in-credit-card" />,
        ],
      },
      {
        path: "installment-in-credit",
        element: [
          <Navbar />,
          <MenuBar currentItem="services/installment-in-credit" />,
        ],
      },
      {
        path: "print-documents",
        element: [
          <Navbar />,
          <MenuBar currentItem="services/print-documents" />,
        ],
      },
    ],
  },
  // Add more route objects for other paths if necessary
];

export const router = createBrowserRouter(routerConfig);

/* 
Backend Logic:
->  Implement Json-server write down the usersData there
->  Implement Login/Register/Logout functionality
->  Load User data once logged
->  others....

*/
