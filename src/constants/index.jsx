import member1 from "../assets/member1.jpg";
import member2 from "../assets/member2.jpg";
import member3 from "../assets/member3.jpg";
import member4 from "../assets/member4.jpg";

import client1 from "../assets/client-1.png"
import client2 from "../assets/client-2.png";
import client3 from "../assets/client-3.png";
import client6 from "../assets/client-5.png";
import client5 from "../assets/client-4.png";
import client7 from "../assets/client-6.png";
import client8 from "../assets/client-7.png";
import client4 from "../assets/client-8.png";





export const partners = [
  {image:client1 },
  {image: client3},
  {image: client2},
  {image: client4},
  {image: client8},
  {image: client7},
  {image: client6},
  {image: client5},

]
export const shortReview = [
  {number: 313, review:'Our Clients'},
  {number:30, review:'Total Categories'},
  {number: 70, review:'In Country'},
  {number: '98 %', review:'Happy Customer'},

]
export const newsForm = [
  { label: "Name", type: "name" },

  { label: "Email", type: "email" },

  { label: "Phone Number", type: "name" },
];

export const memberInfo = [
  { name: "Abdillah Ibn Muhammad", designation: "C.E.O", image: member1 },
  { name: "Jubayer Al Khalid", designation: "Manager", image: member2 },
  { name: "Abu Hujaifa", designation: "Fashion Designer ", image: member3 },
  { name: "Syeed Al Arabi", designation: "Manager ", image: member4 },
];

export const colors = ["#22D3EF", "#ff0000", "#CDD0D0", "#000000"];

export const category = [
  { title: "All", link: "" },
  { title: "Watch", link: "" },
  { title: "Mobile", link: "" },
  { title: "Laptop", link: "" },
  { title: "Accessories", link: "" },
];

export const message = [
  {
    label: "Message",
    type: "textarea",
    className: "w-full h-52 rounded-md border-green-300 focus:ring-blue-100",
  },
];

export const quickLinks = [
  {
    title: "User Area",
    links: [
      { name: "My Account", link: "/myaccount" },
      { name: "My Cart", link: "/mycart" },
      { name: "Login", link: "/login" },
      { name: "Checkout", link: "/checkout" },
    ],
  },
  {
    title: "Shopping Guide",
    links: [
      { name: "Payment", link: "/payment" },
      { name: "Shipment", link: "/shipment" },
      { name: "FAQ", link: "/faq" },
      { name: "Return Policy", link: "/returnpolicy" },
    ],
  },
  {
    title: "Return Policy",
    links: [
      { name: "Site Map", link: "/payment" },
      { name: "Delivery", link: "/shipment" },
      { name: "Cash Back", link: "/returnpolicy" },
    ],
  },
];
