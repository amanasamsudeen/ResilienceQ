import { useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Navbar from "../navbar";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question:
      "What is meant by community support in the context of resilience?",
    answer:
      "Community support refers to the helping processes and resources available within a community that assist individuals in coping with stress and adversity. In the study, community support is conceptualized as a multidimensional construct including community integration, community participation, and community organization. These dimensions capture both emotional and instrumental forms of support. Community support extends beyond family and friends and includes neighbourhoods, voluntary groups, and local organizations. The article emphasizes that community support functions as an external protective factor that can either promote or constrain resilience depending on context. Thus, community support is a crucial ecological resource in resilience development.",
  },
  {
    question: "How is resilience defined in relation to community contexts?",
    answer:
      "Resilience is defined as the ability to adapt positively and recover from adversity while maintaining psychological well-being. In community contexts, resilience is not viewed solely as an individual attribute but as a process shaped by social environments. The article highlights that resilience is influenced by access to resources, social capital, and collective support. Community environments can either strengthen coping mechanisms or exacerbate vulnerability. Therefore, resilience emerges from continuous interaction between individuals and their communities. This perspective aligns with ecological and community psychology frameworks.",
  },
  {
    question:
      "What are the key dimensions of community support examined in the study?",
    answer:
      "The study examines three dimensions of community support: community integration, community participation, and community organization. Community integration refers to a sense of belongingness and emotional attachment to one’s community. Community participation involves active involvement in community activities and social interactions. Community organization refers to perceived support from formal and informal groups, associations, and institutions within the community. Together, these dimensions represent both psychological and structural aspects of community life. The authors argue that each dimension may influence resilience differently.",
  },
  {
    question:
      "How does community integration influence psychological resilience?",
    answer:
      "Community integration reflects how strongly individuals identify with and feel connected to their community. While prior research often suggests positive effects, the study found that community integration negatively predicted psychological resilience among single women. This unexpected finding suggests that mere belongingness does not always translate into adaptive outcomes. In stigmatizing or patriarchal environments, strong community ties may reinforce discrimination rather than support. As a result, individuals may rely more on internal resources than community bonds. This highlights the complex and context-dependent nature of community integration.",
  },
  {
    question:
      "Why might community integration negatively predict resilience in marginalized groups?",
    answer:
      "For marginalized groups such as single women, community integration may expose individuals to judgment, exclusion, or social control. In patriarchal societies, communities may uphold norms that stigmatize widowhood or divorce. High levels of integration may therefore intensify stress rather than alleviate it. The study suggests that when community values conflict with individual needs, integration can become psychologically burdensome. In such cases, distancing from the community may serve as a coping strategy. This finding challenges the assumption that community belonging is always beneficial.",
  },
];

export default function FAQList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <Typography variant="h3" className="mb-8 font-bold">
        Frequently Asked Questions
      </Typography>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card
            key={index}
            className="p-5 cursor-pointer hover:shadow-lg transition-all"
            onClick={() => toggle(index)}
          >
            {/* Question Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <Typography variant="h6" className="text-blue-500 font-bold">
                  {index + 1}.
                </Typography>
                <Typography variant="h6" className="font-semibold">
                  {faq.question}
                </Typography>
              </div>

              <ChevronDownIcon
                className={`w-5 h-5 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Answer */}
            {openIndex === index && (
              <Typography color="gray" className="mt-4 text-sm leading-relaxed">
                {faq.answer}
              </Typography>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
