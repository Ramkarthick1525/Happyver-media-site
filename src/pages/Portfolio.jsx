import { useState } from "react";
import PageHeader from "../components/PageHeader";
import PortfolioFilter from "../components/PortfolioFilter";
import PortfolioGallery from "../components/PortfolioGallery";
import VideoModal from "../components/VideoModal";
import CTA from "../components/CTA";

const Portfolio = () => {
  const [active, setActive] = useState("all");
  const [modalItem, setModalItem] = useState(null);

  return (
    <>
      <PageHeader
        title="Our Portfolio"
        subtitle="Showcasing our best work across video production, social media, and digital marketing"
      />

      <PortfolioFilter active={active} setActive={setActive} />

      <PortfolioGallery
        activeFilter={active}
        openModal={setModalItem}
      />

      <CTA />

      <VideoModal item={modalItem} close={() => setModalItem(null)} />
    </>
  );
};

export default Portfolio;
