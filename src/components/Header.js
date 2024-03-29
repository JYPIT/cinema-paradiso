import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { isDarkAtom, isLoginAtom } from "../atom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  padding: 20px 10px 20px 30px;
  color: white;
`;

const navVariants = {
  top: { backgroundColor: "rgba(0,0,0,0)" },
  scrollDown: { backgroundColor: "rgba(0,0,0,1)" },
};

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.logo};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [
      0, 0, 0, 0, 0.2, 0.4, 0.8, 0, 0.2, 0.4, 0.8, 0, 0.2, 0.2, 0.2, 0.4, 0.4,
      0.8, 0, 0.2, 0.4, 0.8, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1,
    ],
  },
  transition: {
    repeat: Infinity,
  },
};

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const DarkThemeLogo = styled(motion.svg)`
  width: 28px;
  height: 28px;
  fill: orange;
`;

const Search = styled(motion.form)`
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 20px;
  svg {
    height: 25px;
  }
`;
const Input = styled(motion.input)`
  position: absolute;
  transform-origin: right center;
  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  color: white;
  font-size: 16px;
  background-color: ${(props) => props.theme.black.lighter};
  border: 1px solid ${(props) => props.theme.white.lighter};
`;
const ProfileLink = styled(Link)`
  svg {
    width: 20px;
    height: 20px;
    margin-right: 30px;
  }
`;
function Header() {
  //Dark Mode
  const isDark = useRecoilValue(isDarkAtom);
  const setIsDark = useSetRecoilState(isDarkAtom);
  const clickDarkBtn = () => {
    setIsDark((prev) => !prev);
  };
  //Login
  const isLogin = useRecoilValue(isLoginAtom);
  const setIsLogin = useSetRecoilState(isLoginAtom);
  const navigate = useNavigate();
  //Form
  const { register, handleSubmit } = useForm();
  const onValid = (data) => {
    navigate(`/search?keyword=${data.keyword}`);
  };
  //Search
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleSearch = () => setSearchOpen((prev) => !prev);
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scrollDown");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY]);

  return (
    <Nav variants={navVariants} initial={"top"} animate={navAnimation}>
      <Col>
        <StyledLink to="/">
          <Logo
            variants={logoVariants}
            whileHover="active"
            initial="normal"
            xmlns="http://www.w3.org/2000/svg"
            width="1024"
            height="276.742"
            viewBox="0 0 1024 276.742"
          >
            <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
          </Logo>
        </StyledLink>

        <Items>
          {isLogin ? (
            <>
              <Item onClick={() => setIsLogin(false)}>로그아웃</Item>
              <Item>
                <StyledLink to={"123/RequestBoard"}>요청 게시판</StyledLink>
              </Item>
            </>
          ) : (
            <>
              <Item>
                <StyledLink to={"Join"}>Join</StyledLink>
              </Item>
              <Item>
                <StyledLink to={"Login"}>Login</StyledLink>
              </Item>
              <Item onClick={() => setIsLogin(true)}>로그인</Item>
            </>
          )}
          <Item onClick={clickDarkBtn}>
            {isDark ? (
              <DarkThemeLogo
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                whileHover={{ scale: 1.1 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </DarkThemeLogo>
            ) : (
              <DarkThemeLogo
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                whileHover={{ scale: 1.1 }}
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </DarkThemeLogo>
            )}
          </Item>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onValid)}>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -230 : 0 }}
            transition={{ type: "linear" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            {...register("keyword", { required: true, minLength: 2 })}
            animate={{ scaleX: searchOpen ? 1 : 0 }}
            transition={{ type: "linear" }}
            placeholder="제목 입력..."
            //animation={inputAnimation}
          />
        </Search>
        {isLogin ? (
          <ProfileLink to={"Profile"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="white"
            >
              <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
          </ProfileLink>
        ) : null}
      </Col>
    </Nav>
  );
}
export default Header;
