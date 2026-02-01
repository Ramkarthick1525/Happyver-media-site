import PageHeader from "../components/PageHeader";
import ServiceDetail from "../components/ServiceDetail";
import CTA from "../components/CTA";
import { servicesData } from "../data/servicesData";

const Services = () => {
  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive solutions to elevate your brand and drive growth"
      />

      {servicesData.map((service, i) => (
        <ServiceDetail key={i} service={service} />
      ))}

      <CTA />
    </>
  );
};

export default Services;
