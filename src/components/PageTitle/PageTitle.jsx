import { useEffect } from "react";
import {
  matchPath,
  useLocation,
} from "react-router-dom";

const pageTitles = [
  {
    path: "/",
    title: "Decorist | Thoughtful Furniture & Home Decor",
  },
  {
    path: "/about",
    title: "About Us | Decorist",
  },
  {
    path: "/shop",
    title: "Shop Furniture & Home Decor | Decorist",
  },
  {
    path: "/shop-details/:productId",
    title: "Product Details | Decorist",
  },
  {
    path: "/contact",
    title: "Contact Us | Decorist",
  },
];

const PageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const isFaqSection =
      location.pathname === "/contact" &&
      location.hash === "#faq";

    if (isFaqSection) {
      document.title = "Frequently Asked Questions | Decorist";
      return;
    }

    const matchedPage = pageTitles.find((page) =>
      matchPath(
        {
          path: page.path,
          end: true,
        },
        location.pathname
      )
    );

    document.title =
      matchedPage?.title ||
      "Decorist | Thoughtful Furniture & Home Decor";
  }, [location.pathname, location.hash]);

  return null;
};

export default PageTitle;