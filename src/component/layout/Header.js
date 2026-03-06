import "./index.scss";
import useClickOutside from "../../hook/useClickOutside";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/authReducer";

const Header = () => {
  const dataCards = useSelector((state) => {
    return state.shoppingCard || 0;
  });

  const { show, setShow, nodeRef } = useClickOutside();

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const location = useLocation();

  const isLogin = useSelector((state) => {
    return state?.authen?.isLogin;
  });
  const dispatch = useDispatch();

  const handleClickLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  const headerMenu = [
    { name: "Trang chủ", link: "/", isLogin: true },
    { name: "Quản lý đơn", link: "/admin", isLogin: true },
    { name: "Quản lý sản phẩm", link: "/admin/import", isLogin: true },
    { name: "Đơn hàng của tôi", link: "/user/orders", isLogin: false },
    { name: "Đăng xuất", isLogin: true },
    // {
    //   name: "Cuộc thi",
    //   link: ["/maraton-100", "/maraton-500", "/maraton-10", "/maraton-5"],
    //   subMenu: [
    //     { name: "Chạy 100m", link: "/maraton-100" },
    //     { name: "Chạy 500m", link: "/maraton-500" },
    //     { name: "Chạy 5km", link: "/maraton-5" },
    //     { name: "Chạy 10km", link: "/maraton-10" },
    //   ],
    // },
  ];

  const activeLink = (item) => {
    const currentPath = location.pathname;
    // item.link là string
    if (typeof item?.link === "string") {
      if (item?.link === currentPath) return true;
    }

    // item.link là array
    if (Array.isArray(item?.link)) {
      if (item?.link.includes(currentPath)) return true;
    }

    return false;
  };

  return (
    <div className="relative">
      <div
        className="top-0 fixed z-50 w-full bg-[#91D7DB] max-h-[76px]"
        ref={nodeRef}
      >
        <div className="flex container justify-between">
          <div className="flex gap-4 md:gap-8 w-full">
            <span
              className="flex items-center md:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 cursor-pointer md:hidden"
                viewBox="0 0 640 640"
              >
                <path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z" />
              </svg>
            </span>
            {showMobileMenu && (
              <div
                className="fixed inset-0 bg-black/40 z-40 md:hidden"
                onClick={() => setShowMobileMenu(false)}
              />
            )}
            {/* Mobile menu */}
            <div
              className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 transform transition-transform duration-300 md:hidden
                ${showMobileMenu ? "translate-x-0" : "-translate-x-full"}
              `}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <span className="text-xl font-semibold">Menu</span>
                <button onClick={() => setShowMobileMenu(false)}>✕</button>
              </div>

              <ul className="flex flex-col p-4 gap-2">
                {headerMenu.map((item) => {
                  if (item.isLogin && !isLogin) return null;
                  if (!item.isLogin && isLogin) return null;
                  return (
                    <li key={item.name}>
                      <NavLink
                        to={Array.isArray(item.link) ? item.link[0] : item.link}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-lg text-lg ${
                            activeLink(item) ? "bg-[#91D7DB] font-semibold" : ""
                          }`
                        }
                        onClick={() => setShowMobileMenu(false)}
                      >
                        {item.name}
                      </NavLink>

                      {/* sub menu */}
                      {item.subMenu && (
                        <ul className="pl-4 mt-1">
                          {item.subMenu.map((sub) => (
                            <li key={sub.name}>
                              <NavLink
                                to={sub.link}
                                className={({ isActive }) =>
                                  `block px-3 py-2 rounded-lg ${
                                    isActive ? "text-primary font-medium" : ""
                                  }`
                                }
                                onClick={() => setShowMobileMenu(false)}
                              >
                                {sub.name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/*Logo  */}
            <NavLink
              to={"/"}
              className="flex items-center min-w-[60px] lg:min-w-[220px] gap-2 text-[#002025]"
            >
              <img
                className="w-[60px] h-[60px]"
                src="/logo.png"
                alt="Coding-Ex"
              />
              <p className="text-2xl font-semibold tablet:hidden">
                <span className="text-3xl text-[#df9342]">N</span>uts house
              </p>
            </NavLink>

            {/*Desktop menu  */}
            <div className=" w-full rounded-lg my-auto mobile:hidden">
              <ul className="relative header-menu flex md:gap-4">
                {headerMenu.map((item, index) => {
                  if (item.isLogin && !isLogin) return null;
                  if (!item.isLogin && isLogin) return null;
                  return (
                    <li
                      key={index}
                      className="p-2 text-xl font-medium  menu-item"
                    >
                      {item.link ? (
                        <NavLink
                          className={`text-[#002025] ${
                            activeLink(item) ? "active-menu" : ""
                          }`}
                          to={item.link}
                          id="navbarDropdownMenuLink"
                        >
                          {item.name}
                        </NavLink>
                      ) : (
                        <div onClick={() => handleClickLogout()}>
                          {item.name}
                        </div>
                      )}

                      {item.subMenu && (
                        <div className="sub-menu absolute flex flex-col">
                          {item.subMenu.map((e, i) => (
                            <NavLink
                              key={i}
                              className="sub-menu-item"
                              to={e.link}
                            >
                              {e.name}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="flex gap-1 min-w-[80px]">
            <a
              className="flex items-center md:mr-4 relative cursor-pointer"
              href="/card"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10"
                  fill="#df9342"
                  viewBox="0 0 640 640"
                >
                  <path d="M24 48C10.7 48 0 58.7 0 72C0 85.3 10.7 96 24 96L69.3 96C73.2 96 76.5 98.8 77.2 102.6L129.3 388.9C135.5 423.1 165.3 448 200.1 448L456 448C469.3 448 480 437.3 480 424C480 410.7 469.3 400 456 400L200.1 400C188.5 400 178.6 391.7 176.5 380.3L171.4 352L475 352C505.8 352 532.2 330.1 537.9 299.8L568.9 133.9C572.6 114.2 557.5 96 537.4 96L124.7 96L124.3 94C119.5 67.4 96.3 48 69.2 48L24 48zM208 576C234.5 576 256 554.5 256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z" />
                </svg>
              </span>
              <div className="absolute top-1.5 -right-1 w-5 h-5 text-white text-xs flex items-center justify-center text-center bg-red-500 rounded-2xl">
                {dataCards?.shoppingCard}
              </div>
            </a>
            <a
              className="flex items-center  relative cursor-pointer"
              href={isLogin ? "/admin" : "/login"}
            >
              <img
                className="w-10 h-10 rounded-3xl"
                src="https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
