import { plan } from "@prisma/client";

const PremiumContent = ({ plan }: { plan: plan }) => {
  return <div>{plan}</div>;
};

export default PremiumContent;
