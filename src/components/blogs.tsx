import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Chip,
} from "@material-tailwind/react";
import ThemeProvider from "./theme-provider";

import Navbar from "./navbar";
import Footer from "./presentation/footerFree";

interface BlogPostCardPropsType {
  img: string;
  title: string;
  desc: string;
  author: string;
  date: string;
  url: string;
  tags: string[];
}

function BlogPostCard({
  img,
  title,
  desc,
  author,
  date,
  url,
  tags,
}: BlogPostCardPropsType) {
  return (
    <Card
      shadow={false}
      className="group rounded-2xl border border-blue-gray-100 bg-white/80 backdrop-blur transition-all hover:-translate-y-2 hover:shadow-xl"
    >
      <CardHeader floated={false} className="mx-0 mt-0 mb-6 h-56 rounded-xl">
        <a href={url}>
          <img
            src={img}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </a>
      </CardHeader>

      <CardBody className="p-6 pt-0">
        {/* Meta */}
        <Typography className="mb-2 text-sm font-medium text-blue-600">
          {author} · {date}
        </Typography>

        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-3 font-semibold leading-snug"
        >
          {title}
        </Typography>

        <Typography color="gray" className="mb-4 text-sm">
          {desc}
        </Typography>

        {/* Tags */}
        <div className="mb-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Chip
              key={tag}
              value={tag}
              size="sm"
              className="bg-blue-50 text-blue-700"
            />
          ))}
        </div>

        <a href={url}>
          <Button variant="text" color="blue" className="px-0">
            Read Article →
          </Button>
        </a>
      </CardBody>
    </Card>
  );
}

const posts = [
  {
    img: "women1.jpg",
    title: "Building Psychological Resilience in University Students",
    desc: "A counsellor’s perspective on how students can develop coping strategies to manage academic stress and uncertainty.",
    author: "Dr. Anjali Perera, Counselling Psychologist",
    date: "Jan 2026",
    tags: ["Students", "Resilience", "Academic Stress"],
    url: "#",
  },
  {
    img: "landing.jpg",
    title: "Healthy Coping Mechanisms for Everyday Stress",
    desc: "Learn evidence-based coping techniques recommended by mental health professionals to handle daily stressors.",
    author: "Ms. R. Fathima, Mental Health Counsellor",
    date: "Jan 2026",
    tags: ["Stress", "Coping Skills", "Well-being"],
    url: "#",
  },
  {
    img: "head.jpg",
    title: "Recognizing and Preventing Emotional Burnout",
    desc: "Early signs of burnout and practical steps to recover emotional balance, explained by a clinical counsellor.",
    author: "Mr. S. Arun, Clinical Counsellor",
    date: "Dec 2025",
    tags: ["Burnout", "Self-Care", "Mental Health"],
    url: "#",
  },
];

function blogs() {
  return (
    <ThemeProvider>
      <Navbar />
      <section id="blogs" className="bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-8 py-20">
          {/* Section Header */}
          <div className="mb-16 ">
            <Typography className="mb-2 text-lg font-semibold">
              Welcome to <span className="text-blue-600">ResilienceQ</span> Blog
              hub.
            </Typography>

            <Typography
              variant="h2"
              color="blue-gray"
              className="mb-4 font-extrabold"
            >
              Recent Articles on{" "}
              <span className="text-blue-600">Resilience & Well-Being</span>
            </Typography>

            <Typography color="blue-gray">
              Explore expert-written articles focused on psychological
              resilience, stress management, and emotional well-being.
            </Typography>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogPostCard key={post.title} {...post} />
            ))}
          </div>
        </div>
      </section>
      <div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default blogs;
