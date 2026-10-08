import { useState } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import FloatingSupportButton from "../components/FloatingSupportButton.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import MobileHeader from "../components/MobileHeader.jsx";
import RentalDatePicker from "../components/RentalDatePicker.jsx";

export default function MainLayout() {
  const [params, setParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const search = params.get("search") || "";

  function onSearch(value) {
    const next = new URLSearchParams(params);
    if (value) next.set("search", value);
    else next.delete("search");
    next.delete("page");
    setParams(next);
    navigate({ pathname: "/", search: `?${next.toString()}` });
  }

  return (
    <>
      <a className="skip-link" href="#listing">
        Skip to products
      </a>
      <Header search={search} onSearch={onSearch} />
      <Outlet context={{ drawerOpen, setDrawerOpen, search, onSearch }} />
      <Footer />
      <FloatingSupportButton />
      <MobileHeader
        onOpenFilters={() => setDrawerOpen(true)}
        onSearchFocus={() => document.querySelector('input[type="search"]')?.focus()}
      />
      <RentalDatePicker />
    </>
  );
}
