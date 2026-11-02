import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Rahma Granites — Spaces Worth Coming Home To",
  description:
    "Rahma Granites creates refined kitchens, bathrooms, stone countertops and finished spaces in Oshawa, Ontario.",
  keywords: [
    "Oshawa kitchen renovation",
    "bathroom renovation",
    "quartz countertops",
    "granite countertops",
    "marble",
    "flooring",
    "Rahma Granites",
  ],
  openGraph: {
    type: "website",
    siteName: "Rahma Granites",
    title: "Rahma Granites — Spaces Worth Coming Home To",
    description:
      "Beautiful kitchens, refined stone surfaces and thoughtfully finished spaces in Oshawa, Ontario.",
    images: ["/images/hero-kitchen.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahma Granites — Spaces Worth Coming Home To",
    description:
      "Beautiful kitchens, refined stone surfaces and thoughtfully finished spaces in Oshawa, Ontario.",
    images: ["/images/hero-kitchen.webp"],
  },
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Rahma Granites",
  description:
    "Kitchen, bathroom, countertop and home renovation company in Oshawa, Ontario.",
  telephone: "+1-905-725-7777",
  email: "sales@rahmagranites.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "133 Taunton Rd W Unit 16",
    addressLocality: "Oshawa",
    addressRegion: "ON",
    postalCode: "L1G 3T4",
    addressCountry: "CA",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:30",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:30",
      closes: "16:00",
    },
  ],
  areaServed: "Oshawa, Ontario, Canada",
  priceRange: "$$",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
      </body>
    </html>
  );
}
