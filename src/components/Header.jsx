import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

import logonew from "../images/logonew.mp4"; // Ensure this path is correct

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  const logoRef = useRef(null);
  const isInView = useInView(logoRef, { once: false });

  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setVisible(false);
      } else {
        // Scrolling up
        setVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className={`shadow-sm bg-white mb-0 transition-navbar ${scrolled ? "navbar-scrolled" : ""} ${visible ? "navbar-visible" : "navbar-hidden"}`}
    >
      <Container className="pt-2">
        <Navbar.Brand as={Link} to="/" className="d-flex flex-column align-items-center" style={{ marginLeft: '-30px' }}>
           <motion.video
            ref={logoRef}
            initial={{ y: -100, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ type: "spring", stiffness: 120, damping: 10 }}
            src={logonew}
            alt="logo header"
            autoPlay
            loop
            muted
            style={{
              width: scrolled ? "250px" : "300px",
              height: scrolled ? "80px" : "90px", // Corrected this line
              border: "none",
              transition: "all 0.3s ease",
            }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" style={{ zIndex: "1000" }}>
          <Nav className="ms-auto">
            <Nav.Link href="#home" className="ms-5">Home</Nav.Link>
            <Nav.Link href="#aboutus" className="ms-5">About Us</Nav.Link>
            <Nav.Link href="#elk" className="ms-5 fw-bold">ELK Platform</Nav.Link>
            <Nav.Link href="#blog" className="ms-5">Blog</Nav.Link>
            <Nav.Link
              as={Link}
              to="/privacy"
              className="ms-5"
              onClick={() => {
                setTimeout(() => {
                  const element = document.getElementById("contactsinprivacy");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }, 0);
              }}
            >
              Contacts
            </Nav.Link>
            <Nav.Link as={Link} to="/careers" className="ms-5">Careers</Nav.Link>
            <Nav.Link as={Link} to="/login" className="ms-5 fw-bold">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;