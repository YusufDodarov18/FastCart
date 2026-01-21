import { FaTruck, FaHeadset, FaShieldAlt } from "react-icons/fa";

const features = [
    { icon: <FaTruck size={30} />, title: "FREE AND FAST DELIVERY", description: "Free delivery for all orders over $140" },
    {icon: <FaHeadset size={30} />,title: "24/7 CUSTOMER SERVICE",description: "Friendly 24/7 customer support",},
   {icon: <FaShieldAlt size={30} />,title: "MONEY BACK GUARANTEE",description: "We return money within 30 days"}
];

export default function Features() {
  return (
    <div className="flex justify-center gap-10 py-10 pt-25 ">
        {features.map((feature, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-3 max-w-xs">
            <div className="text-gray-800">{feature.icon}</div>
            <h3 className="font-bold text-lg">{feature.title}</h3>
            <p className="text-gray-500 text-sm">{feature.description}</p>
          </div>
        ))}
    </div>
  );
}
