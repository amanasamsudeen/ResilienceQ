import { Card, CardBody, Typography, Button } from "@material-tailwind/react";

export function TestimonialSectionTwo() {
  return (
    <section className="py-10 px-8 lg:py-4 bg-white">
      <div className="container mx-auto">
        <Card
          shadow={false}
          className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-50"
        >
          <CardBody className="flex flex-col-reverse gap-16 py-4  lg:flex-row">
            {/* Left Content */}
            <div className="lg:w-2/3">
              <Typography
                variant="small"
                className="mb-4 font-bold uppercase tracking-wider text-blue-600"
              >
                Author of BURS-2014
              </Typography>

              <Typography
                variant="h3"
                color="blue-gray"
                className="mb-4 font-semibold leading-snug"
              >
                Prof. N. Annalakshmi
              </Typography>

              <Typography className="mb-6 font-medium text-gray-700">
                Professor and Head, Department of Psychology
                <br />
                Bharathiar University, Tamil Nadu, India
              </Typography>

              <Typography className="mb-8 leading-relaxed text-gray-600">
                Dr. N. Annalakshmi is a senior academician with extensive
                experience in teaching, research, and mentorship in psychology.
                Her academic contributions span Positive Psychology, Resilience,
                Psychometry, Research Methodology, School Psychology, and
                Personality Theories. She has made a sustained contribution to
                resilience research in the Indian context, conceptualizing
                resilience as a dynamic, multidimensional, and culturally
                grounded process.
                <br />
                <br />
                Drawing from positive psychology, developmental psychology, and
                community mental health, her work focuses on vulnerable and
                marginalized populations including adolescents from low
                socio-economic backgrounds, persons with disabilities,
                transgender individuals, institutionalized youth, and caregivers
                experiencing chronic stress. She has developed culturally
                relevant resilience assessment tools and intervention programs
                that enhance psychological wellbeing and positive adaptation
                across the lifespan.
              </Typography>

              {/* Contact */}
              <div className="space-y-2 text-gray-700">
                <Typography className="font-semibold">
                  Correspondence
                </Typography>
                <Typography>Prof. N. Annalakshmi</Typography>
                <Typography>
                  Department of Psychology, Bharathiar University
                  <br />
                  Coimbatore – 641046, India
                </Typography>
                <Typography>Email: narayanan.annalakshmi@buc.edu.in</Typography>
                <Typography>Mobile: +91 97870 00864</Typography>
              </div>

              <a
                href="https://b-u.ac.in/faculty-user/293"
                target="_blank"
                rel="noreferrer"
              >
                <Button color="blue" variant="outlined" className="mt-8">
                  View Full Faculty Profile
                </Button>
              </a>
            </div>

            {/* Right Image */}
            <div className="relative mx-auto grid shrink-0 place-items-center lg:ml-auto">
              <div className="rounded-3xl bg-white p-3 shadow-lg">
                <img
                  src="https://faculty.b-u.ac.in/uploads/users_profile/student_image/293/6773765daeaad.png"
                  alt="Prof. N. Annalakshmi"
                  className="h-80 w-72 rounded-2xl object-cover"
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

export default TestimonialSectionTwo;
